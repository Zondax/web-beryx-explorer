import { currentApiVersion } from './config'

export type endpointDataType = {
  path: string[]
  description?: string
  category?: 'data' | 'decoder' | 'tools'
  endpoint?: string
  testUrl?: string
  necessary?: boolean
}

export const endpointData: endpointDataType[] = [
  // data
  // account
  {
    path: ['account/info'],
    description: 'Account Info',
    category: 'data',
  },
  {
    path: ['account/info', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/account/info/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/account/info/f3vlx5btbwx2lpm3usvchodpkjpuulcwmzx5sl4elg2njtazz2eroboo6ktx2f2pglziusvif5yrtqflx57rtq`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['account/info', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/account/info/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/account/info/f016592`,
    description: `${currentApiVersion} Calibration`,
  },
  {
    path: ['account/balance'],
    description: 'Account Balance',
    category: 'data',
  },
  {
    path: ['account/balance', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/account/balance/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/account/balance/f3vlx5btbwx2lpm3usvchodpkjpuulcwmzx5sl4elg2njtazz2eroboo6ktx2f2pglziusvif5yrtqflx57rtq`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['account/balance', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/account/balance/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/account/balance/f016592`,
    description: `${currentApiVersion} Calibration`,
  },
  // tipset
  {
    path: ['tipset/height'],
    description: 'Tipset Info',
    category: 'data',
  },
  {
    path: ['tipset/height', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/tipset/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/tipset/height/554105`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['tipset/height', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/tipset/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/tipset/height/554105`,
    description: `${currentApiVersion} Calibration`,
  },
  {
    path: ['tipset/latest'],
    description: 'Latest Tipset',
    category: 'data',
  },
  {
    path: ['tipset/latest', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/tipset/latest`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/tipset/latest`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['tipset/latest', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/tipset/latest`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/tipset/latest`,
    description: `${currentApiVersion} Calibration`,
  },
  // transactions
  // hash
  {
    path: ['transactions/hash'],
    description: 'Transaction Details',
    category: 'data',
  },
  {
    path: ['transactions/hash', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/hash/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/hash/bafy2bzacebdcvl66j2zzkw7ruz7tfieipancxlg23cls4rzeuo6guntchrsus`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['transactions/hash', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/hash/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/hash/bafy2bzacedyi4zyvj26u7yjbdtbt4zvxl4htu3nq3b4e2g6bmk5vstzpuy2mq`,
    description: `${currentApiVersion} Calibration`,
  },
  // hash
  {
    path: ['transactions/height'],
    description: 'Tipset Transaction',
    category: 'data',
  },
  {
    path: ['transactions/height', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/height/554105`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['transactions/height', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/height/554105`,
    description: `${currentApiVersion} Calibration`,
  },
  // address
  {
    path: ['transactions/address'],
    description: 'Account Transactions',
    category: 'data',
  },
  {
    path: ['transactions/address', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/address/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/address/f3ujrh5xhq6l3oztjkatpbyg7q3zlscqitewlzbsbckbo4fuxokogzb5hnhcokeh6erahfkcopx4q2zchbndoq`,
    description: `${currentApiVersion} Mainnet`,
  },
  {
    path: ['transactions/address', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/address/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/address/f3q4642vh7pwazuinblgeqiyutops5jkxnremayinqow5lajf332iewqalalh264svle4azb6456xoblrq6pfa`,
    description: `${currentApiVersion} Calibration`,
  },
  // decoder
  {
    path: ['contract/bytecode/'],
    endpoint: '/fil/decoder/v2/calibration/contract/bytecode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/bytecode/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Get Contract Bytecode',
    category: 'decoder',
  },
  {
    path: ['contract/decode/'],
    endpoint: '/fil/decoder/v2/calibration/contract/decode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/decode/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Decode Contract',
    category: 'decoder',
  },
  {
    path: ['transaction/decode/'],
    endpoint: '/fil/decoder/v2/calibration/transaction/decode/',
    testUrl:
      'https://api.zondax.ch/fil/decoder/v2/calibration/transaction/decode/bafy2bzacebprulescyzlcnunwxu44nqf5kw2ontdvuhxwtn64sn55vyuvbgdq',
    description: 'Decode Transaction',
    category: 'decoder',
  },
  {
    path: ['contract/verified/'],
    endpoint: '/fil/decoder/v2/calibration/contract/verified/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/verified/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Contract Verified Status',
    category: 'decoder',
  },
  {
    path: ['contract/verification/compilers'],
    endpoint: '/fil/decoder/v2/calibration/contract/verification/compilers',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/verification/compilers',
    description: 'Get sol compilers',
    category: 'decoder',
  },
  {
    path: ['ipfs/'],
    endpoint: '/fil/decoder/v2/calibration/ipfs/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/ipfs/QmV8bJc8PLayXKqEcPX2ZZgbW3eygQqGMbYNpuyCnH13cr',
    description: 'Get IPFS Content',
    category: 'decoder',
  },
  // tools
  {
    path: ['hash/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/0xef16d72bbf03833ffc6d55154aa03406989f2b038c3995d88cf3d203522a3f8d`,
    description: 'Hash from ETH to FIL',
    category: 'tools',
  },
  {
    path: ['hash/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/bafy2bzaceanabmrxbjodkvdszw6ileyqrpi2p4a6e35qfsdl462kkjgpfcmma`,
    description: 'Hash from FIL to ETH',
    category: 'tools',
  },
  {
    path: ['address/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/0x0000000000ec577ad90e99ca7817e976e953c3bd`,
    description: 'Address from ETH to FIL',
    category: 'tools',
  },
  {
    path: ['address/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/f410faaaaaaaa5rlxvwiothfhqf7jo3uvhq55ocuvwiq`,
    description: 'Address from FIL to ETH',
    category: 'tools',
  },
]

export const endpoints = {
  accountInfo: {
    path: ['account/info'],
    description: 'Account Info',
    category: 'data',
  },
  accountBalance: {
    path: ['account/balance'],
    description: 'Account Balance',
    category: 'data',
  },
  tipset: {
    path: ['tipset/height'],
    description: 'Tipset Info',
    category: 'data',
  },
  latestTipset: {
    path: ['tipset/latest'],
    description: 'Latest Tipset',
    category: 'data',
  },
  transaction: {
    path: ['transactions/hash'],
    description: 'Transaction Details',
    category: 'data',
  },
  tipsetTransactions: {
    path: ['transactions/height'],
    description: 'Tipset Transaction',
    category: 'data',
  },
  accountTransactions: {
    path: ['transactions/address'],
    description: 'Account Transactions',
    category: 'data',
  },
}

export const endpointMainnet: { [key: string]: endpointDataType } = {
  // data
  // account
  accountInfo: {
    path: ['account/info', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/account/info/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/account/info/f3vlx5btbwx2lpm3usvchodpkjpuulcwmzx5sl4elg2njtazz2eroboo6ktx2f2pglziusvif5yrtqflx57rtq`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },
  accountBalance: {
    path: ['account/balance', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/account/balance/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/account/balance/f3vlx5btbwx2lpm3usvchodpkjpuulcwmzx5sl4elg2njtazz2eroboo6ktx2f2pglziusvif5yrtqflx57rtq`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },

  // tipset
  tipset: {
    path: ['tipset/height', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/tipset/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/tipset/height/554105`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },

  latestTipset: {
    path: ['tipset/latest', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/tipset/latest`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/tipset/latest`,
    description: `${currentApiVersion} Mainnet`,
  },

  // transactions
  // hash
  transaction: {
    path: ['transactions/hash', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/hash/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/hash/bafy2bzacebdcvl66j2zzkw7ruz7tfieipancxlg23cls4rzeuo6guntchrsus`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },

  // height
  tipsetTransactions: {
    path: ['transactions/height', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/height/554105`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },

  // address
  accountTransactions: {
    path: ['transactions/address', `${currentApiVersion}/mainnet`],
    endpoint: `/fil/data/${currentApiVersion}/mainnet/transactions/address/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/mainnet/transactions/address/f3ujrh5xhq6l3oztjkatpbyg7q3zlscqitewlzbsbckbo4fuxokogzb5hnhcokeh6erahfkcopx4q2zchbndoq`,
    description: `${currentApiVersion} Mainnet`,
    necessary: true,
  },

  // decoder
  decodeBytecode: {
    path: ['contract/bytecode/'],
    endpoint: '/fil/decoder/v2/mainnet/contract/bytecode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/mainnet/contract/bytecode/f410fsr7gywdsv5lmrbw7jticezmc6dj7zmk67bipa2q',
    description: 'Get Contract Bytecode',
    category: 'decoder',
  },
  decodeContract: {
    path: ['contract/decode/'],
    endpoint: '/fil/decoder/v2/mainnet/contract/decode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/mainnet/contract/decode/f410fsr7gywdsv5lmrbw7jticezmc6dj7zmk67bipa2q',
    description: 'Decode Contract',
    category: 'decoder',
    necessary: true,
  },
  decodeTransaction: {
    path: ['transaction/decode/'],
    endpoint: '/fil/decoder/v2/mainnet/transaction/decode/',
    testUrl:
      'https://api.zondax.ch/fil/decoder/v2/mainnet/transaction/decode/bafy2bzaceb6cczvrrr3dpkjqkq3ayelt6ktorpuag24w6jfspdmcknzgwu4uo',
    description: 'Decode Transaction',
    category: 'decoder',
  },
  verified: {
    path: ['contract/verified/'],
    endpoint: '/fil/decoder/v2/mainnet/contract/verified/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/mainnet/contract/verified/f410fsr7gywdsv5lmrbw7jticezmc6dj7zmk67bipa2q',
    description: 'Contract Verified Status',
    category: 'decoder',
  },
  compilers: {
    path: ['contract/verification/compilers'],
    endpoint: '/fil/decoder/v2/mainnet/contract/verification/compilers',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/mainnet/contract/verification/compilers',
    description: 'Get sol compilers',
    category: 'decoder',
  },
  ipfs: {
    path: ['ipfs/'],
    endpoint: '/fil/decoder/v2/mainnet/ipfs/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/mainnet/ipfs/QmV8bJc8PLayXKqEcPX2ZZgbW3eygQqGMbYNpuyCnH13cr',
    description: 'Get IPFS Content',
    category: 'decoder',
  },
  // tools
  hashEthToFil: {
    path: ['hash/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/0xe801d5d79aaad4045f262d98b702c3675baa6ba3b59455cf577b22af925f8d7d`,
    description: 'Hash from ETH to FIL',
    category: 'tools',
  },
  hashFilToEth: {
    path: ['hash/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/bafy2bzaceanabmrxbjodkvdszw6ileyqrpi2p4a6e35qfsdl462kkjgpfcmma`,
    description: 'Hash from FIL to ETH',
    category: 'tools',
  },
  AddressEthToFil: {
    path: ['address/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/0x0000000000ec577ad90e99ca7817e976e953c3bd`,
    description: 'Address from ETH to FIL',
    category: 'tools',
  },
  AddressFilToEth: {
    path: ['address/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/f410faaaaaaaa5rlxvwiothfhqf7jo3uvhq55ocuvwiq`,
    description: 'Address from FIL to ETH',
    category: 'tools',
  },
}

export const endpointCalibration: { [key: string]: endpointDataType } = {
  // data
  // account
  accountInfo: {
    path: ['account/info', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/account/info/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/account/info/f016592`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },
  accountBalance: {
    path: ['account/balance', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/account/balance/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/account/balance/f016592`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },

  // tipset
  tipset: {
    path: ['tipset/height', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/tipset/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/tipset/height/554105`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },

  latestTipset: {
    path: ['tipset/latest', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/tipset/latest`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/tipset/latest`,
    description: `${currentApiVersion} Calibration`,
  },

  // transactions
  // hash
  transaction: {
    path: ['transactions/hash', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/hash/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/hash/bafy2bzacedyi4zyvj26u7yjbdtbt4zvxl4htu3nq3b4e2g6bmk5vstzpuy2mq`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },

  // height
  tipsetTransactions: {
    path: ['transactions/height', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/height/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/height/554105`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },

  // address
  accountTransactions: {
    path: ['transactions/address', `${currentApiVersion}/calibration`],
    endpoint: `/fil/data/${currentApiVersion}/calibration/transactions/address/`,
    testUrl: `https://api.zondax.ch/fil/data/${currentApiVersion}/calibration/transactions/address/f3q4642vh7pwazuinblgeqiyutops5jkxnremayinqow5lajf332iewqalalh264svle4azb6456xoblrq6pfa`,
    description: `${currentApiVersion} Calibration`,
    necessary: true,
  },

  // decoder
  decodeBytecode: {
    path: ['contract/bytecode/'],
    endpoint: '/fil/decoder/v2/calibration/contract/bytecode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/bytecode/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Get Contract Bytecode',
    category: 'decoder',
  },
  decodeContract: {
    path: ['contract/decode/'],
    endpoint: '/fil/decoder/v2/calibration/contract/decode/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/decode/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Decode Contract',
    category: 'decoder',
    necessary: true,
  },
  decodeTransaction: {
    path: ['transaction/decode/'],
    endpoint: '/fil/decoder/v2/calibration/transaction/decode/',
    testUrl:
      'https://api.zondax.ch/fil/decoder/v2/calibration/transaction/decode/bafy2bzacebprulescyzlcnunwxu44nqf5kw2ontdvuhxwtn64sn55vyuvbgdq',
    description: 'Decode Transaction',
    category: 'decoder',
  },
  verified: {
    path: ['contract/verified/'],
    endpoint: '/fil/decoder/v2/calibration/contract/verified/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/verified/f410fc4oqz4o47leiyhmo5ynji2k4iyxmuxozj4urctq',
    description: 'Contract Verified Status',
    category: 'decoder',
  },
  compilers: {
    path: ['contract/verification/compilers'],
    endpoint: '/fil/decoder/v2/calibration/contract/verification/compilers',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/contract/verification/compilers',
    description: 'Get sol compilers',
    category: 'decoder',
  },
  ipfs: {
    path: ['ipfs/'],
    endpoint: '/fil/decoder/v2/calibration/ipfs/',
    testUrl: 'https://api.zondax.ch/fil/decoder/v2/calibration/ipfs/QmV8bJc8PLayXKqEcPX2ZZgbW3eygQqGMbYNpuyCnH13cr',
    description: 'Get IPFS Content',
    category: 'decoder',
  },

  // tools
  hashEthToFil: {
    path: ['hash/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/EthToFil/0xe801d5d79aaad4045f262d98b702c3675baa6ba3b59455cf577b22af925f8d7d`,
    description: 'Hash from ETH to FIL',
    category: 'tools',
  },
  hashFilToEth: {
    path: ['hash/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/hash/FilToEth/bafy2bzaceanabmrxbjodkvdszw6ileyqrpi2p4a6e35qfsdl462kkjgpfcmma`,
    description: 'Hash from FIL to ETH',
    category: 'tools',
  },
  AddressEthToFil: {
    path: ['address/EthToFil/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/EthToFil/0x0000000000ec577ad90e99ca7817e976e953c3bd`,
    description: 'Address from ETH to FIL',
    category: 'tools',
  },
  AddressFilToEth: {
    path: ['address/FilToEth/'],
    endpoint: `/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/`,
    testUrl: `https://api.zondax.ch/fil/tools/${currentApiVersion}/calibration/convert/address/FilToEth/f410faaaaaaaa5rlxvwiothfhqf7jo3uvhq55ocuvwiq`,
    description: 'Address from FIL to ETH',
    category: 'tools',
  },
}

export const vitalEndpoints: endpointDataType[] = [
  // Mainnet
  // vital for search
  endpointMainnet.accountInfo,
  endpointMainnet.accountBalance,
  endpointMainnet.tipset,
  endpointMainnet.latestTipset,
  endpointMainnet.transaction,
  endpointMainnet.tipsetTransactions,
  endpointMainnet.accountTransactions,

  // vital for contracts
  endpointMainnet.decodeContract,
  endpointMainnet.decodeTransaction,
  endpointMainnet.verified,
  //   endpointMainnet.ipfs, Update IPF id for mainnet

  // Calibration
  // vital for search
  endpointCalibration.accountInfo,
  endpointCalibration.accountBalance,
  endpointCalibration.tipset,
  endpointCalibration.latestTipset,
  endpointCalibration.transaction,
  endpointCalibration.tipsetTransactions,
  endpointCalibration.accountTransactions,

  // vital for contracts
  endpointCalibration.decodeContract,
  endpointCalibration.decodeTransaction,
  endpointCalibration.verified,
  endpointCalibration.ipfs,
]
