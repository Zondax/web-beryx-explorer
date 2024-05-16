import { NetworkType } from '@/config/networks'
import { WalletError, WalletErrors, walletErrors } from '@/config/wallet'
import { MetamaskRpcError } from '@/store/wallets/metamask'

/**
 * Checks if the provided value is a Metamask RPC error.
 * @param toBeDetermined The value to be determined.
 * @returns A boolean indicating whether the provided value is a MetamaskRpcError.
 */
export function isMetamaskError(toBeDetermined: unknown): toBeDetermined is MetamaskRpcError {
  return Boolean((toBeDetermined as MetamaskRpcError).code)
}

/**
 * Retrieves the appropriate wallet error message based on the error code, network, and current network.
 * @param error The error code.
 * @param networkWallet The network of the wallet.
 * @param currentNetwork The current network.
 * @returns The corresponding wallet error message.
 */
export const getWalletError = (error: WalletErrors, networkWallet: NetworkType, currentNetwork: NetworkType): WalletError => {
  const labelNetworkWallet = `${networkWallet.project} ${networkWallet.name}`
  const labelCurrentNetwork = `${currentNetwork.project} ${currentNetwork.name}`

  const mappedError = walletErrors[error]
  mappedError.description = mappedError.description
    ?.replace('*networkWallet*', labelNetworkWallet)
    .replace('*currentNetwork*', labelCurrentNetwork)

  return mappedError ?? walletErrors['DEFAULT']
}
