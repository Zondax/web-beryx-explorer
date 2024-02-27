import Script from 'next/script'
import React, { Component } from 'react'

import { GoogleAnalyticsTrackingId, GoogleTagManagerTrackingId } from '@/config/config'

/**
 * GoogleAnalytics class component
 *
 * This class component is used to render google analytics and google tag manager scripts conditionnaly in your Next.js application.
 * To use this component you should import it in your file and use it like a tag: <GoogleAnalytics />.
 */
export class GoogleAnalytics extends Component {
  render() {
    /**
     * renderGA function
     *
     * This function checks if the GoogleAnalyticsTrackingId from the config is present.
     * If it is it renders the google analytics scripts into the application.
     * If it is not it doesn't render anything.
     */
    const renderGA = () => {
      if (!GoogleAnalyticsTrackingId) {
        return null
      }
      return (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GoogleAnalyticsTrackingId}`} strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GoogleAnalyticsTrackingId}');
          `}
          </Script>
        </>
      )
    }

    /**
     * renderGTM function
     *
     * This function checks if the GoogleTagManagerTrackingId from the config is present.
     * If it is it renders the google tag manager scripts and noscripts into the application.
     * If it is not it doesn't render anything.
     */
    const renderGTM = () => {
      if (!GoogleTagManagerTrackingId) {
        return null
      }
      return (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GoogleTagManagerTrackingId}');
          `}
          </Script>
          <noscript>
            <iframe
              title="Google Tag Manager"
              src={`https://www.googletagmanager.com/ns.html?id=${GoogleTagManagerTrackingId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              sandbox="allow-scripts allow-same-origin"
            />
          </noscript>
        </>
      )
    }

    /**
     * Returns Google Anlytics and Google Tag Manager scripts and noscripts.
     */
    return (
      <>
        {renderGA()}
        {renderGTM()}
      </>
    )
  }
}
