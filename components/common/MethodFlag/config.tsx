export type MethodFlags = 'read' | 'write' | 'payable'

// Type declaration for style properties
interface FlagsStyleProps {
  color: string
  backgroundColor: string
  label: string
}

// Object that includes the style properties based on method flags
export const flagsStyle: { [key in MethodFlags]: FlagsStyleProps } = {
  read: {
    color: '#40BA5B',
    backgroundColor: 'rgba(72,198,115,0.16)',
    label: 'READ',
  },
  write: { color: '#FF3062', backgroundColor: 'rgba(241, 80, 119, 0.14)', label: 'WRITE' },
  payable: {
    color: '#306AFF',
    backgroundColor: 'rgba(80, 145, 241, 0.14)',
    label: 'PAY',
  },
}
