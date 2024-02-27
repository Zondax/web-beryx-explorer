import { number, object, string } from 'yup'

import { FilUnits } from '@/utils/numbers'
import { Token } from '@zondax/izari-filecoin/token'

import { DecodedABI, InternalInputProps } from '../config'

export const availableUnits: { [key in FilUnits]: (value: string) => Token } = {
  FIL: Token.fromWhole,
  miliFIL: Token.fromMilli,
  microFIL: Token.fromMicro,
  nanoFIL: Token.fromNano,
  picoFIL: Token.fromPico,
  femtoFIL: Token.fromFemto,
  attoFIL: Token.fromAtto,
}

export interface RunMethodFormValues {
  method?: DecodedABI
  type?: string
  amount?: number
  unitAmount?: FilUnits
  requestBody?: InternalInputProps[] // it's saved from Table Input
  requestBodyString?: string // it's saved from Text Input
}

export const validationSchema = object().shape({
  method: object().required(''),
  type: string().required(''),
  amount: number().when('type', {
    is: 'payable',
    then: value => value.required(''),
  }),
  unitAmount: string().when('type', {
    is: 'payable',
    then: value => value.required(''),
  }),
})

export const defaultUnit = 'attoFIL' as FilUnits
