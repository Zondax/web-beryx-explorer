import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { ArrowRight } from '@carbon/icons-react'
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from '@mui/lab'
import { Box, Grid, List, Typography, useMediaQuery, useTheme } from '@mui/material'

import { recap } from './recap'

/**
 * @function RecapList
 * @description The RecapList component.
 * @returns The JSX code for the RecapList component.
 */
const RecapList = () => {
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'))
  const { t } = useTranslation()

  /**
   * Render the title of each item.
   * @param title - The title.
   * @param subtitle - The subtitle can be undefined.
   * @returns The JSX code for the Title component.
   */
  const renderItem = (title: string, description: string | undefined, link: string | undefined) => (
    <Grid container flexDirection={'column'} gap={'0.5rem'} mb={'3rem'} ml={{ xs: '2rem', md: '2rem' }} mt={'1rem'}>
      <Typography
        variant="h5"
        component={'p'}
        fontWeight={600}
        color={theme.palette.text.primary}
        sx={{
          maxWidth: '35ch',
          textAlign: 'left',
        }}
      >
        {title ? t(`${title}`) : null}
      </Typography>
      <Grid container flexDirection={'column'}>
        {description ? (
          <Typography
            variant="body2"
            component={'p'}
            color={theme.palette.text.primary}
            sx={{
              textAlign: 'left',
              lineHeight: 1.4,
              opacity: 0.8,
            }}
          >
            {t(`${description}`)}
          </Typography>
        ) : null}
        {link ? (
          <Link href={link} target={'_blank'} style={{ marginTop: '1rem' }}>
            <Box display={'flex'} alignItems={'center'} gap={'0.2rem'} color={theme.palette.main}>
              {t('Visit page')}
              <ArrowRight size={12} />
            </Box>
          </Link>
        ) : null}
      </Grid>
    </Grid>
  )

  /**
   * Render the title of each item.
   * @param title - The title.
   * @param subtitle - The subtitle can be undefined.
   * @returns The JSX code for the Title component.
   */
  const renderLevel = (level: string, title: string) => (
    <Typography
      variant={'subtitle1'}
      component={'span'}
      fontWeight={500}
      sx={{
        flex: 'auto',
        marginBottom: { xs: '3rem' },
      }}
    >
      {t(level)}: {t(title)}
    </Typography>
  )

  return (
    <Grid container>
      {upMd ? (
        <Timeline
          sx={{
            width: '100%',
            mr: { md: '3rem' },
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
        >
          {recap.map((quarter, index) => (
            <TimelineItem key={`recap quarter ${quarter.level}`}>
              <TimelineSeparator>
                <TimelineDot sx={{ backgroundColor: theme.palette.tableChildRowBackgroundFocused, boxShadow: 'none' }} />
                {index !== recap.length - 1 && <TimelineConnector sx={{ bgcolor: theme.palette.tableChildRowBackgroundFocused }} />}
              </TimelineSeparator>
              <TimelineContent>
                {renderLevel(quarter.level, quarter.title)}
                {quarter.elements.map(({ title, description, link }) => renderItem(title, description, link))}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      ) : (
        <List sx={{ width: '100%' }} component="nav" aria-labelledby="nested-list-subheader">
          {recap.map(({ title, level, elements }) => {
            return (
              <Grid container key={`recap quarter ${level}`}>
                {renderLevel(level, title)}
                {elements.map(({ title, description, link }) => renderItem(title, description, link))}
              </Grid>
            )
          })}
        </List>
      )}
    </Grid>
  )
}
export default RecapList
