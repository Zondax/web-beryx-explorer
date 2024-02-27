import { Networks } from '@/config/networks'
import { setTestAuthToken } from '@/helpers/jest'
import '@testing-library/jest-dom'

import {
  fetchAccountInfo,
  fetchAddressEthForm,
  fetchAddressFilForm,
  fetchAddressValid,
  fetchAddressValueFlow,
  fetchContractCompilers,
  fetchContractVerified,
  fetchContractsVerified,
  fetchEthForm,
  fetchFilForm,
  fetchGasUsed,
  fetchRichList,
  fetchTipsetByHeight,
  fetchTransactionDetails,
  fetchTransactionsByAddress,
  fetchTransactionsByHash,
  fetchTransactionsByHeight,
  postContractVerify,
} from './beryx'

beforeAll(async () => {
  await setTestAuthToken()
})

describe('tipsets', () => {
  /**
   * Test for getting tipset general information.
   */
  test('get tipset general information', async () => {
    const tipset = await fetchTipsetByHeight(725009, Networks.calibration)

    expect(tipset.height).toBe(725009)
    expect(tipset.timestamp).toBe('2023-07-11T11:57:30Z')
    expect(tipset.canonical).toBe(true)
    expect(tipset.parent_tipset_cid).toBe('bafy2bzacedbi5ezghd5vh5ude72arncdp5whcdojf347op2o3umwrvsi47lq4')
    expect(tipset.tipset_cid).toBe('bafy2bzacecvnwaz2nwrup4bd5rr5qtusmxdbwxtyfqsesfft7jmdgndy6afaq')
    expect(tipset.base_fee).toBe(100)
    expect(tipset.blocks_cid).toEqual([
      'bafy2bzaceahcpj4mq3klyyvqgkokumsltxttvzqt7gbjed2tjiescyv3upeiy',
      'bafy2bzaceafqf3sspad35kaafr4zo3g56bm5fpbe6agvv6ognh2rfbr4xrokw',
      'bafy2bzaceddaknz5pobbkoqdm3x46vnril5h4nvguola3awnprmooj3iho73c',
      'bafy2bzacedxtposyuizi3kqmvxvl4wwbzhdpgjjw3gubq5wyihktnlxzqflk2',
      'bafy2bzacedqhhpe2eks77ihmnjlc355h6vhgue32p2qrnseaho2emohzpxy7g',
    ])
    expect(tipset.create_timestamp).toBe('2023-12-13T23:46:50Z')
    expect(tipset.id).toBe('e1f7096a-0e60-5747-aad5-af1b5c07d782')
    expect(tipset.total_txs).toBe(8)
  })

  /**
   * Test for getting tipset transactions.
   */
  test('get tipset transactions', async () => {
    const tipsetTxsResponse = await fetchTransactionsByHeight(725009, Networks.calibration)
    expect(tipsetTxsResponse.transactions).toBeDefined()
    expect(tipsetTxsResponse.transactions.length).toBeGreaterThan(0)
  })
})

describe('accounts', () => {
  /**
   * Test for getting account general information.
   */
  test('get account general information', async () => {
    const accountInfoResponse = await fetchAccountInfo('f410fjf57ur552leb5khcoyvsi3tbc6wzosswogikjly', Networks.calibration)
    expect(accountInfoResponse).toBeDefined()
    expect(Object.keys(accountInfoResponse).length).toBeGreaterThan(0)
  })

  /**
   * Test for getting account sent transactions.
   */
  test('get account sent transactions', async () => {
    const accountTxsResponse = await fetchTransactionsByAddress(
      'f410fjf57ur552leb5khcoyvsi3tbc6wzosswogikjly',
      Networks.calibration,
      'sender'
    )
    expect(accountTxsResponse).toBeDefined()
    expect(accountTxsResponse.next_cursor).toBeDefined()
  })

  /**
   * Test for getting account received transactions.
   */
  test('get account received transactions', async () => {
    const accountTxsResponse = await fetchTransactionsByAddress(
      'f410fot3vkzzorqg4alowvghvxx4mhofhtazixbm6z2i',
      Networks.calibration,
      'receiver'
    )
    expect(accountTxsResponse).toBeDefined()
    expect(accountTxsResponse.transactions).toBeDefined()
  })

  /**
   * Test for getting account general information for the mainnet network.
   */
  test('get account info for mainnet', async () => {
    const accountInfoResponse = await fetchAccountInfo('f410fjf57ur552leb5khcoyvsi3tbc6wzosswogikjly', Networks.mainnet)
    expect(accountInfoResponse).toBeDefined()
    expect(Object.keys(accountInfoResponse).length).toBeGreaterThan(0)
  })
})

