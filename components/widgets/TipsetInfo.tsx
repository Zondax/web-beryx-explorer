import Image from 'next/image'

import { newDateFormat } from '@/utils/dates'
import { Card, CardContent, Grid, Typography } from '@mui/material'

import ItemCard from '../common/ItemCard'
import HeaderInfo from './HeaderInfo'

/**
 * Props for TipsetInfo component.
 */
interface TipsetResultProps {
  /** Time of the current tipset result */
  timestamp?: string
  /** Current tipset number */
  tipset?: number
}

/**
 * Component to display information about the current tipset result.
 *
 * @component
 * @param props - TipsetResultProps
 * @returns {JSX.Element}
 */
const TipsetInfo = ({ timestamp, tipset }: TipsetResultProps) => {
  return (
    <Grid container direction="column">
      <HeaderInfo datetimeInfo={`Created on: ${timestamp ? newDateFormat(timestamp, 'UTC', true) : '-'}`} />
      <Card sx={{ width: '100%' }}>
        <CardContent
          sx={{
            padding: '0px 16px !important',
            display: 'flex',
          }}
        >
          <Grid display="flex" alignItems="center" paddingTop={1}>
            <Image
              src="/images/cube-dark.svg"
              alt="tipset cube"
              width={71}
              height={73}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </Grid>
          <ItemCard title="Tipset" description={tipset?.toString()}>
            <Typography variant="h3" sx={{ fontWeight: '400', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.34)' }}>
              {tipset ?? '-'}
            </Typography>
          </ItemCard>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TipsetInfo
