import { NetworkType } from '@/config/networks'

import BeryxLogo from '../Icons/BeryxLogo'
import Checkmark from '../Icons/Checkmark'
import OgImageItem from './OgImageItem'

/**
 * Object parameters for OgImage
 *
 * @param chain The blockchain name
 * @param network The network name
 * @param title The title for the image
 * @param isVerified Verification status
 * @param items An array of objects containing label, value and value type information
 */
export interface OgImageProps {
  chain: string
  network: NetworkType
  title: string
  isVerified: boolean
  items: { label: string; value: string | undefined; valueType: string; icon?: React.ReactElement }[]
}

/**
 * Component for open graph image
 *
 * @param props The arguments to build open graph image which includes chain, network, title, isVerified and items
 * @returns Returns a JSX.Element that represents an open graph image
 */
const OgImage = ({ chain, network, title, isVerified, items }: OgImageProps): JSX.Element => {
  /**
   * ChainNetwork component.
   * This component is responsible for rendering the chain and network information.
   */
  const ChainNetwork = () => (
    <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '8px', display: 'flex' }}>
      <span style={{ color: '#7F8599', fontSize: '28px', fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word' }}>{chain}</span>
      <span
        style={{ color: 'rgba(127, 133, 153, 0.70)', fontSize: '28px', fontFamily: 'DM Sans', fontWeight: '400', wordWrap: 'break-word' }}
      >
        •
      </span>
      <span
        style={{
          color: '#7F8599',
          fontSize: '28px',
          fontFamily: 'DM Sans',
          fontWeight: '400',
          wordWrap: 'break-word',
          textTransform: 'capitalize',
        }}
      >
        {network.name}
      </span>
    </div>
  )

  /**
   * TitleCheckmark component.
   * This component is responsible for rendering the title and checkmark.
   */
  const TitleCheckmark = () => (
    <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: '32px', display: 'flex' }}>
      <span style={{ color: '#1A1B1F', fontSize: '52px', fontFamily: 'Sora', fontWeight: '800', wordWrap: 'break-word' }}>{title}</span>
      {isVerified ? <Checkmark size={45} /> : null}
    </div>
  )

  /**
   * OgItems component.
   * This component is responsible for rendering the open graph items.
   */
  const OgItems = () => (
    <div
      style={{
        width: '100%',
        borderRadius: '14px',
        border: '2px #D8DEEC solid',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        display: 'flex',
      }}
    >
      {items
        .filter(item => item.value !== undefined)
        .map((item, index) => (
          <OgImageItem
            label={item.label}
            value={item.value ?? ''}
            isLast={index === items.length - 1}
            icon={item.icon}
            key={`OgImageItem ${item.label} ${item.value}`}
          />
        ))}
    </div>
  )

  /**
   * Footer component.
   * This component is responsible for rendering the footer.
   */
  const Footer = () => (
    <div
      style={{
        width: '100%',
        height: '60px',
        background: '#3655E5',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 56px',
        gap: '0',
        display: 'flex',
      }}
    >
      <span style={{ color: 'white', fontSize: '26px', fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>
        TEST CONTRACTS
      </span>
      <span style={{ color: 'white', fontSize: '26px', fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>EXPLORER</span>
      <span style={{ color: 'white', fontSize: '26px', fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>MEMPOOL</span>
      <span style={{ color: 'white', fontSize: '26px', fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>FAUCET</span>
      <span style={{ color: 'white', fontSize: '26px', fontFamily: 'Sora', fontWeight: '700', wordWrap: 'break-word' }}>DASHBOARDS</span>
    </div>
  )

  return (
    <div
      style={{
        width: '1200px',
        height: '630px',
        background: 'linear-gradient(75deg, #F8F8FA 0%, white 100%)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        display: 'flex',
      }}
    >
      <div
        style={{
          width: '100%',
          flex: '1 1 0',
          paddingLeft: '56px',
          paddingRight: '56px',
          paddingTop: '56px',
          paddingBottom: '20px',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          display: 'flex',
          gap: '40px',
        }}
      >
        <div style={{ width: '100%', height: '96px', justifyContent: 'space-between', alignItems: 'flex-start', display: 'flex' }}>
          <div
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              gap: '0px',
              display: 'flex',
              height: '45px',
              width: '870px',
            }}
          >
            <ChainNetwork />
            <TitleCheckmark />
          </div>
          <BeryxLogo size={64} />
        </div>
        <OgItems />
      </div>
      <Footer />
    </div>
  )
}

export default OgImage
