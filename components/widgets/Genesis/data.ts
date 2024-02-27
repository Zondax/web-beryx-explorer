/**
 * This file exports a data object that contains information about the genesis block and network parameters for different networks.
 * Each network has a genesis block with properties like 'CAR File', 'Reset Timestamp', 'genesis Block CID', and 'SHA-1 Digest'.
 * Each network also has network parameters like 'Supported Sector Sizes', 'Consensus Miner Min Power', 'Epoch Duration Seconds', etc.
 *
 * @module components/widgets/Genesis/data
 * @property {Object} data - The data object containing information about the genesis block and network parameters for different networks.
 * @property {Object} data.mainnet - The mainnet network.
 * @property {Object} data.mainnet.genesis - The genesis block of the mainnet network.
 * @property {string} data.mainnet.genesis['CAR File'] - The CAR file of the mainnet network's genesis block.
 * @property {string} data.mainnet.genesis['Reset Timestamp'] - The reset timestamp of the mainnet network's genesis block.
 * @property {string} data.mainnet.genesis['genesis Block CID'] - The genesis Block CID of the mainnet network's genesis block.
 * @property {string} data.mainnet.genesis['SHA-1 Digest'] - The SHA-1 Digest of the mainnet network's genesis block.
 * @property {Object} data.mainnet.networkParameters - The network parameters of the mainnet network.
 * @property {string} data.mainnet.networkParameters['Supported Sector Sizes'] - The supported sector sizes of the mainnet network.
 * @property {string} data.mainnet.networkParameters['Consensus Miner Min Power'] - The minimum power required for a miner to participate in consensus in the mainnet network.
 * @property {number} data.mainnet.networkParameters['Epoch Duration Seconds'] - The duration of an epoch in seconds in the mainnet network.
 * @property {number} data.mainnet.networkParameters['Expected Leaders per Epoch'] - The expected number of leaders per epoch in the mainnet network.
 * @property {number} data.mainnet.networkParameters['WindowPoSt Proving Period'] - The WindowPoSt proving period in the mainnet network.
 * @property {number} data.mainnet.networkParameters['WindowPoSt Challenge Window'] - The WindowPoSt challenge window in the mainnet network.
 * @property {number} data.mainnet.networkParameters['WindowPoSt Period Deadlines'] - The WindowPoSt period deadlines in the mainnet network.
 * @property {number} data.mainnet.networkParameters['Pre-Commit Challenge Delay'] - The pre-commit challenge delay in the mainnet network.
 * @property {Object} data.calibration - The calibration network.
 * @property {Object} data.calibration.genesis - The genesis block of the calibration network.
 * @property {string} data.calibration.genesis['CAR File'] - The CAR file of the calibration network's genesis block.
 * @property {string} data.calibration.genesis['Reset Timestamp'] - The reset timestamp of the calibration network's genesis block.
 * @property {string} data.calibration.genesis['genesis Block CID'] - The genesis Block CID of the calibration network's genesis block.
 * @property {string} data.calibration.genesis['SHA-1 Digest'] - The SHA-1 Digest of the calibration network's genesis block.
 * @property {Object} data.calibration.networkParameters - The network parameters of the calibration network.
 * @property {string} data.calibration.networkParameters['Supported Sector Sizes'] - The supported sector sizes of the calibration network.
 * @property {string} data.calibration.networkParameters['Consensus Miner Min Power'] - The minimum power required for a miner to participate in consensus in the calibration network.
 * @property {number} data.calibration.networkParameters['Epoch Duration Seconds'] - The duration of an epoch in seconds in the calibration network.
 * @property {number} data.calibration.networkParameters['Expected Leaders per Epoch'] - The expected number of leaders per epoch in the calibration network.
 * @property {number} data.calibration.networkParameters['WindowPoSt Proving Period'] - The WindowPoSt proving period in the calibration network.
 * @property {number} data.calibration.networkParameters['WindowPoSt Challenge Window'] - The WindowPoSt challenge window in the calibration network.
 * @property {number} data.calibration.networkParameters['WindowPoSt Period Deadlines'] - The WindowPoSt period deadlines in the calibration network.
 * @property {number} data.calibration.networkParameters['Pre-Commit Challenge Delay'] - The pre-commit challenge delay in the calibration network.
 */
export const data: { [key: string]: { [key: string]: { [key: string]: string | number } } } = {
  mainnet: {
    genesis: {
      'CAR File': 'QmavMCf95w2UMYGD1J5GpHcWBWXR2jTFYmtAkgeroMmpk1',
      'Reset Timestamp': '2020-08-24T22:00:00Z',
      'Genesis Block CID': 'bafy2bzacecnamqgqmifpluoeldx7zzglxcljo6oja4vrmtj7432rphldpdmm2',
      'SHA-1 Digest': '4782cb42b4b01793b5cd9f593cc3dc87b6d3c7b4',
    },
    networkParameters: {
      'Supported Sector Sizes': '32 GiB and 64 GiB',
      'Consensus Miner Min Power': '10 TiB',
      'Epoch Duration Seconds': 30,
      'Expected Leaders per Epoch': 5,
      'WindowPoSt Proving Period': 2880,
      'WindowPoSt Challenge Window': 60,
      'WindowPoSt Period Deadlines': 48,
      'Pre-Commit Challenge Delay': 150,
    },
  },
  calibration: {
    genesis: {
      'CAR File': 'QmY581cXXtNwHweiC69jECupu9EBx274huHjSgxPNv1zAAj',
      'Reset Timestamp': '2021-02-19T23:10:00Z',
      'Genesis Block CID': 'bafy2bzaceapb7hfdkewspic7udnogw4xnhjvhm74xy5snwa24forre5z4s2lm',
      'SHA-1 Digest': '944c0c13172b9f552dfed5dfaffaba95113c8254',
    },
    networkParameters: {
      'Supported Sector Sizes': '32 GiB and 64 GiB',
      'Consensus Miner Min Power': '32 GiB',
      'Epoch Duration Seconds': 30,
      'Expected Leaders per Epoch': 5,
      'WindowPoSt Proving Period': 2880,
      'WindowPoSt Challenge Window': 60,
      'WindowPoSt Period Deadlines': 48,
      'Pre-Commit Challenge Delay': 150,
    },
  },
}
