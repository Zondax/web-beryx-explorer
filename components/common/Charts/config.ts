import { DecimalUnits, FilUnits } from '@/utils/numbers'

export interface DataChartProps {
  values: { value: number }[]
  name?: string
  unit?: FilUnits | DecimalUnits
}
