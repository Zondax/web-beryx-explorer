/**
 * This file is responsible for generating Open Graph images.
 * It disables the eslint rule for no-img-element as we need to use img elements for generating OG images.
 */
import Image from 'next/image'
import { NextRequest } from 'next/server'

import { fetchBeryxApiToken } from '@/api-client/apiTokens'
import { networkFindByChainSlugAndName } from '@/config/networks'
// Importing fonts for the OG image.
import { fetchContractVerified, getOgImageData } from '@/refactor/ogSearch'
// Importing NextRequest from next/server to handle requests.
import { fontB612Mono, fontDmSans, fontSora } from '@/utils/og-Fonts'
import { captureException } from '@sentry/nextjs'
// Importing utility functions to fetch verified data and OG image data.
import { ImageResponse } from '@vercel/og'

// Importing ImageResponse from @vercel/og to create image responses.
import OgImage from '../../components/common/OgImage'

// Importing the OgImage component to generate the OG image.

// Configuring the runtime to be 'edge'.
export const config = {
  runtime: 'edge',
}

// Constants for image dimensions
const IMAGE_WIDTH = 1200
const IMAGE_HEIGHT = 630

// The main handler function for the API.
export default async function handler(request: NextRequest) {
  try {
    // Parsing the URL parameters from the request.
    const { searchParams } = new URL(request.url)

    // Extracting the networkProject, networkName, input, and inputType parameters from the URL.
    const networkChainSlug = searchParams.has('chain') ? searchParams.get('chain')?.slice(0, 100).toLowerCase() : undefined
    const networkName = searchParams.has('network') ? searchParams.get('network')?.slice(0, 100).toLowerCase() : undefined
    const input = searchParams.has('input') ? searchParams.get('input')?.slice(0, 100) : undefined
    const inputType = searchParams.has('inputType') ? searchParams.get('inputType')?.slice(0, 100) : undefined

    const network = networkFindByChainSlugAndName(networkChainSlug, networkName)

    // Creating a default OG image response.
    const defaultOG = new ImageResponse(
      (
        <div style={{ display: 'flex' }}>
          <Image
            width={IMAGE_WIDTH}
            height={IMAGE_HEIGHT}
            src={'https://beryx.zondax.ch/beryx-og.png'}
            alt="OG Image"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      ),
      {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }
    )

    // If any of the required parameters are missing, return the default OG image.
    if (!input || !network || !inputType) {
      return defaultOG
    }

    const authToken = await fetchBeryxApiToken()

    // Initializing the title and isVerified variables.
    let title = ''
    let isVerified = false
    // Switch case for handling different input types.
    switch (inputType.toLowerCase()) {
      case 'address': {
        title = 'Address'
        isVerified = false
        try {
          const response = await fetchContractVerified(network, input, authToken)
          if (response !== undefined) {
            isVerified = true
            title = 'Contract'
          }
        } catch (err) {
          captureException(err)
        }
        break
      }
      case 'tx':
      case 'txs':
      case 'transaction':
      case 'transactions':
        title = 'Transaction'
        break
      case 'tipset':
        title = 'Tipset'
        break
      case 'block':
      case 'block-cid':
        title = 'Block'
        break
      default:
        break
    }

    // Initializing the chainName variable.
    let chainName = networkChainSlug
    // Switch case for handling different chains.
    if (networkChainSlug === 'fil') {
      chainName = 'Filecoin'
    }

    // Fetching the OG image data.
    const data = await getOgImageData(input, network, inputType.toLowerCase())

    // If there's an error in fetching the data or if chainName or networkName is missing, return the default OG image.
    if (data === 'error' || !chainName || !networkName) {
      return defaultOG
    }

    // Fetching the font data.
    const fontData = await fontSora
    const fontDMSans = await fontDmSans
    const fontB612 = await fontB612Mono

    // Returning the final OG image response.
    return new ImageResponse(
      <OgImage input={input} chain={chainName} network={network} title={title} items={data} isVerified={isVerified} />,
      {
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        fonts: [
          {
            name: 'Sora',
            data: fontData,
            style: 'normal',
          },
          {
            name: 'DM Sans',
            data: fontDMSans,
            style: 'normal',
          },
          {
            name: 'B612 Mono',
            data: fontB612,
            style: 'normal',
          },
        ],
      }
    )
  } catch (err: any) {
    // If there's an error in generating the image, return a 500 response.
    captureException(err)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}
