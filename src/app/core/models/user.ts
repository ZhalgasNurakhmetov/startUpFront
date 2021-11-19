export interface UserBase {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  username: string;
  city: string;
  photo: string;
  about: string;
}

export interface User extends UserBase{
  resourceList: Resource[];
  likedResourceList: UserLike[];
  following: UserBase[];
  followers: UserBase[];
}

export interface Resource {
  id: string;
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
  likedUserList: UserLikedResource[];
}

export interface UserLikedResource {
  id: string;
  user_id: string;
  user: UserBase;
}

export interface UserLike {
  id: string;
  resource_id: string;
  resource: Resource;
}
