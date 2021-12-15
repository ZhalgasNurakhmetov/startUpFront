import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PlatformService} from "../../../services/platform/platform.service";
import {Mode} from "@ionic/core";
import {combineLatest, Observable, Subject} from "rxjs";
import {Resource, User} from "../../../core/models/user";
import {UserService} from "../../../services/user/user.service";
import {filter, finalize, take, takeUntil} from "rxjs/operators";
import {CurrentUserService} from "../../../services/current-user/current-user.service";
import {ProfileApi} from "./api/profile.api";
import {Router} from "@angular/router";
import {AppRoutes} from "../../../app.routes";
import {UserRoutes} from "../user.routes";
import {ModalService} from "../../../services/modal/modal.service";
import {ResourceViewModal} from "../components/resource-view/resource-view.modal";
import {ChatCreateFormModel, ChatCreateFormService} from "./form/chat-create.form.service";
import {ChatService} from "../../../services/chat/chat.service";
import {Chat} from "../../../core/models/chat";
import {TypedFormGroup} from "ngx-forms-typed";
import {environment} from "../../../../environments/environment";

@Component({
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit, OnDestroy {

  platform: Mode;
  user$: Observable<User>;
  user: User;
  currentUser: User;
  chatList: Chat[];
  personalResourceList: Resource[];
  interestedResourceList: Resource[];
  isFollowing: boolean;
  isLoading: boolean;
  form: TypedFormGroup<ChatCreateFormModel>;
  apiUrl = environment.apiUrl;

  private unsubscribe$ = new Subject();

  constructor(
    private platformService: PlatformService,
    private currentUserService: CurrentUserService,
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private profileApi: ProfileApi,
    private router: Router,
    private modalService: ModalService,
    private chatCreateFormService: ChatCreateFormService,
    private chatService: ChatService,
  ) { }

  ngOnInit(): void {
    this.platform = this.platformService.getPlatform();
    this.user$ = this.userService.getUser();
    this.subscribeToUser();
    this.subscribeToChat();
  }

  chat() {
    this.showLoading(true);
    const index = this.chatList.findIndex(chat => chat?.firstUserId === this.user?.id || chat?.secondUserId === this.user?.id);
    if (index < 0) {
      this.form = this.chatCreateFormService.initChatCreateForm();
      this.form.patchValue({
        firstUserInfo: `${this.currentUser?.firstName} ${this.currentUser?.lastName}`,
        secondUserInfo: `${this.user?.firstName} ${this.user?.lastName}`,
        firstUserPhotoPath: this.currentUser?.photoPath,
        secondUserPhotoPath: this.user?.photoPath,
      });
      this.profileApi.startChat(this.user?.id, this.form.value)
        .pipe(
          take(1),
          finalize(() => {
            this.showLoading(false);
          })
        )
        .subscribe(chat => {
          this.chatService.setChatList([
            ...this.chatList,
            chat
          ]);
          this.chatService.setCurrentChat(chat);
          this.router.navigate([AppRoutes.personalChat]);
        });
    } else {
      this.chatService.setCurrentChat(this.chatList[index]);
      this.router.navigate([AppRoutes.personalChat]);
    }
  }

  follow(userId: string): void {
    this.showLoading(true);
    this.profileApi.follow(userId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(currentUser => {
        this.userService.setUser({
          ...this.user,
          followers: [
            currentUser,
          ]
        });
        this.currentUserService.setCurrentUser(currentUser);
      });
  }

  unfollow(userId: string): void {
    this.showLoading(true);
    this.profileApi.unfollow(userId)
      .pipe(
        take(1),
        finalize(() => {
          this.showLoading(false);
        })
      )
      .subscribe(currentUser => {
        const index = this.user.followers.findIndex(contact => contact.id === currentUser.id);
        this.user.followers.splice(index, 1);
        this.userService.setUser({
          ...this.user,
          followers: [
            ...this.user.followers,
          ]
        });
        this.currentUserService.setCurrentUser(currentUser);
      });
  }

  openResourceViewModal(resource: Resource): void {
    this.modalService.open(ResourceViewModal, this.platform, {platform: this.platform, resource});
  }

  navigateToUserResourceListPage(): void {
    this.router.navigate([AppRoutes.user, UserRoutes.resources]);
  }

  navigateToUserContactListPage(): void {
    this.router.navigate([AppRoutes.user, UserRoutes.contacts]);
  }

  private subscribeToUser(): void {
    combineLatest([this.userService.getUser(), this.currentUserService.getCurrentUser()])
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(([user, currentUser]) => {
        this.user = user;
        this.currentUser = currentUser;
        this.personalResourceList = user.resourceList.filter(resource => resource?.personal);
        this.interestedResourceList = user.resourceList.filter(resource => !resource?.personal);
        const index = currentUser.following.findIndex(contact => contact.id === user?.id);
        this.isFollowing = index > -1;
        this.cd.markForCheck();
      });
  }

  private subscribeToChat(): void {
    this.chatService.getChatList()
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(chatList => {
        this.chatList = chatList;
        this.cd.markForCheck();
      });
  }

  private showLoading(isLoading: boolean): void{
    this.isLoading = isLoading;
    this.cd.markForCheck();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
