/**
 * Imports necessary dependencies.
 */
import { useTranslation } from 'react-i18next'

import { ExpandMore } from '@mui/icons-material'
import { MenuItem, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'

/**
 * Transaction Type Selector.
 */
const MethodSelector = ({
  transactionTypes,
  selectedType,
  setSelectedType,
}: {
  transactionTypes: string[]
  selectedType: string
  setSelectedType: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const { t } = useTranslation()
  const upMd = useMediaQuery(useTheme().breakpoints.up('md'))

  /**
   * Returns the switch component.
   */
  return (
    <TextField
      id="language-selector"
      select
      SelectProps={{
        IconComponent: ExpandMore,
        MenuProps: { disableScrollLock: true, PaperProps: { sx: { maxHeight: 400 } } },
      }}
      size={upMd ? 'medium' : 'large'}
      color="level1"
      name="language"
      value={selectedType}
      onChange={setSelectedType}
      placeholder="Select"
      fullWidth={!upMd}
      sx={{
        minWidth: '12rem',
      }}
    >
      <MenuItem key={'tx_type - all'} value={'all'} id={'tx_typeItem - all'}>
        <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {t('All Methods')}
        </Typography>
      </MenuItem>
      {transactionTypes.includes(selectedType) || selectedType === 'all' || selectedType === 'Others' ? null : (
        <MenuItem key={`tx_type - ${selectedType}`} value={selectedType} id={`tx_typeItem - ${selectedType}`}>
          <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {selectedType}
          </Typography>
        </MenuItem>
      )}
      {transactionTypes.map((item: string) => (
        <MenuItem key={`tx_type - ${item}`} value={item} id={`tx_typeItem - ${item}`}>
          <Typography variant={'body2'} color="text.primary" sx={{ textTransform: 'capitalize' }}>
            {item}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  )
}

export default MethodSelector
