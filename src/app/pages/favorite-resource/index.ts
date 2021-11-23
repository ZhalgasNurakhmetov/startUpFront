import {FavoriteResourcePage} from "./favorite-resource.page";
import {favoriteResourceModalComponents} from "./modals";
import {FavoriteResourceApi} from "./api/favorite-resource.api";

export const favoriteResourceComponents = [
  FavoriteResourcePage,
  ...favoriteResourceModalComponents,
];

export const favoriteResourceServices = [
  FavoriteResourceApi,
];
