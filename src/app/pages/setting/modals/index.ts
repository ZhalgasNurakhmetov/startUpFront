import {PasswordChangeModal} from "./password-change/password-change.modal";
import {ProfileEditModal} from "./profile-edit/profile-edit.modal";
import {PasswordChangeFormService} from "./password-change/form/password-change.form.service";
import {ProfileEditFormService} from "./profile-edit/form/profile-edit.form.service";

export const settingModalComponents = [
  PasswordChangeModal,
  ProfileEditModal,
];

export const settingModalServices = [
  PasswordChangeFormService,
  ProfileEditFormService,
];
