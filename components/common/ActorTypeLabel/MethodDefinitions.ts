/**
 * SupportedActorTypeColors is a mapping of actor types to their respective color codes in light and dark themes.
 * @type {Object}
 */
export const SupportedActorTypeColors: { [key: string]: { light: string; dark: string } } = {
  Common: {
    light: 'rgb(72, 165, 234)', // Dark Blue
    dark: 'rgb(33, 143, 216)', // Blue
  },
  Cron: {
    light: 'rgb(255, 165, 0)', // Dark Orange
    dark: 'rgb(255, 102, 0)', // Orange
  },
  MethodsAccount: {
    light: 'rgb(0, 120, 255)', // Light Blue
    dark: 'rgb(0, 100, 255)', // Dark Blue
  },
  MethodsInit: {
    light: 'rgb(255, 102, 204)', // Dark Pink
    dark: 'rgb(255, 0, 153)', // Pink
  },
  MethodsMultisig: {
    light: 'rgb(255, 137, 58)', // Dark Orange
    dark: 'rgb(255, 142, 67)', // Orange
  },
  MethodsReward: {
    light: 'rgb(204, 163, 0)', // Dark Yellow
    dark: 'rgb(255, 204, 0)', // Yellow
  },
  MethodsMiner: {
    light: 'rgb(48, 130, 64)', // Dark Lime Green
    dark: 'rgb(63, 156, 102)', // Lime Green
  },
  MethodsPower: {
    light: 'rgb(153, 62, 40)', // Darker Orange
    dark: 'rgb(193, 78, 50)', // Dark Orange
  },
  MethodsMarket: {
    light: 'rgb(0, 76, 153)', // Dark Deep Blue
    dark: 'rgb(9, 89, 209)', // Deep Blue
  },
  MethodsPaymentChannel: {
    light: 'rgb(140, 36, 36)', // Dark Red
    dark: 'rgb(177, 46, 46)', // Red
  },
  MethodsVerifiedRegistry: {
    light: 'rgb(0, 204, 0)', // Dark Bright Green
    dark: 'rgb(0, 255, 0)', // Bright Green
  },
  MethodsEVM: {
    light: 'rgb(101, 31, 184)', // Dark Purple
    dark: 'rgb(131, 41, 222)', // Purple
  },
  MethodsEam: {
    light: 'rgb(153, 28, 77)', // Dark Red
    dark: 'rgb(180, 32, 89)', // Red
  },
  MethodsDatacap: {
    light: 'rgb(5, 154, 65)', // Dark Light Green
    dark: 'rgb(12, 182, 80)', // Light Green
  },
  Default: {
    light: 'rgba(120, 120, 120)', // Darker Gray
    dark: 'rgba(150, 150, 150)', // Dark Gray
  },
}

/**
 * ActorTypeLabelColors is a mapping of actor types to their respective color codes in light and dark themes.
 * @type {Object}
 */
const ActorTypeLabelColors: { [key: string]: { light: string; dark: string } } = {
  // actor_type in an account
  account: SupportedActorTypeColors.MethodsAccount,
  init: SupportedActorTypeColors.MethodsInit,
  multisig: SupportedActorTypeColors.MethodsMultisig,
  reward: SupportedActorTypeColors.MethodsReward,
  power: SupportedActorTypeColors.MethodsPower,
  miner: SupportedActorTypeColors.MethodsMiner,
  market: SupportedActorTypeColors.MethodsMarket,
  payment_channel: SupportedActorTypeColors.MethodsPaymentChannel,
  verified_registry: SupportedActorTypeColors.MethodsVerifiedRegistry,
  evm: SupportedActorTypeColors.MethodsEVM,
  ethaccount: SupportedActorTypeColors.MethodsEVM,
  datacap: SupportedActorTypeColors.MethodsDatacap,
  placeholder: SupportedActorTypeColors.Default,
}

/**
 * actorTypeColor is a function that takes a theme and an actor type and returns the color code for that actor type in the given theme.
 * @param theme - The theme for which the color code is required.
 * @param actorType - The actor type for which the color code is required.
 * @returns - The color code for the actor type in the given theme.
 */
export const actorTypeColor = (theme: 'light' | 'dark', actorType: string): string => {
  const colorMapping = ActorTypeLabelColors[actorType]
  if (colorMapping) {
    return colorMapping[theme]
  }

  return SupportedActorTypeColors.Default[theme]
}
