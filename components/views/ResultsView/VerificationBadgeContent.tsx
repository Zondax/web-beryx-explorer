/**
 * @module VerificationBadge
 */
import { useTranslation } from 'react-i18next'

import { ContractVerifiedData } from '@/api-client/beryx.types'
import { CheckmarkFilled } from '@carbon/icons-react'
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material'

import CodeBlock from '../../widgets/CodeBlock'

/**
 * VerificationContent
 * @description This component displays the verification details of a contract.
 * @param Verification details
 * @returns Rendered component
 */
export const VerificationContent = ({ verifiedData }: { verifiedData: ContractVerifiedData | undefined }) => {
  const theme = useTheme()
  const { t } = useTranslation()

  if (!verifiedData) {
    return null
  }

  /**
   * @description This is the checkmark icon.
   */
  const checkmarkIcon = <CheckmarkFilled size={32} style={{ color: theme.palette.success.main }} />

  /**
   * @description This is the source code verified text.
   */
  const sourceCodeVerifiedText = (
    <Typography variant="h3" textAlign={'center'} mt={'0.5rem'}>
      {t('Source Code Verified')}
    </Typography>
  )

  /**
   * @description This is the source code verified description.
   */
  const sourceCodeVerifiedDescription = (
    <Typography variant="body1" textAlign={'center'} mt={'1rem'}>
      {t('The source code we received for this contract is matching the bytecode.')}
    </Typography>
  )

  /**
   * @description This is the licenses grid.
   */
  const licensesGrid = verifiedData.licenses && (
    <Grid item xs={6}>
      <Stack alignItems={'center'}>
        <Typography variant="h6" textAlign={'center'}>
          {t('License')}
          {verifiedData.licenses?.length > 1 ? 's' : ''}
        </Typography>
        {verifiedData.licenses?.map(item => (
          <Typography variant="body1" textAlign={'center'} key={`contract license ${item}`}>
            {item}
          </Typography>
        ))}
      </Stack>
    </Grid>
  )

  /**
   * @description This is the solc grid.
   */
  const solcGrid = verifiedData.solc && (
    <Grid item xs={6}>
      <Stack alignItems={'center'}>
        <Typography variant="h6" textAlign={'center'}>
          {t(`Compiler${verifiedData.solc?.length > 1 ? 's' : ''}`)}
        </Typography>
        {verifiedData.solc?.map(item => (
          <Typography variant="body1" textAlign={'center'} key={`contract compiler ${item}`}>
            {item}
          </Typography>
        ))}
      </Stack>
    </Grid>
  )

  /**
   * @description This is the constructor parameters grid.
   */
  const constructorParamsGrid = verifiedData.constructorParams && (
    <Grid item xs={12}>
      <Stack alignItems={'center'}>
        <Typography variant="h6" gutterBottom textAlign={'center'}>
          {t('Constructor Parameters')}
        </Typography>
        <CodeBlock readOnly content={verifiedData.constructorParams} height={'10rem'} />
      </Stack>
    </Grid>
  )

  return (
    <Box sx={{ padding: '2rem 0' }}>
      <Stack alignItems={'center'} sx={{ padding: '0rem 1.5rem' }}>
        {checkmarkIcon}
        {sourceCodeVerifiedText}
        {sourceCodeVerifiedDescription}
        <Grid container width={'100%'} mt={'2rem'} justifyContent="center">
          {licensesGrid}
          {solcGrid}
        </Grid>
        <Grid container width={'100%'} mt={'2rem'} justifyContent="center">
          {constructorParamsGrid}
        </Grid>
      </Stack>
    </Box>
  )
}
