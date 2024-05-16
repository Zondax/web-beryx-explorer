/**
 * Interface for LinkCardProps
 */
export interface LinkCardProps {
  title: string
  description: string
  url: string
  imageUrl: string
  domain: string
  category: LinkCardCategory
  priority?: boolean
}

export enum LinkCardCategory {
  ECOSYSTEM = 'Ecosystem',
  DEVELOPERS = 'Developers',
  SOCIAL_EVENTS = 'Social & Events',
}
