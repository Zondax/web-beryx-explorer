import { renderWithProviders } from '@/helpers/jest-react'
import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'

import BeryxLogo from './BeryxLogo'
import BeryxSignet from './BeryxSignet'
import Checkmark from './Checkmark'
import EthereumIcon from './Ethereum'
import FIL2ETH from './FIL2ETH'
import FilecoinIcon from './Filecoin'
import Filecoin2Icon from './Filecoin2'
import Filecoin3Icon from './Filecoin3'
import FolderIcon from './FolderIcon'
import FolderOpenIcon from './FolderOpenIcon'
import FourZeroFourIcon from './FourZeroFourIcon'
import FromToIcon from './FromToIcon'
import GenesisTextIcon from './GenesisTextIcon'
import IndentIcon from './IndentIcon'
import Metamask from './Metamask'
import NetworkParametersTextIcon from './NetworkParametersTextIcon'
import { FirstPositionIcon, SecondPositionIcon, ThirdPositionIcon } from './Rank'
import VerifyContractIcon from './VerifyContractIcon'

/**
 * Test suite for BeryxLogo component
 */
describe('BeryxLogo', () => {
  /**
   * Test if the BeryxLogo component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<BeryxLogo size={50} />)

    const svgElement = screen.getByTestId('beryx-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for BeryxSignet component
 */
describe('BeryxSignet', () => {
  /**
   * Test if the BeryxSignet component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<BeryxSignet size={50} />)

    const svgElement = screen.getByTestId('beryx-signet-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for Checkmark component
 */
describe('Checkmark', () => {
  /**
   * Test if the Checkmark component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<Checkmark size={50} />)

    const svgElement = screen.getByTestId('checkmark-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for EthereumIcon component
 */
describe('EthereumIcon', () => {
  /**
   * Test if the EthereumIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<EthereumIcon size={50} />)

    const svgElement = screen.getByTestId('ethereum-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FIL2ETH component
 */
describe('FIL2ETH', () => {
  /**
   * Test if the FIL2ETH component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FIL2ETH size={50} />)

    const svgElement = screen.getByTestId('fil2eth-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FilecoinIcon component
 */
describe('FilecoinIcon', () => {
  /**
   * Test if the FilecoinIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FilecoinIcon size={50} />)

    const svgElement = screen.getByTestId('filecoin-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for Filecoin2Icon component
 */
describe('Filecoin2Icon', () => {
  /**
   * Test if the Filecoin2Icon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<Filecoin2Icon size={50} />)

    const svgElement = screen.getByTestId('filecoin2-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for Filecoin3Icon component
 */
describe('Filecoin3Icon', () => {
  /**
   * Test if the Filecoin3Icon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<Filecoin3Icon size={50} />)

    const svgElement = screen.getByTestId('filecoin3-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FolderIcon component
 */
describe('FolderIcon', () => {
  /**
   * Test if the FolderIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FolderIcon size={50} />)

    const svgElement = screen.getByTestId('folder-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FolderOpenIcon component
 */
describe('FolderOpenIcon', () => {
  /**
   * Test if the FolderOpenIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FolderOpenIcon size={50} />)

    const svgElement = screen.getByTestId('folder-open-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FourZeroFourIcon component
 */
describe('FourZeroFourIcon', () => {
  /**
   * Test if the FourZeroFourIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FourZeroFourIcon size={50} />)

    const svgElement = screen.getByTestId('fourzerofour-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FromToIcon component
 */
describe('FromToIcon', () => {
  /**
   * Test if the FromToIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<FromToIcon size={50} />)

    const svgElement = screen.getByTestId('fromto-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FolderIcon component
 */
describe('FolderIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<FolderIcon size={50} />)

    const svgElement = screen.getByTestId('folder-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for FolderIcon component
 */
describe('FolderOpenIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<FolderOpenIcon size={50} />)

    const svgElement = screen.getByTestId('folder-open-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for GenesisTextIcon component
 */
describe('GenesisTextIcon', () => {
  /**
   * Test if the GenesisTextIcon component is rendered correctly
   */
  it('renders without crashing', () => {
    renderWithProviders(<GenesisTextIcon size={50} />)

    const svgElement = screen.getByTestId('genesis-text-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for IndentIcon component
 */
describe('IndentIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<IndentIcon size={50} />)

    const svgElement = screen.getByTestId('indent-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for Metamask component
 */
describe('Metamask', () => {
  it('renders without crashing', () => {
    renderWithProviders(<Metamask size={50} />)

    const svgElement = screen.getByTestId('metamask-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for Metamask component
 */
describe('NetworkParametersTextIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<NetworkParametersTextIcon size={50} />)

    const svgElement = screen.getByTestId('network-params-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for VerifyContractIcon component
 */
describe('FirstPosition', () => {
  it('renders without crashing', () => {
    renderWithProviders(<FirstPositionIcon size={50} />)

    const svgElement = screen.getByTestId('first-position-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for VerifyContractIcon component
 */
describe('SecondPositionIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<SecondPositionIcon size={50} />)

    const svgElement = screen.getByTestId('second-position-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for VerifyContractIcon component
 */
describe('ThirdPositionIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<ThirdPositionIcon size={50} />)

    const svgElement = screen.getByTestId('third-position-icon')
    expect(svgElement).toBeInTheDocument()
  })
})

/**
 * Test suite for VerifyContractIcon component
 */
describe('VerifyContractIcon', () => {
  it('renders without crashing', () => {
    renderWithProviders(<VerifyContractIcon size={50} />)

    const svgElement = screen.getByTestId('verify-contract-icon')
    expect(svgElement).toBeInTheDocument()
  })
})
