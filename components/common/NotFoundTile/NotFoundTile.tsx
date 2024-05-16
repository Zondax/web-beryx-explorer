import { useTranslation } from 'react-i18next'

import { NetworkType } from '@/config/networks'
import { ObjectType } from '@/routes/parsing'
import { ArrowRight, CheckmarkFilled } from '@carbon/icons-react'
import { Renew, Rocket } from '@carbon/pictograms-react'
import { Box, Grid, Typography, useTheme } from '@mui/material'

import ItemIdentifierLabel from '../ItemIdentifierLabel'

export type notFoundIcons = 'rocket' | 'refresh'

/**
 * Detailed object to set NotFoundTile information generically
 */
export interface GenericParams {
  title: string
  description: string
  icon?: notFoundIcons
}

/**
 * Detailed object to set NotFoundTile information with an specific transaction
 */
interface TransactionParams {
  network: NetworkType
  type: ObjectType
  formatedType?: string
  value: string
}

/**
 * Parameters for NotFoundTile
 */
interface NotFoundTileParams {
  transaction?: TransactionParams
  data?: GenericParams
  action: () => void
}

/**
 * NotFoundTile is a clickable tile that shows either an specific message with corresponding
 * icon or an specific transaction information. This component is used to fill space in the layout,
 * it's usually used when a user request can't be fulfilled and it shows potential actions.
 * @param props - Component properties
 */
const NotFoundTile = ({ data, transaction, action }: NotFoundTileParams) => {
  const theme = useTheme()
  const { t } = useTranslation()

  /**
   * Depending on available data, return the requested icon.
   */
  const renderIcon = () => {
    switch (data?.icon) {
      case 'rocket':
        return (
          <Box position={'absolute'} right={65} top={8} zIndex={1}>
            <Rocket width={80} height={80} color={theme.palette.border?.level0} data-testid={'rocket-icon'} />
          </Box>
        )
      case 'refresh':
        return (
          <Box position={'absolute'} right={45} top={-5} zIndex={1}>
            <Renew width={90} height={90} color={theme.palette.border?.level0} data-testid={'refresh-icon'} />
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box
      sx={{
        cursor: 'pointer',
        position: 'relative',
        width: { xs: '100%', md: '35rem' },
        minHeight: '98px',
        minWidth: '20rem',
        contain: 'paint',
        display: 'flex',
        border: `solid 1px ${theme.palette.border?.level0}`,
        borderRadius: '12px',
        '& :hover': {
          backgroundColor: theme.palette.background.level2,
          transition: 'background-color 0.1s ease-in-out',
        },
      }}
      onClick={action}
    >
      <Grid
        container
        sx={{
          background:
            transaction && `linear-gradient(270deg, ${theme.palette.background.level2} 0%, ${theme.palette.background.level0} 25%)`,
          padding: { xs: '1rem', md: '1.25rem' },

          '& :hover': {
            background: 'none',
          },
        }}
      >
        {/* The body of a generic tile */}
        {data ? (
          <>
            {renderIcon()}
            <Grid container flexDirection={'column'} gap={'0.5rem'} width={'85%'} zIndex={2}>
              {/* Information */}
              <Typography variant="h5" component={'h1'}>
                {t(data.title)}
              </Typography>
              <Typography variant="subtitle1" component={'p'}>
                {t(data.description)}
              </Typography>
            </Grid>
            {/* Left arrow */}
            <Grid container width={'15%'} alignItems={'flex-end'} justifyContent={'flex-end'} zIndex={20}>
              <ArrowRight size={24} />
            </Grid>
          </>
        ) : null}
        {/* The body of the tile when the information is a transaction */}
        {transaction ? (
          <Grid container gap={'0.5rem'} justifyContent={'space-between'}>
            <Box display={'flex'} gap={'1rem'} alignItems={'center'} justifyContent={'center'}>
              <CheckmarkFilled width={32} height={32} style={{ color: theme.palette.success.main }} data-testid={'ok-icon'} />
              <Box display={'flex'} flexDirection={'column'}>
                {/* Network */}
                <Typography variant={'subtitle1'} sx={{ maxWidth: '75ch', lineHeight: 2 }}>
                  Filecoin • {transaction.network.name}
                </Typography>
                {/* Type and value */}
                <Box display={'flex'} flexDirection={{ xs: 'column', md: 'row' }} gap={'0.5rem'} alignItems={{ md: 'center' }}>
                  {transaction.formatedType ? (
                    <Typography variant="h5" component={'h1'} textTransform={'capitalize'} data-testid={'not-found-tile-transaction-type'}>
                      {t(transaction.formatedType)}
                    </Typography>
                  ) : null}

                  <ItemIdentifierLabel
                    value={transaction.value}
                    searchType={transaction.type}
                    network={transaction.network}
                    limitCharacters
                  />
                </Box>
              </Box>
            </Box>
            {/* Left arrow */}
            <Box display={'flex'} alignItems={'flex-end'} justifyContent={'flex-end'}>
              <ArrowRight size={24} />
            </Box>
          </Grid>
        ) : null}
      </Grid>
    </Box>
  )
}

export default NotFoundTile
