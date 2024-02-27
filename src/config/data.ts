import { NetworkType, Networks } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { captureException } from '@sentry/nextjs'

/**
 * Type for the genesis metadata.
 */
export type GenesisMetadataItem = { [key: string]: string | number }

/**
 * Type for the data object that contains information about the genesis block and network parameters for a given network.
 */
export type NetworkMetadata = { [key: string]: GenesisMetadataItem }

/**
 * Returns a data object that contains information about the genesis block and network parameters for a given network.
 * @param network - The type of the network.
 * @returns A data object that contains information about the genesis block and network parameters for a given network.
 */
export function getNetworkMetadata(network: NetworkType): NetworkMetadata {
  switch (network.uniqueId) {
    case Networks.mainnet.uniqueId:
      return {
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
      }
    case Networks.calibration.uniqueId:
      return {
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
      }
    default: {
      const err = new Error(`Missing metadata for network: ${network?.uniqueId}`)
      captureException(err)
      throw err
    }
  }
}

enum descriptions {
  address = 'Unique cryptographic value that serves to publicly identify a user. This value, a public key, is paired with a corresponding private key.',
  transaction = 'Filecoin implements a transaction ledger via a blockchain, in which each block must be accompanied by a proof-of-work based on a cryptographic hash function.',
  tipset = 'Set of blocks that each have the same height and parent tipset; the Filecoin blockchain is a chain of tipsets, rather than a chain of blocks.',
  block = 'A fundamental concept in Filecoin. Every block refers to at least one parent block; that is, a block produced in a prior epoch.',
}

/**
 * Interface for network examples.
 */
interface NetworkExamples {
  /**
   * The name of the network example.
   */
  name: string
  /**
   * The input type of the network example.
   */
  type: ObjectType
  /**
   * The description of the network example.
   */
  description: string
  /**
   * The link description of the network example.
   */
  linkDesc: string
  /**
   * The data of the network example.
   */
  data: string | number
}

/**
 * Function to get network examples.
 * @param network - The network type.
 * @returns An array of network examples.
 */
export function getNetworkExamples(network: NetworkType): NetworkExamples[] {
  switch (network.uniqueId) {
    case Networks.mainnet.uniqueId:
      return [
        {
          name: 'Address',
          type: ObjectType.ADDRESS,
          description: descriptions.address,
          linkDesc: 'View address example',
          data: 'f3u54wclxf5osictiuptwyhnu5nmdma6cdum4n7pdmanmflqt25srrtlwxjur5uhly2k476dhfwrierfa6o5pa',
        },
        {
          name: 'Block',
          type: ObjectType.BLOCK,
          description: descriptions.block,
          linkDesc: 'View tipset example',
          data: 'bafy2bzaceb2udtsfnbz6viwq3mscy4msh4tcr5lhy7fscweovpsk4ksnl4sgu',
        },
        {
          name: 'Contract',
          type: ObjectType.ADDRESS,
          description: descriptions.address,
          linkDesc: 'View contract example',
          data: 'f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxxqmfk2mky',
        },
        {
          name: 'Tipset',
          type: ObjectType.TIPSET,
          description: descriptions.tipset,
          linkDesc: 'View tipset example',
          data: 2708613,
        },
        {
          name: 'Transaction',
          type: ObjectType.TXS,
          description: descriptions.transaction,
          linkDesc: 'View transaction example',
          data: 'bafy2bzaceab3xcn7qkcuj5oyifa6dn3ihke55bdmerphef4r6aorjdhk3uriq',
        },
      ]
    case Networks.calibration.uniqueId:
      return [
        {
          name: 'Address',
          type: ObjectType.ADDRESS,
          description: descriptions.address,
          linkDesc: 'View address example',
          data: 'f410fns2biispboi54xb3mfxhadruuulsyfe73avfmey',
        },
        {
          name: 'Block',
          type: ObjectType.BLOCK,
          description: descriptions.block,
          linkDesc: 'View tipset example',
          data: 'bafy2bzaceahcpj4mq3klyyvqgkokumsltxttvzqt7gbjed2tjiescyv3upeiy',
        },
        {
          name: 'Contract',
          type: ObjectType.ADDRESS,
          description: descriptions.address,
          linkDesc: 'View contract example',
          data: 'f410fjf57ur552leb5khcoyvsi3tbc6wzosswogikjly',
        },
        {
          name: 'Tipset',
          type: ObjectType.TIPSET,
          description: descriptions.tipset,
          linkDesc: 'View tipset example',
          data: 725009,
        },
        {
          name: 'Transaction',
          type: ObjectType.TXS,
          description: descriptions.transaction,
          linkDesc: 'View transaction example',
          data: 'bafy2bzaceam3ihtqa73ru2bdvwoyaouwjwktsonkvs3rwwrn3z43e3xh3y4fk',
        },
      ]
    default: {
      const err = new Error(`Missing examples for network: ${network?.uniqueId}`)
      captureException(err)
      throw err
    }
  }
}
