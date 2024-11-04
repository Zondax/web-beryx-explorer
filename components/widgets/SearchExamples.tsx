import Link from 'next/link'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getNetworkExamples } from '@/config/data'
import useAppSettingsStore from '@/store/ui/settings'
import { Button, Grid, Typography, useTheme } from '@mui/material'

/**
 * @interface SearchExamplesProps
 * @description defines the properties for the SearchExamplesProps component
 * @property {object} properties
 */
interface SearchExamplesProps {
  properties?: { width?: string }
}

/**
 * SearchExamples is a React component that displays a list of example searches to the
 * user. These examples allow users to quickly navigate to commonly used search results.
 *
 * @see QuickExamplesData
 */
const SearchExamples = ({ properties }: SearchExamplesProps) => {
  const { t } = useTranslation()
  const theme = useTheme()

  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const examplesData = useMemo(() => getNetworkExamples(network), [network])

  const ExamplesTitle = (
    <Typography variant="body1" color={theme.palette.common.black} mt={'0.5rem'} sx={{ opacity: 0.8 }}>
      {t('Search examples')}
    </Typography>
  )

  const ExampleButtons = examplesData.map(({ name, data, type }) => (
    <Link href={`/${network.slug}/${type}/${data}`} key={`${name}-${data}`} passHref>
      <Button
        size="small"
        variant={'outlined'}
        sx={{
          minWidth: { xs: 'fit-content', md: 'unset' }, // Set minimum width for small devices and up
          maxWidth: { xs: '20rem', md: 'unset' }, // Set maximum width for small devices and up
          height: 'auto',
          padding: '0.4rem 0.5rem',
          backgroundColor: '#0090FF',
          border: '1px solid #0090FF',
          color: theme.palette.common.white,
          whiteSpace: 'normal', // Allow text wrapping
          textAlign: 'center', // Center the text
          overflow: 'hidden', // Prevent overflow
          textOverflow: 'ellipsis', // Add ellipsis to overflowed text
        }}
      >
        {t(name)}
      </Button>
    </Link>
  ))

  return (
    <Grid
      container
      gap={'0.25rem'}
      alignItems={'flex-start'}
      mt={{ xs: '1rem', md: '0.5rem' }}
      sx={{ width: { xs: '100%', md: properties?.width ?? '44rem' } }}
      justifyContent={'flex-start'}
      width={'100%'}
      maxWidth={'40rem'}
    >
      {ExamplesTitle}
      <Grid container item gap={'0.5rem'} alignItems={'center'} justifyContent={'flex-start'} mt={'0.25rem'} width={'100%'}>
        {ExampleButtons}
      </Grid>
    </Grid>
  )
}

export default SearchExamples
