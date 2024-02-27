/**
 * getMethod function
 *
 * @param methodType - string. Type of the method ('pure', 'view' or 'all')
 *
 * @returns 'read' if methodType is 'pure' or 'view', 'write' if another type, and undefined if 'all'
 */
export const getMethod = ({ methodType }: { methodType: string }) => {
  switch (methodType) {
    case 'pure':
    case 'view':
      return 'read'
    case 'all':
      return

    default:
      return 'write'
  }
}
