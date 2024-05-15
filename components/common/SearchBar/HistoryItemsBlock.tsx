import Link from 'next/link'
import { useTranslation } from 'react-i18next'

import { projectIcons } from '@/config/networks'
import { HistoryItem } from '@/store/ui/history'
import { truncateMiddleOfString } from '@/utils/text'
import { Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Box } from '@mui/system'

/**
 * @function HistoryItemBlock
 * @description This component is used to display a single item from the user's search history.
 * @param item - The history item to be displayed.
 * @param isDesktop - Boolean indicating if the current device is a desktop.
 * @param selected - Boolean indicating if the current history item is selected.
 */
const HistoryItemBlock = ({ item, isDesktop, selected = false }: { item: HistoryItem; isDesktop: boolean; selected?: boolean }) => {
  const href = `/search/${item.network.slug}/${item.type}/${item.value}`
  const icon = projectIcons[item.network.project] ? projectIcons[item.network.project]({ size: 16 }) : null
  const itemDetails = isDesktop ? `${item.network.name} • ${item.type}` : `${item.network.name}`
  const theme = useTheme()

  const key = `history item: ${item.value} ${item.network.uniqueId} on ${item.date}`

  /**
   * @function ButtonContent
   * @description This component is used to display the content of the button in the HistoryItemBlock. It includes the icon and the truncated value of the item.
   */
  const ButtonContent = () => {
    const truncatedValue = truncateMiddleOfString(item.value, 16)

    return (
      <Grid container item gap={1} alignItems={'center'} width={'fit-content'} flexWrap={'nowrap'}>
        <Box sx={{ display: 'flex', flexShrink: 0, alignItems: 'center' }}>{icon}</Box>
        <Typography variant="captionMono" component={'p'}>
          {truncatedValue}
        </Typography>
      </Grid>
    )
  }

  /**
   * @function ItemDetails
   * @description This component is used to display the details of the item in the HistoryItemBlock. It includes the network name and the type of the item.
   */
  const ItemDetails = () => (
    <Grid container item gap={1} width={'fit-content'} alignItems={'center'}>
      <Typography variant="caption" color={'text.secondary'} sx={{ textTransform: 'capitalize' }}>
        {itemDetails}
      </Typography>
    </Grid>
  )

  return (
    <Box key={key}>
      <Link href={href}>
        <Button
          variant={'text'}
          size={'large'}
          LinkComponent={'a'}
          fullWidth
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.25rem 1.2rem 0.25rem 1rem',
            borderRadius: '4px',
            backgroundColor: selected ? theme.palette.background.level2 : null,
          }}
          key={key}
        >
          <ButtonContent />
          <ItemDetails />
        </Button>
      </Link>
    </Box>
  )
}

/**
 * @function HistoryItemsBlock
 * @description This component is used to display a block of history items in the search bar. It includes the title of the block, the maximum number of items to display, the value that was searched, and the index of the selected element.
 * @param historyItems - Array of history items
 * @param title - Title of the block
 * @param maxItemCount - Maximum number of items to display
 * @param selectedElementIndex - Index of the selected element
 */
const HistoryItemsBlock = ({
  historyItems,
  title,
  maxItemCount,
  selectedElementIndex,
}: {
  historyItems: HistoryItem[]
  title: string
  maxItemCount: number
  selectedElementIndex: number
}) => {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'))
  const { t } = useTranslation()

  return (
    <>
      <Typography variant="caption" component={'p'} color={'text.secondary'} mb={'0.5rem'} ml={'1rem'}>
        {t(title)}
      </Typography>
      {historyItems.slice(0, maxItemCount).map((item: HistoryItem, index: number) => (
        <HistoryItemBlock
          key={`history item ${item.value} on ${item.date}`}
          item={item}
          isDesktop={isDesktop}
          selected={selectedElementIndex === index}
        />
      ))}
    </>
  )
}

export default HistoryItemsBlock