describe('transactions', () => {
  test.skip('get transaction details', async () => {
    const TxtTxsResponse = await fetchTransactionDetails(
      'bafy2bzacecky6bymowenxxx2ksjnyaqifedzusua7bsltd4gqim6h7jxjsn5u',
      Networks.calibration
    )
    expect(TxtTxsResponse.transactions).toBeDefined()
    expect(TxtTxsResponse.transactions.length).toBeGreaterThan(0)
  })

  /**
   * Test for getting transaction from hash.
   */
  test('get transaction from hash', async () => {
    const TxtTxsResponse = await fetchTransactionsByHash(
      'bafy2bzacecky6bymowenxxx2ksjnyaqifedzusua7bsltd4gqim6h7jxjsn5u',
      Networks.calibration
    )
    expect(TxtTxsResponse.transactions).toBeDefined()
    expect(TxtTxsResponse.transactions.length).toBeGreaterThan(0)
  })
})

describe('contracts', () => {
  /**
   * Test for getting transaction from hash.
   */
  test('get contract verified (fail)', async () => {
    const resp = await fetchContractVerified(Networks.mainnet, 'f410fvlxxr2xynxhtj4tvfcdvf2esijg5ve2brrjf2oq')
    expect(resp).not.toBeDefined()
  })

  test('get contract verified (valid)', async () => {
    const resp = await fetchContractVerified(Networks.mainnet, 'f410fbc5bvr7rl4rbl4t3kqb2rg7nelhlodh3qe2l5ii')
    expect(resp).toBeDefined()
    expect(resp?.datetime).toBe(1690331390)
    expect(resp?.solc).toStrictEqual(['0.8.12'])
    expect(resp?.licenses).toStrictEqual(['MIT'])
    expect(resp?.verifiers).toStrictEqual(['local'])
    expect(resp?.verificationType).toBe('full')
    expect(resp?.sourceCID).toBe('QmTerrVm2M5TwtVzeTghSandw53pqsYKprvYARz5KqTQhv')
    expect(resp?.constructorParams).toStrictEqual({})
    expect(resp?.optimizerRuns).toBe(0)
    expect(resp?.contractName).toBe('Multicall3')
    expect(resp?.contractAddress).toBe('0x08ba1ac7f15f2215f27b5403a89bed22ceb70cfb')
  })

  test('get contract valid compilers', async () => {
    const resp = await fetchContractCompilers(Networks.mainnet)
    expect(resp).toBeDefined()
    expect(Array.isArray(resp.available_compilers)).toBe(true)
    expect(resp.available_compilers.length).toBeGreaterThan(0)
  })

  test('get contracts that are verified', async () => {
    const resp = await fetchContractsVerified(Networks.mainnet)
    expect(resp).toBeDefined()
    expect(resp.next_cursor).toBeDefined()
    expect(Array.isArray(resp.data)).toBe(true)
  })

  test.skip('post contracts verification', async () => {
    const dataToSend = {} as FormData
    const resp = await postContractVerify(Networks.mainnet, dataToSend)
    expect(resp).toBeDefined()
  })
})

describe('stats', () => {
  /**
   * Test for getting transaction from hash.
   */
  test('get rich list', async () => {
    const response = await fetchRichList(Networks.calibration)
    expect(response).toBeDefined()
  })

  /**
   * Test for getting transaction from hash.
   */
  test('get gas used', async () => {
    const response = await fetchGasUsed(Networks.calibration, 'monthly')
    expect(response).toBeDefined()
  })

  /**
   * Test for getting transaction from hash.
   */
  test('get address value flow', async () => {
    const response = await fetchAddressValueFlow('f410fot3vkzzorqg4alowvghvxx4mhofhtazixbm6z2i', Networks.calibration)
    expect(response).toBeDefined()
    expect(response.results).toBeDefined()
  })
})

