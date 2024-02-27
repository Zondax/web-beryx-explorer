/**
 * Interface for OgImageItemProps
 * @interface
 * @property label - The label of the item
 * @property value - The value of the item
 * @property isLast - Flag to check if the item is the last one - optional
 * @property icon - The icon of the chain
 */

interface OgImageItemProps {
  label: string
  value: string
  isLast?: boolean
  icon?: React.ReactElement
}

/**
 * OgImageItem functional component
 * @param label - The label of the item
 * @param value - The value of the item
 * @param isLast - Flag to check if the item is the last one - optional
 * @param valueType - The type of the value
 * @returns JSX Element
 */
const OgImageItem = ({ label, value, isLast = false, icon }: OgImageItemProps): JSX.Element => {
  const itemStyle = {
    alignSelf: 'stretch',
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingTop: '24px',
    paddingBottom: '24px',
    borderBottom: isLast ? 'none' : '2px #D8DEEC solid',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '32px',
    display: 'flex',
  }

  return (
    <div style={itemStyle}>
      <span
        style={{
          width: '280px',
          color: '#7F8599',
          fontSize: '28px',
          fontFamily: 'DM Sans',
          fontWeight: '400',
          wordWrap: 'break-word',
        }}
      >
        {label}
      </span>
      <div
        style={{
          borderRadius: '12px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '14px',
          display: 'flex',
        }}
      >
        {icon ?? null}
        <span
          style={{
            color: '#1A1B1F',
            fontSize: '28px',
            fontFamily: '"B612 Mono"',
            fontWeight: '400',
            wordWrap: 'break-word',
            marginTop: '4px',
          }}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

export default OgImageItem
