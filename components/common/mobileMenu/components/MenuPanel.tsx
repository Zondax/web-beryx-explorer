import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useResourcesStore } from '@/store/ui/resources'
import { useAppSettingsStore } from '@/store/ui/settings'
import { Book } from '@carbon/icons-react'
import { Button, Unstable_Grid2 as Grid2, Typography, alpha } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { PAGES, navigationItems } from '../../../Layout/components/Sidebar'
import NewFlag from '../../NewFlag'

/**
 * The properties for the MenuPanel.
 */
interface MenuPanelProps {
  /**
   * The current active tab.
   */
  activeTab?: PAGES

  /**
   * The height of the tabs.
   */
  tabsHeight?: number

  /**
   * Function to toggle the menu open or closed.
   */
  toggleMenu: () => void
}

/**
 * MenuPanel is a component for navigating between different pages.
 */
const MenuPanel = ({ activeTab, tabsHeight, toggleMenu }: MenuPanelProps) => {
  const theme = useTheme()
  const { t } = useTranslation()
  const router = useRouter()
  const { network } = useAppSettingsStore(state => ({ network: state.network }))

  const setIsResourcesOpen = useResourcesStore(s => s.setIsOpen)

  /**
   * Handles the click on the resources.
   * @function handleResourcesClick
   * @returns {void}
   */
  const handleResourcesClick = useCallback(() => {
    toggleMenu()
    setIsResourcesOpen(true)
  }, [toggleMenu, setIsResourcesOpen])

  /**
   * Handles the change of the main frame.
   * @function handleMainFrameChange
   * @param index - The index of the navigation item.
   * @returns {void}
   */
  const handleMainFrameChange = useCallback(
    (index: number) => {
      router.push(navigationItems[index].path)
    },
    [router]
  )

  /**
   * NavigationItems component.
   * This component maps over the navigationItems and returns the appropriate JSX for each item.
   */
  const NavigationItems = () =>
    navigationItems.map((item, index) => {
      if ((item.show || activeTab === item.name) && item.networkIds.includes(network.uniqueId)) {
        return (
          <Grid2 xs={12} key={item.name}>
            <Button
              size="large"
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                gap: '1rem',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '0.55rem',
                color: activeTab === item.name ? theme.palette.text.primary : theme.palette.text.secondary,
                borderRadius: theme.spacing(1),
                backgroundColor: activeTab === item.name ? theme.palette.background.level0 : '',
                '& svg path': {
                  fill: activeTab === item.name ? theme.palette.text.primary : theme.palette.text.secondary,
                },
                ':hover': {
                  backgroundColor: activeTab !== item.name ? alpha(theme.palette.background.level0, 0.4) : theme.palette.background.level0,
                },
              }}
              onClick={() => handleMainFrameChange(index)}
            >
              {item.icon}
              <Typography
                variant="body1"
                textAlign={'left'}
                color={activeTab === item.name ? 'text.primary' : 'text.secondary'}
                sx={{
                  textTransform: 'none',
                }}
              >
                {t(item.name)}
              </Typography>
              {item.new ? (
                <Typography variant="subtitle2" color={'#fff'}>
                  <NewFlag />
                </Typography>
              ) : null}
            </Button>
          </Grid2>
        )
      }
      return null
    })

  /**
   * ResourcesButton component.
   * This component displays a button for the 'Resources' section in the mobile menu.
   */
  const ResourcesButton = () => (
    <Grid2 xs={12} key={'Resources Mobile Menu Button'}>
      <Button
        size="large"
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-start',
          gap: '1rem',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '0.55rem',
          color: theme.palette.text.secondary,
          borderRadius: theme.spacing(1),
          '& svg path': {
            fill: theme.palette.text.secondary,
          },
          ':hover': {
            backgroundColor: theme.palette.background.level0,
          },
        }}
        onClick={handleResourcesClick}
      >
        <Book size={24} />
        <Typography
          variant="body1"
          color={'text.secondary'}
          sx={{
            textTransform: 'none',
          }}
        >
          {t('Resources')}
        </Typography>
      </Button>
    </Grid2>
  )

  return (
    <Grid2
      sx={{
        width: '100%',
        paddingTop: '1rem',
        display: 'flex',
        justifyContent: 'center',
        maxHeight: `calc(100% - ${tabsHeight}px)`,
        height: 'fit-content',
      }}
    >
      <Grid2
        container
        bgcolor="background.level1"
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: theme.spacing(2),
          width: '100%',
          maxWidth: '40rem',
          padding: theme.spacing(1),
          borderRadius: theme.spacing(1),
          overflowX: 'hidden',
          overflowY: 'auto',
        }}
      >
        <NavigationItems />
        <ResourcesButton />
      </Grid2>
    </Grid2>
  )
}

export default MenuPanel