describe('tools', () => {
  describe('convert addresses', () => {
    /**
     * Test for converting an address from ETH to FIL form and vice versa.
     */
    test('Success - Not error - Address ETH to FIL', async () => {
      const filForm = await fetchAddressFilForm('0x587a7eae9b461ad724391aa7195210e0547ed11d', Networks.mainnet)
      expect(filForm).toBeDefined()
      expect(filForm).not.toBe('error')
    })

    test('Success - Address ETH to FIL', async () => {
      const filForm = await fetchAddressFilForm('0x587a7eae9b461ad724391aa7195210e0547ed11d', Networks.mainnet)
      expect(filForm).toBe('f410flb5h5lu3iynnojbzdktrsuqq4bkh5ui5druq3pq')
    })

    test('Success - Address FIL to FIL', async () => {
      const filForm = await fetchAddressFilForm('f410flb5h5lu3iynnojbzdktrsuqq4bkh5ui5druq3pq', Networks.mainnet)
      expect(filForm).toBe('f410flb5h5lu3iynnojbzdktrsuqq4bkh5ui5druq3pq')
    })

    test('Error - Invalid Address - Address ETH to FIL', async () => {
      try {
        await fetchAddressFilForm('0x587a7eae9b461ad724391aa7195210e0547', Networks.mainnet)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })

    /**
     * Test for converting an address from FIL to ETH form.
     */
    test('Success - Address FIL to ETH', async () => {
      const ethForm = await fetchAddressEthForm('f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxxqmfk2mky', Networks.mainnet)
      expect(ethForm).toBe('0x37878c623d87d5e99bea602b9b72886676f3def0')
    })

    test('Success - Address ETH to ETH', async () => {
      const ethForm = await fetchAddressEthForm('0x37878c623d87d5e99bea602b9b72886676f3def0', Networks.mainnet)
      expect(ethForm).toBe('0x37878c623d87d5e99bea602b9b72886676f3def0')
    })

    test('Error - Invalid Address - Address FIL to ETH', async () => {
      try {
        await fetchAddressEthForm('f410fg6dyyyr5q7k6tg7kmavzw4uimz3phxx', Networks.mainnet)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })
  })

  /**
   * Test suite for getEthForm function.
   */
  describe('convert hashes', () => {
    /**
     * Test for converting a hash from ETH to FIL form.
     */
    test('Success - Not error - Hash ETH to FIL', async () => {
      const filForm = await fetchFilForm('0xc5266c89359a68bb90f130556338941b90ac980532894209c045f0bd775e68fa', Networks.mainnet)
      expect(filForm).toBeDefined()
      expect(filForm).not.toBe('error')
    })

    test('Success - Hash ETH to FIL', async () => {
      const filForm = await fetchFilForm('0xc5266c89359a68bb90f130556338941b90ac980532894209c045f0bd775e68fa', Networks.mainnet)
      expect(filForm).toBe('bafy2bzaced4e57ohp2ahawau4crfurp7qnkruejxktz6cw3u6pxrao3tg6ek4')
    })

    test('Success - Hash ETH to ETH', async () => {
      const ethForm = await fetchEthForm('0xc5266c89359a68bb90f130556338941b90ac980532894209c045f0bd775e68fa', Networks.mainnet)
      expect(ethForm).toBe('0xc5266c89359a68bb90f130556338941b90ac980532894209c045f0bd775e68fa')
    })

    test('Error - Invalid Hash - Hash ETH to FIL', async () => {
      try {
        await fetchFilForm('0xc5266c89359a68bb90f130556338941b90ac980532894209c045f0bd7', Networks.mainnet)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })

    /**
     * Test for converting a hash from FIL to ETH form.
     */
    test('Success - Hash FIL to ETH', async () => {
      const ethForm = await fetchEthForm('bafy2bzaced2wv36tv4xpdheznfyujpsnko7umirgi5y2btjaynkhyxhobo5vs', Networks.mainnet)
      expect(ethForm).toBe('0x6e60d01ffb23c4c0fd198cd4e8335e5d44039be9f9c4e579cdf47ecac8d00e61')
    })

    test('Success - Hash FIL to FIL', async () => {
      const filForm = await fetchFilForm('bafy2bzaced2wv36tv4xpdheznfyujpsnko7umirgi5y2btjaynkhyxhobo5vs', Networks.mainnet)
      expect(filForm).toBe('bafy2bzaced2wv36tv4xpdheznfyujpsnko7umirgi5y2btjaynkhyxhobo5vs')
    })

    test('Error - Invalid Hash - Hash FIL to ETH', async () => {
      try {
        await fetchEthForm('bafy2bzaced2wv36tv4xpdheznfyujpsnko7umirgi5y2btjaynkhyx', Networks.mainnet)
      } catch (error: any) {
        expect(error.response.status).toBe(400)
      }
    })
  })

  /**
   * Test suite for validating address.
   */
  describe('Validate address', () => {
    test('Success ETH', async () => {
      const isValid = await fetchAddressValid('0x2c8693c035ff2ec33eff3e233d80d3efe23e1913', Networks.calibration)
      expect(isValid).toBe(true)
    })
    test('Success FIL', async () => {
      const isValid = await fetchAddressValid('f410ffsdjhqbv74xmgpx7hyrt3agt57rd4gitoz3hvcq', Networks.calibration)
      expect(isValid).toBe(true)
    })
    test('Fail', async () => {
      const isValid = await fetchAddressValid('f410ffsdjhqbv74xmgpx7hyrt3agt57rd4gitoz3hvctttt', Networks.calibration)
      expect(isValid).toBe(false)
    })
  })
})
