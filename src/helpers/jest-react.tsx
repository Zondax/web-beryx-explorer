import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime'
import { NextRouter } from 'next/router'
import { ReactNode } from 'react'
import { ParallaxProvider } from 'react-scroll-parallax'

import { getThemeOptions } from '@/theme/theme'
import { ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act, render } from '@testing-library/react'

/**
 * A wrapper component that provides a QueryClientProvider for its children.
 *
 * @param children - The children components to be wrapped.
 * @returns The wrapped children components.
 */
export const queryWrapper = ({ children }: { children?: ReactNode }) => {
  const queryClient = new QueryClient()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

/**
 * Renders the provided children components with necessary providers.
 *
 * @param children - The children components to be rendered.
 * @returns The rendered children components.
 */
export const renderWithProviders = (children: ReactNode) => {
  // Create material-ui theme with 'light' options
  const theme = createTheme(getThemeOptions('light'))
  const queryClient = new QueryClient()
  const mockRouter: Partial<NextRouter> = {}

  return act(() => {
    return render(
      <RouterContext.Provider value={mockRouter as NextRouter}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <ParallaxProvider>{children}</ParallaxProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </RouterContext.Provider>
    )
  })
}
