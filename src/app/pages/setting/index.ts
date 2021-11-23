import {SettingPage} from "./setting.page";
import {settingModalComponents, settingModalServices} from "./modals";
import {SettingApi} from "./api/setting.api";

export const settingComponents = [
  SettingPage,
  ...settingModalComponents,
];

export const settingServices = [
  SettingApi,
  ...settingModalServices,
];
