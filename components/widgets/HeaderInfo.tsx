import Image from 'next/image'

import { useSearchStore } from '@/store/data/search'
import { Box, Typography } from '@mui/material'

/**
 * HeaderInfo is a functional component that renders the header information.
 * It uses the Material UI Box and Typography for styling.
 *
 * @param props - The properties passed to the component.
 * @param props.datetimeInfo - The datetime information to be displayed.
 *
 * @returns The rendered JSX element.
 */
const HeaderInfo = ({ datetimeInfo }: { datetimeInfo: string }): JSX.Element => {
  const searchNetwork = useSearchStore(s => s.searchInputNetwork)
  const formattedSearchNetwork = searchNetwork ? searchNetwork.name.charAt(0).toUpperCase() + searchNetwork.name.slice(1) : '-'

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: { xs: 'flex-end', md: 'flex-start' },
        }}
      >
        <Image
          src="/logos/filecoin.svg"
          alt="filecoin logo"
          width={14}
          height={14}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '400', textShadow: '0px 4px 20px rgba(0, 0, 0, 0.34)' }}>
          {formattedSearchNetwork}
        </Typography>
      </Box>
      <Typography variant="subtitle2" padding="0px 10px" sx={{ textAlign: 'end' }}>
        {datetimeInfo}
      </Typography>
    </Box>
  )
}

export default HeaderInfo
