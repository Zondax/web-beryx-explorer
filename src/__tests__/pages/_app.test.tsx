import i18n from 'i18next'
import { I18nextProvider } from 'react-i18next'

import { renderWithProviders } from '@/helpers/jest-react'

import App from '../../../pages/_app'

// Assuming you have an i18n config file

jest.mock('ni18n', () => ({
  appWithI18Next: (Component: any) => (props: any) => <Component {...props} Component={() => <div />} pageProps={{}} />,
  useSyncLanguage: jest.fn(),
}))

jest.mock('@mui/x-license-pro', () => ({
  LicenseInfo: {
    setLicenseKey: jest.fn(),
  },
}))

describe('_app Page', () => {
  it('renders without crashing', async () => {
    await renderWithProviders(
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    )
  })
})
