import { getNetworkExamples } from '@/config/data'
import { NetworkMetamaskId, NetworkUniqueId, Networks } from '@/config/networks'
import { setTestAuthToken } from '@/helpers/jest'
import { ObjectType } from '@/routes/parsing'
import '@testing-library/jest-dom'

beforeAll(async () => {
  await setTestAuthToken()
})

/**
 * Test suite for example searches for calibration network.
 */
describe('Example searches for calibration network', () => {
  /**
   * Test for getting network examples for the mainnet network.
   */
  test('get network examples for mainnet', () => {
    const examples = getNetworkExamples(Networks.mainnet)
    expect(examples).toBeDefined()
    expect(examples.length).toBeGreaterThan(0)

    const contractExample = examples.find(example => example.type === ObjectType.ADDRESS && example.name === 'Contract')
    expect(contractExample).toBeDefined()
    expect(contractExample?.data).toBe('f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxxqmfk2mky')

    const addressExample = examples.find(example => example.type === ObjectType.ADDRESS && example.name === 'Address')
    expect(addressExample).toBeDefined()
    expect(addressExample?.data).toBe('f3u54wclxf5osictiuptwyhnu5nmdma6cdum4n7pdmanmflqt25srrtlwxjur5uhly2k476dhfwrierfa6o5pa')

    const transactionExample = examples.find(example => example.type === ObjectType.TXS && example.name === 'Transaction')
    expect(transactionExample).toBeDefined()
    expect(transactionExample?.data).toBe('bafy2bzaceab3xcn7qkcuj5oyifa6dn3ihke55bdmerphef4r6aorjdhk3uriq')

    const tipsetExample = examples.find(example => example.type === ObjectType.TIPSET && example.name === 'Tipset')
    expect(tipsetExample).toBeDefined()
    expect(tipsetExample?.data).toBe(2708613)
  })

  /**
   * Test for getting network examples for the calibration network.
   */
  test('get network examples for calibration', () => {
    const examples = getNetworkExamples(Networks.calibration)
    expect(examples).toBeDefined()
    expect(examples.length).toBeGreaterThan(0)
    const contractExample = examples.find(example => example.type === ObjectType.ADDRESS && example.name === 'Contract')
    const addressExample = examples.find(example => example.type === ObjectType.ADDRESS && example.name === 'Address')
    const transactionExample = examples.find(example => example.type === ObjectType.TXS && example.name === 'Transaction')
    const tipsetExample = examples.find(example => example.type === ObjectType.TIPSET && example.name === 'Tipset')
    expect(contractExample).toBeDefined()
    expect(addressExample).toBeDefined()
    expect(transactionExample).toBeDefined()
    expect(tipsetExample).toBeDefined()
    expect(contractExample?.data).toBe('t410fjf57ur552leb5khcoyvsi3tbc6wzosswogikjly')
    expect(addressExample?.data).toBe('t410fns2biispboi54xb3mfxhadruuulsyfe73avfmey')
    expect(transactionExample?.data).toBe('bafy2bzaceam3ihtqa73ru2bdvwoyaouwjwktsonkvs3rwwrn3z43e3xh3y4fk')
    expect(tipsetExample?.data).toBe(725009)
  })

  /**
   * Test for getting network examples for an unsupported network.
   */
  test('get network examples for unsupported network', () => {
    expect(() =>
      getNetworkExamples({
        uniqueId: 'unsupported' as NetworkUniqueId,
        show: false,
        metamaskId: '' as NetworkMetamaskId,
        project: '',
        name: '',
        isTestnet: false,
        url: '',
        slug: undefined,
        natSlug: undefined,
        currency: {
          symbol: 'FIL',
          decimals: 18,
        },
        chainSlug: 'fil',
        chainId: 3,
      })
    ).toThrow('Missing examples for network: unsupported')
  })
})
