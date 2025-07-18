'use client'

// React Imports
import { useMemo } from 'react'

// MUI Imports
import { deepmerge } from '@mui/utils'
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
  lighten,
  darken
} from '@mui/material/styles'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import CssBaseline from '@mui/material/CssBaseline'

// Component Imports
import ModeChanger from './ModeChanger'

// Config Imports
import themeConfig from '../../configs/themeConfig'
import primaryColorConfig from '../../configs/primaryColorConfig'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'

// Core Theme Imports
import defaultCoreTheme from '@core/theme'

const ThemeProvider = props => {
  // Props
  const { children, direction } = props

  // Hooks
  const { settings } = useSettings()

  // Merge the primary color scheme override with the core theme
  const theme = useMemo(() => {
    const newColorScheme = {
      colorSchemes: {
        light: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main, 0.2),
              dark: darken(primaryColorConfig[0].main, 0.1)
            }
          }
        },
        dark: {
          palette: {
            primary: {
              main: primaryColorConfig[0].main,
              light: lighten(primaryColorConfig[0].main, 0.2),
              dark: darken(primaryColorConfig[0].main, 0.1)
            }
          }
        }
      }
    }

    const coreTheme = deepmerge(defaultCoreTheme(settings.mode || 'light', direction), newColorScheme)

    return extendTheme(coreTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.mode])

  return (
    <AppRouterCacheProvider options={{ prepend: true }}>
      <CssVarsProvider
        theme={theme}
        defaultMode={settings.mode}
        modeStorageKey={`${themeConfig.templateName.toLowerCase().split(' ').join('-')}-mui-template-mode`}
      >
        <>
          <ModeChanger />
          <CssBaseline />
          {children}
        </>
      </CssVarsProvider>
    </AppRouterCacheProvider>
  )
}

export default ThemeProvider
