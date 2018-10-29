import { SettingTypes } from "../enums/settingsTypes.enum";

export class SingleSetting {
  name: string;
  type: SettingTypes;
  value: any;
  options?: any;
}