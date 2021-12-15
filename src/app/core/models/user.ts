export interface UserBase {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  city: string;
  photoPath: string;
  about: string;
}

export interface User extends UserBase{
  resourceList: Resource[];
  favoriteResourceList: UserLike[];
  following: UserBase[];
  followers: UserBase[];
}

export interface Resource {
  id: string;
  imagePath: string;
  available: boolean;
  personal: boolean;
  title: string;
  author: string;
  year: string;
  pageCount: string;
  literature: string;
  cover: string;
  language: string;
  composition: string;
  format: string;
  description: string;
  condition: string;
  likes: number;
  ownerId: string;
  owner: UserBase;
  favoriteUserList: UserLikedResource[];
}

export interface UserLikedResource {
  id: string;
  userId: string;
  user: UserBase;
}

export interface UserLike {
  id: string;
  resourceId: string;
  resource: Resource;
}
