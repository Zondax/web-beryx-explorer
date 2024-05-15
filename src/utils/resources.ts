import { LinkCardProps } from 'components/common/LinkCard'

/**
 * Custom comparison function to sort an array of LinkCardProps based on the 'new' property.
 * @param a - The first LinkCardProps object to compare.
 * @param b - The second LinkCardProps object to compare.
 * @returns A number indicating the sort order:
 *          - If a.new is true and b.new is false, a should come before b (-1).
 *          - If a.new is false and b.new is true, b should come before a (1).
 *          - Otherwise, maintain the original order (0).
 */
export function compareByPriority(a: LinkCardProps, b: LinkCardProps): number {
  // If a.new is true and b.new is false, place a before b
  if (a.priority && !b.priority) {
    return -1
  }
  // If a.new is false and b.new is true, place b before a
  if (!a.priority && b.priority) {
    return 1
  }
  // Otherwise, maintain the original order
  return 0
}
