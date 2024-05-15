declare module '@zondax/ledger-filecoin' {
  import Transport from '@ledgerhq/hw-transport'
  class FilecoinApp {
    versionResponse: any
    constructor(transport: Transport)

    getVersion(): Promise<any>
    appInfo(): Promise<any>
    deviceInfo(): Promise<any>
    getAddressAndPubKey(path: string): Promise<any>
    showAddressAndPubKey(path: string): Promise<any>
    sign(path: string, message: Buffer): Promise<any>
    signRemoveDataCap(path: string, message: Buffer): Promise<any>
    signClientDeal(path: string, message: Buffer): Promise<any>
    signRawBytes(path: string, message: Buffer): Promise<any>
    signETHTransaction(path: string, rawTxHex: string, resolution?: any): Promise<any>
    getETHAddress(path: string, boolDisplay?: boolean, boolChaincode?: boolean): Promise<any>
  }

  export default FilecoinApp
}
