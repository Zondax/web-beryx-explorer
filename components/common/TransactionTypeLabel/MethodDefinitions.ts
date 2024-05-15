/**
 * @type {Object}
 * @description SupportedOperationsColors is a mapping of operation types to their respective color codes in light and dark themes.
 */
export const SupportedOperationsColors: { [key: string]: { light: string; dark: string } } = {
  Common: {
    light: 'rgb(72, 165, 234)', // Dark Blue  -> Brown
    dark: 'rgb(33, 143, 216)', // Blue
  },
  Cron: {
    light: 'rgb(255, 165, 0)', // Dark Orange -> Brown
    dark: 'rgb(255, 102, 0)', // Orange
  },
  MethodsAccount: {
    light: 'rgb(0, 153, 76)', // Dark Green -> Brown
    dark: 'rgb(23, 160, 91)', // Green
  },
  MethodsInit: {
    light: 'rgb(255, 102, 204)', // Dark Pink
    dark: 'rgb(255, 0, 153)', // Pink
  },
  MethodsMultisig: {
    light: 'rgb(204, 68, 68)', // Dark Red
    dark: 'rgb(181, 58, 58)', // Red
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
    light: 'rgb(128, 0, 32)', // Dark Pastel Burgundy
    dark: 'rgb(176, 48, 96)', // Pastel Burgundy
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
    light: 'rgba(117, 117, 117)', // Dark Gray
    dark: 'rgba(189, 189, 189)', // Gray
  },
}

/**
 * TxTypeLabelColors is a mapping of transaction types to their respective color codes in light and dark themes.
 * @type {Object}
 */
