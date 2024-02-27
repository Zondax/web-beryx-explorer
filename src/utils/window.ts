/**
 * @module window
 * @description This module extends the Window interface to include ethereum and web3 properties.
 */
import Web3 from 'web3'

import { MetaMaskInpageProvider } from '@metamask/providers'

export {}

declare global {
  /**
   * @interface Window
   * @description The Window interface represents a window containing a DOM document.
   * This module extends the Window interface to include ethereum and web3 properties.
   */
  interface Window {
    /**
     * @property {undefined | MetaMaskInpageProvider} ethereum
     * @description The ethereum property represents the MetaMaskInpageProvider.
     */
    ethereum: undefined | MetaMaskInpageProvider
    /**
     * @property {undefined | Web3} web3
     * @description The web3 property represents the Web3 instance.
     */
    web3: undefined | Web3
  }
}
