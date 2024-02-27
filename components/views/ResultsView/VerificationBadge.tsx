import { ContractVerifiedData } from '@/api-client/beryx.types'
import { Box, Stack, Tooltip, TooltipProps, Typography, styled, tooltipClasses, useTheme } from '@mui/material'

import ConnectionStatus from './ContractView/ConnectionStatus'
import { VerificationContent } from './VerificationBadgeContent'

/**
 * @function VerificationBadge
 * @description This component displays a badge indicating if a contract is verified.
 * @param isVerified - Indicates if the contract is verified
 * @param verification - Verification details of the contract
 * @returns Rendered component or null if the contract is not verified
 */
const VerificationBadge = ({ verification }: { verification: ContractVerifiedData | undefined }) => {
  const theme = useTheme()

  if (!verification) {
    return null
  }

  /**
   * @function CustomWidthTooltip
   * @description This is a styled component that extends the Tooltip component from MUI with a custom width.
   */
  const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => <Tooltip {...props} classes={{ popper: className }} />)({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: '30rem',
    },
  })

  return (
    <CustomWidthTooltip
      placement={'bottom-end'}
      title={
        <Stack padding={'0 1.5rem'}>
          <VerificationContent verifiedData={verification} />
        </Stack>
      }
    >
      <Box
        bgcolor="background.level2"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          padding: '0.1rem 0.5rem',
          borderRadius: '0.3rem',
          color: theme.palette.text.secondary,
          cursor: 'pointer',
          transition: '0.2s ease-in-out',
          ':hover': {
            background: theme.palette.background.level0,
          },
        }}
      >
        <ConnectionStatus status={'fulfilled'} />
        <Typography variant="caption" fontSize={'0.85rem'} fontWeight={500} sx={{ color: theme.palette.success.main }}>
          Verified
        </Typography>
      </Box>
    </CustomWidthTooltip>
  )
}

export default VerificationBadge
