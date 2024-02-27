import { useTranslation } from 'react-i18next'

import { ConsentAvailableCategories } from '@/config/config'
import { NoSsr } from '@mui/base'
import { CookieConsentBanner } from '@porscheofficial/cookie-consent-banner-react'

import { ConsentContentPopup } from './ConsentBlock'

// FIXME: Move to MUI Drawer + zustand
// https://mui.com/material-ui/react-drawer/#temporary-drawer

// https://blog.bitsrc.io/using-non-ssr-friendly-components-with-next-js-916f38e8992c
// TODO: Make ConsentContentPopup parametrizable?
export function ConsentManager() {
  const { t } = useTranslation()
  return (
    <NoSsr>
      <CookieConsentBanner
        btnLabelAcceptAndContinue={t('Agree') ?? ''}
        btnLabelSelectAllAndContinue={t('Accept All') ?? ''}
        btnLabelOnlyEssentialAndContinue={t('Minimum') ?? ''}
        btnLabelPersistSelectionAndContinue={t('Save selection') ?? ''}
        contentSettingsDescription={
          t('Please select the respective options below. Note that your selection MAY impair some functionality.') ?? ''
        }
        availableCategories={ConsentAvailableCategories(t)}
      >
        <ConsentContentPopup />
      </CookieConsentBanner>
    </NoSsr>
  )
}
