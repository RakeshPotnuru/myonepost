import type { IconType } from "react-icons";

import { ActionIcons } from "./action";
import { GeneralIcons } from "./general";

export type Icon = IconType;

export const Icons = {
  ...GeneralIcons,
  ...ActionIcons,
};
