import { TFunction } from 'i18next'
import React from 'react'
import { array, boolean, mixed, number, object, string } from 'yup'

import { ContractVerifiedData } from '@/api-client/beryx.types'
import { muifyHtml } from '@/utils/muifyHtml'

// Form contract errors type declaration
export interface FormContractErrorsInterface {
  file?: string
  entrypoint?: string
  address?: string
  cloudflare?: string
  compiler?: string
}

// Form names enum
export enum FormNames {
  file = 'source',
  entrypoint = 'entryfile',
  compilerVersion = 'compiler',
  licenses = 'licenses',
  address = 'address',
  numberOfRuns = 'optimizer_runs',
  contractName = 'contract_name',
}

// License props type declaration
export interface LicenseProps {
  shortName: string
  longName: string
}

export const available_licenses: LicenseProps[] = [
  {
    shortName: 'None',
    longName: 'No License',
  },
  {
    shortName: 'Unlicense',
    longName: 'The Unlicense',
  },
  {
    shortName: 'MIT',
    longName: 'MIT License',
  },
  {
    shortName: 'GNU GPLv2',
    longName: 'GNU General Public License v2.0',
  },
  {
    shortName: 'GNU GPLv3',
    longName: 'GNU General Public License v3.0',
  },
  {
    shortName: 'GNU LGPLv2.1',
    longName: 'GNU Lesser General Public License v2.1',
  },
  {
    shortName: 'GNU LGPLv3',
    longName: 'GNU Lesser General Public License v3.0 ',
  },
  {
    shortName: 'BSD-2-Clause',
    longName: 'BSD 2-clause Simplified license',
  },
  {
    shortName: 'BSD-3-Clause',
    longName: 'BSD 3-clause New Or Revised license*',
  },
  {
    shortName: 'MPL-2.0',
    longName: 'Mozilla Public License 2.0',
  },
  {
    shortName: 'OSL-3.0',
    longName: 'Open Software License 3.0',
  },
  {
    shortName: 'Apache-2.0',
    longName: 'Apache 2.0',
  },
  {
    shortName: 'GNU AGPLv3',
    longName: 'GNU Affero General Public License',
  },
  {
    shortName: 'BSL 1.1',
    longName: 'Business Source License',
  },
]

// File size and formats constants
export const FILE_SIZE = 1048576
export const SUPPORTED_FORMATS = ['.zip', '.sol']

// Status response props type declaration
export interface StatusResponseProps {
  data?: ContractVerifiedData
  error?: { isError: boolean; description?: string }
}
export const validationSchema = object().shape({
  file: mixed<File>()
    .required('Please upload a file')
    .test('FILE_SIZE', 'Uploaded file is too big. Limit: 1MB', value => value && value.size <= FILE_SIZE),
  hasMetadataFile: boolean().oneOf([true, false], "You must check if you have or don't have a metadata .json file."),
  compilerVersion: string().trim().required('Please specify the compiler version'),
  address: string().required('Please specify the address'),
  licenses: array().required('Please specify the licenses'),
  checkTerms: boolean().oneOf([true], 'You must accept the terms and conditions'),
  optimize: boolean(),
  numberOfRuns: number().when('optimize', {
    is: true,
    then: value => value.min(0).required('Please specify number of runs'),
  }),
  entrypoint: string().when('file', {
    is: (file: File) => file?.type === 'application/zip',
    then: value => value.required('Please specify entrypoint'),
  }),
})

export interface StepsParams {
  label: string
  description: React.ReactNode
  options?: {
    label: React.ReactNode
    description: string
  }[]
}

// Steps getter method
export const steps = (t: TFunction<'translation', undefined>): StepsParams[] => {
  return [
    {
      label: t('Upload the source code'),
      description: (
        <>
          {muifyHtml(
            t(
              'You have to upload the source code. This can be either a single .sol file, or in case you have a more complex contract, then please compress it into a .zip format and then upload it.'
            )
          )}
        </>
      ),
    },
    {
      label: t('Upload the metadata file'),
      description: (
        <>
          {muifyHtml(
            t(
              'Select if you have a metadata .json file or not. This file can be found in Remix after you compiled a contract and it contains the metadata from the output of Solidity compilation: compiler version, license, number of optimization steps, etc. What happens if:'
            )
          )}
        </>
      ),
      options: [
        { label: t('I have the file'), description: t('Upload the .json file and you are all set.') },
        {
          label: t("I don't have the file"),
          description: t('You have to specify the entry file name, the compiler version, the license and the desired optimization.'),
        },
      ],
    },
    {
      label: t('Verify the contract'),
      description: t('If all information is set, then the button will turn blue, which means you are ready to verify your contract.'),
    },
  ]
}

// Tooltip descriptions object
export const tooltipsDescription = {
  optimize:
    'The number of runs specifies roughly how often each opcode of the deployed code will be executed across the lifetime of the contract.',
  optimizeDisabled:
    "The number of runs specifies roughly how often each opcode of the deployed code will be executed across the lifetime of the contract. This input is currently disabled and its values is taken from the metadata file. If you'd like to manually set this field, please select: No metadata file.",
  contractName: 'Name of the deployed contract',
}

// Minimal metadata object
export const minimalMetadata = {
  compiler: { version: '0.8.18+commit.87f61d96' },
  settings: {
    optimizer: { enabled: false, runs: 200 },
  },
  sources: {
    'contracts/1_Storage.sol': {
      license: 'GPL-3.0',
    },
  },
  version: 1,
}