const TxTypeLabelColors: { [key: string]: { light: string; dark: string } } = {
  Send: SupportedOperationsColors.Common, // Common
  Fee: SupportedOperationsColors.Common, // Common
  Constructor: SupportedOperationsColors.Common, // Common
  CronTick: SupportedOperationsColors.Common, // Common

  EpochTick: SupportedOperationsColors.Cron, // Cron

  PubkeyAddress: SupportedOperationsColors.MethodsAccount, // MethodsAccount
  AuthenticateMessage: SupportedOperationsColors.MethodsAccount, // MethodsAccount

  Exec: SupportedOperationsColors.MethodsInit, // MethodsInit
  Exec4: SupportedOperationsColors.MethodsInit, // MethodsInit

  SwapSigner: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  SwapSignerExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  AddSigner: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  AddSignerExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  RemoveSigner: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  RemoveSignerExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  Propose: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  ProposeExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  Approve: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  ApproveExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  Cancel: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  CancelExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  ChangeNumApprovalsThreshold: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  ChangeNumApprovalsThresholdExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  LockBalance: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  LockBalanceExported: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  AddVerifies: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig
  UniversalReceiverHook: SupportedOperationsColors.MethodsMultisig, // MethodsMultisig

  AwardBlockReward: SupportedOperationsColors.MethodsReward, // MethodsReward
  UpdateNetworkKPI: SupportedOperationsColors.MethodsReward, // MethodsReward
  ThisEpochReward: SupportedOperationsColors.MethodsReward, // MethodsReward

  CreateMiner: SupportedOperationsColors.MethodsPower, // MethodsPower
  CreateMinerExported: SupportedOperationsColors.MethodsPower, // MethodsPower
  UpdateClaimedPower: SupportedOperationsColors.MethodsPower, // MethodsPower
  EnrollCronEvent: SupportedOperationsColors.MethodsPower, // MethodsPower
  SubmitPoRepForBulkVerify: SupportedOperationsColors.MethodsPower, // MethodsPower
  CurrentTotalPower: SupportedOperationsColors.MethodsPower, // MethodsPower
  UpdatePledgeTotal: SupportedOperationsColors.MethodsPower, // MethodsPower
  Deprecated1: SupportedOperationsColors.MethodsPower, // MethodsPower - OnConsensusFault
  NetworkRawPowerExported: SupportedOperationsColors.MethodsPower, // MethodsPower
  MinerRawPowerExported: SupportedOperationsColors.MethodsPower, // MethodsPower
  MinerCountExported: SupportedOperationsColors.MethodsPower, // MethodsPower
  MinerConsensusCountExported: SupportedOperationsColors.MethodsPower, // MethodsPower

  OnDeferredCronEvent: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  PreCommitSector: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ProveCommitSector: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  SubmitWindowedPoSt: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ApplyRewards: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  WithdrawBalance: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  WithdrawBalanceExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeOwnerAddress: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeOwnerAddressExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeWorkerAddress: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeWorkerAddressExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ConfirmUpdateWorkerKey: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  DeclareFaultsRecovered: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  PreCommitSectorBatch: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ProveCommitAggregate: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ProveReplicaUpdates: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeMultiaddrs: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeMultiaddrsExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangePeerID: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangePeerIDExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ExtendSectorExpiration: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ControlAddresses: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  TerminateSectors: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  DeclareFaults: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  CheckSectorProven: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ReportConsensusFault: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ConfirmSectorProofsValid: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  CompactPartitions: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  CompactSectorNumbers: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  RepayDebt: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  RepayDebtExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  DisputeWindowedPoSt: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeBeneficiary: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ChangeBeneficiaryExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetBeneficiary: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  IsControllingAddressExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ConfirmChangeWorkerAddress: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ConfirmChangeWorkerAddressExported: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  PreCommitSectorBatch2: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ProveReplicaUpdates2: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  ExtendSectorExpiration2: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetOwner: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetSectorSize: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetAvailableBalance: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetVestingFunds: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetPeerID: SupportedOperationsColors.MethodsMiner, // MethodsMiner
  GetMultiaddrs: SupportedOperationsColors.MethodsMiner, // MethodsMiner

  PublishStorageDeals: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  PublishStorageDealsExported: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  AddBalance: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  AddBalanceExported: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  VerifyDealsForActivation: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  ActivateDeals: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  OnMinerSectorsTerminate: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  ComputeDataCommitment: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetBalance: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealDataCommitment: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealClient: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealProvider: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealLabel: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealTerm: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealTotalPrice: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealClientCollateral: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealProviderCollateral: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealVerified: SupportedOperationsColors.MethodsMarket, // MethodsMarket
  GetDealActivation: SupportedOperationsColors.MethodsMarket, // MethodsMarket

  UpdateChannelState: SupportedOperationsColors.MethodsPaymentChannel, // MethodsPaymentChannel
  Settle: SupportedOperationsColors.MethodsPaymentChannel, // MethodsPaymentChannel
  Collect: SupportedOperationsColors.MethodsPaymentChannel, // MethodsPaymentChannel
  AddVerifiedClient: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  AddVerifiedClientExported: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  AddVerifier: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveVerifier: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  UseBytes: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RestoreBytes: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveExpiredAllocations: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveExpiredAllocationsExported: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveVerifiedClientDataCap: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  // Deprecated1: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry - UseBytes
  Deprecated2: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry - RestoreBytes
  GetClaims: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  GetClaimsExported: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  ExtendClaimTerms: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  ExtendClaimTermsExported: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveExpiredClaims: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  RemoveExpiredClaimsExported: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  // UniversalReceiverHook: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry
  ClaimAllocations: SupportedOperationsColors.MethodsVerifiedRegistry, // MethodsVerifiedRegistry

  InvokeContract: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  GetBytecode: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  GetStorageAt: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  Resurrect: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  GetBytecodeHash: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  InvokeContractReadOnly: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  InvokeContractDelegate: SupportedOperationsColors.MethodsEVM, // MethodsEVM
  Create: SupportedOperationsColors.MethodsEam, // MethodsEam
  Create2: SupportedOperationsColors.MethodsEam, // MethodsEam
  CreateExternal: SupportedOperationsColors.MethodsEam, // MethodsEam
  MintExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  DestroyExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  NameExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  SymbolExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  TotalSupplyExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  BalanceExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  TransferExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  TransferFromExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  IncreaseAllowanceExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  DecreaseAllowanceExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  RevokeAllowanceExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  BurnExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  BurnFromExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  AllowanceExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
  GranularityExported: SupportedOperationsColors.MethodsDatacap, // MethodsDatacap
}

/**
 * @function txTypeColor
 * @param theme - The theme of the application.
 * @param tx_type - The type of the transaction.
 * @returns - The color code of the transaction type in the given theme.
 * @description This function returns the color code of the transaction type in the given theme.
 */
export const txTypeColor = (theme: 'light' | 'dark', tx_type: string): string => {
  const colorMapping = TxTypeLabelColors[tx_type]
  if (colorMapping) {
    return colorMapping[theme]
  }

  return SupportedOperationsColors.Default[theme]
}
