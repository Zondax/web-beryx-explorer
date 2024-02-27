import { useAppSettingsStore } from '@/store/ui/settings'

/**
 * Function to get the path of the theme file
 * @param file - The name of the file
 * @returns The path of the theme file
 */
export function themePath(file: string) {
  const theme = useAppSettingsStore.getState().theme
  return `/images/theme_${theme}/${file}`
}
