import { config, tokens } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";
import * as themes from "./theme-output";

const appConfig = createTamagui({
  ...config,
  themes,
  tokens,
});

export type AppConfig = typeof appConfig;
declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}
export default appConfig;
