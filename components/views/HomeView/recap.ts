export interface RecapProps {
  level: string
  title: string
  elements: { title: string; description?: string; link?: string }[]
  date: string
}
export const recap: RecapProps[] = [
  {
    level: '2024 Q1',
    title: 'More tools and features',
    elements: [
      {
        title: 'Proxy contract support',
        link: '/contract_verifier',
        description: 'Added support for proxy/upgradable contract verification. Upload the source code and verify your proxy contract.',
      },
    ],
    date: 'September',
  },
  {
    level: '2023 Q4',
    title: 'Statistics and Fine Tuning',
    elements: [
      {
        title: 'Recent Activity',
        link: '/recent_activity',
        description: 'Check the most recent tipsets, transactions, and contract invokes on the Filecoin network.',
      },
      {
        title: 'Dashboards',
        link: '/dashboard',
        description: 'Introducing a dashboard page to offer a visual overview of key data and metrics.',
      },
      {
        title: 'Mempool Stats',
        link: '/mempool?tab=stats',
        description:
          'Implement a statistics section on the mempool page to provide a visual summary of key data and essential metrics. This feature allows real-time monitoring statistics and updates.',
      },
      {
        title: 'Statistics for Addresses, Block, Contract',
        description: 'Adding a statistics section for Addresses, Blocks and Contracts.',
      },
      { title: 'Transaction Logs', description: 'Displaying transaction logs.' },
    ],
    date: 'September',
  },
  {
    level: '2023 Q3',
    title: 'Stability and Speed',
    elements: [
      {
        title: 'Leaderboard',
        link: '/leaderboard',
        description:
          "A detailed view of the Filecoin network's most prominent accounts. By navigating to the Leaderboard, you can keep track of the evolving dynamics within the Filecoin ecosystem.",
      },
      {
        title: 'Mempool Data',
        link: '/mempool',
        description:
          'Showcase all transactions currently in the mempool. These messages are intended for communication with the Filecoin Virtual Machine and subsequent inclusion in the blockchain for on-chain execution.',
      },
      {
        title: 'Resources for Devs',
        description:
          'An incorporated resources section is designed to assist developers in exploring and discovering the full range of features available on the Beryx page.',
      },
      { title: 'Notifications', description: 'Receive important updates and alerts.' },
      { title: 'Search History', description: 'Display  your search history to streamline and enhance your search experience.' },
      { title: 'Multiple Language Support', description: 'Add support for various languages to enhance your user experience.' },
    ],
    date: 'September',
  },
  {
    level: '2023 Q2',
    title: 'FVM Mainnet Launch',
    elements: [
      {
        title: 'Contract Verifier',
        link: '/contract_verifier',
        description:
          "Verifying smart contracts is key to making sure the contracts you're dealing with are legit. Beryx makes sure that the deployed contract matches its source code.",
      },
      { title: 'RPC Node Calibration', link: '/rpc', description: 'Display our RPC Node.' },
      {
        title: 'Faucet',
        link: '/faucet',
        description: 'Acquire testnet FIL by either entering a Filecoin address or connecting your wallet.',
      },
      { title: 'Wallet Support', description: 'Connect your wallet or track addresses directly.' },
    ],
    date: 'September',
  },
  {
    level: '2023 Q1',
    title: 'A Tool for Devs',
    elements: [
      {
        title: 'Address Converter',
        link: '/address_converter',
        description: 'Transform a Filecoin Address into its Ethereum counterpart and vice versa.',
      },
      { title: 'Support for Testnet', description: '' },
      {
        title: 'Smart Contract Decoding',
        link: '/interact',
        description:
          "Automatically decode your smart contract's functions based on its bytecode. This lets you visualize and pick the methods you want to call.",
      },
      {
        title: 'Smart Contract Interaction',
        link: '/interact',
        description:
          'Invoke methods on the Filecoin network by calling smart contracts. After executing a method, you can view the response and transaction details directly.',
      },
    ],
    date: 'September',
  },
]
