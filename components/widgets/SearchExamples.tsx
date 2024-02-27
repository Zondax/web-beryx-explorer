import Link from 'next/link'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { getNetworkExamples } from '@/config/data'
import { useAppSettingsStore } from '@/store/ui/settings'
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
    <Typography variant="body1" color={theme.palette.text.primary} mt={'0.5rem'} sx={{ opacity: 0.8 }}>
      {t('Search examples')}
    </Typography>
  )

  const ExampleButtons = examplesData.map(({ name, data, type }) => (
    <Link href={`/v1/search/${network.slug}/${type}/${data}`} key={`${name}-${data}`}>
      <Button
        size="small"
        variant={'inputType'}
        sx={{
          minWidth: 'unset',
          height: 'unset',
          padding: '0.4rem 0.75rem',
          backgroundColor: theme.palette.background.level1,
          border: `1px solid ${theme.palette.tableChildRowBackgroundFocused}`,
        }}
      >
        {t(name)}
      </Button>
    </Link>
  ))

  return (
    <Grid
      container
      gap={'0.5rem'}
      alignItems={'flex-start'}
      mt={{ xs: '1rem', md: '0.5rem' }}
      sx={{ width: { xs: '100%', md: properties?.width ?? '44rem' } }}
      justifyContent={'flex-start'}
      pl={{ xs: '1rem', md: '0' }}
      width={'100%'}
      maxWidth={'40rem'}
    >
      {ExamplesTitle}
      <Grid container item gap={'0.5rem'} alignItems={'center'} justifyContent={'center'} mt={'0.5rem'} width={'fit-content'}>
        {ExampleButtons}
      </Grid>
    </Grid>
  )
}

export default SearchExamples
