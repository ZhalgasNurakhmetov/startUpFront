import {FavoriteResourcePage} from "./favorite-resource.page";
import {favoriteResourceModalComponents} from "./modals";
import {FavoriteResourceApi} from "./modals/api/favorite-resource.api";

export const favoriteResourceComponents = [
  FavoriteResourcePage,
  ...favoriteResourceModalComponents,
];

export const favoriteResourceServices = [
  FavoriteResourceApi,
];
