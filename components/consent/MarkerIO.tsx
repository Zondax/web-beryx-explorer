import Script from 'next/script'
import { Component } from 'react'

import { MarkerIO_ID } from '@/config/config'

/**
 * MarkerIO Component
 * This component helps integrate the Marker.io service with a Next.js web app.
 * It includes necessary scripts for the Marker.io library.
 */
export class MarkerIO extends Component {
  /**
   * Render function for the MarkerIO component.
   * It returns the necessary scripts for the Marker.io library.
   * @returns JSX.Element - The scripts for the Marker.io library.
   */
  render(): JSX.Element {
    return (
      <>
        <Script id="marker_io_config" defer>
          {` window.markerConfig = {
              project: "${MarkerIO_ID}", // ID of Marker.io project to use
              source: 'snippet' // This script's source is a snippet
            }`}
        </Script>
        <Script id="marker_io" defer>
          {
            /*!function(e,r,a)... :  This script enables Marker.io's functionality in the web app
             */
            '!function(e,r,a){if(!e.__Marker){e.__Marker={};var t=[],n={__cs:t};["show","hide","isVisible","capture","cancelCapture","unload","reload","isExtensionInstalled","setReporter","setCustomData","on","off"].forEach(function(e){n[e]=function(){var r=Array.prototype.slice.call(arguments);r.unshift(e),t.push(r)}}),e.Marker=n;var s=r.createElement("script");s.async=1,s.src="https://edge.marker.io/latest/shim.js";var i=r.getElementsByTagName("script")[0];i.parentNode.insertBefore(s,i)}}(window,document);'
          }
        </Script>
      </>
    )
  }
}
