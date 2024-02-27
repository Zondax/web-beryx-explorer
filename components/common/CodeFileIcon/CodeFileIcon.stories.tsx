import React from 'react'

import SourceCodeFileIcon from './CodeFileIcon'

/**
 * This is a basic SourceCodeFileIcon component with a test value.
 */
export const BasicSourceCodeFileIcon = () => (
  <div>
    <SourceCodeFileIcon fileName="Test.sol" />
  </div>
)

/**
 * This is a SourceCodeFileIcon component with a test value and tooltip text.
 */
export const SourceCodeFileIconWithTooltip = () => (
  <div>
    <SourceCodeFileIcon fileName="Test.json" />
  </div>
)

/**
 * This is a SourceCodeFileIcon component with a test value and disabled link.
 */
export const SourceCodeFileIconDisabled = () => (
  <div>
    <SourceCodeFileIcon fileName="Test.txt" />
  </div>
)

/**
 * This is a SourceCodeFileIcon component with a test value and a copy button.
 */
export const SourceCodeFileIconWithCopyButton = () => (
  <div>
    <SourceCodeFileIcon fileName="Test.sol" />
  </div>
)
