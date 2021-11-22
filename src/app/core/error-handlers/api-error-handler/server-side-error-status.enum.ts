export const enum ServerSideErrorStatusEnum {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  USER_NOT_EXIST = 402,
  NOT_FOUND = 404,
  ALREADY_EXIST_ERROR = 409,
  FORBIDDEN = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  ISSUE = 410,
}