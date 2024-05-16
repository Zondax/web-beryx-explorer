export interface WalletError {
  title: string
  description?: string
}

export type WalletErrors =
  | 'NETWORK_NOT_MATCHING'
  | 'DEFAULT'
  | 'WRONG_METHOD_ARGUMENTS'
  | 'PARAMETERS_NOT_CODED'
  | 'INTERACT_NOT_FEASIBLE'
  | 'TRANSACTION_NOT_DONE'
  | 'CONNECTION_ERROR'

export const walletErrors: { [key in WalletErrors]: WalletError } = {
  NETWORK_NOT_MATCHING: {
    title: 'Network not matching.',
    description:
      'Your wallet is currently linked to the *networkWallet* network, however, the application you’re using operates on the *currentNetwork* network. To fully utilize all features, please switch your wallet’s network to match with the one in Beryx.',
  },
  WRONG_METHOD_ARGUMENTS: {
    title: 'Error: Wrong method arguments',
    description: 'The argument list is not supported. Please consult the contract ABI.',
  },
  PARAMETERS_NOT_CODED: {
    title: 'Error: Parameters could not be coded',
    description: 'Please check the values sent match the parameter type.',
  },
  INTERACT_NOT_FEASIBLE: {
    title: 'Interacting with this network is currently not feasible',
    description: 'Please try again later or use the feedback tool in the navbar to report it.',
  },
  TRANSACTION_NOT_DONE: {
    title: 'Error: The transaction could not be done',
  },
  CONNECTION_ERROR: {
    title: 'Wallet Connection Error',
    description: 'No address or network.',
  },
  DEFAULT: {
    title: 'Unknown error',
    description: 'Please try again or use the feedback tool in the navbar to report it.',
  },
}
