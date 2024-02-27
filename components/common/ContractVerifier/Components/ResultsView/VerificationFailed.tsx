/**
 * @module VerificationFailed
 */
import { useTranslation } from 'react-i18next'

import { Misuse } from '@carbon/icons-react'
import { Stack, Typography, useTheme } from '@mui/material'

/**
 * A component that displays a message when the verification of the source code fails.
 *
 * @param props - The properties that define the component's behavior and display.
 * @param props.error - The error message to display.
 *
 * @returns The VerificationFailed component
 */
export const VerificationFailed = ({ error }: { error: string | undefined }): JSX.Element => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Stack alignItems={'center'} sx={{ padding: '2rem 1.5rem' }}>
      <Misuse size={32} style={{ color: theme.palette.error.main }} />
      <Typography variant="h3" textAlign={'center'} mt={'0.5rem'}>
        {t('Source Code Not Verified')}
      </Typography>
      <Typography variant="body1" textAlign={'center'} mt={'1rem'}>
        {`${t("The contract couldn't be verified")}.${error && ` ${t('The reason is')}: ${error}`}`}
      </Typography>
    </Stack>
  )
}
