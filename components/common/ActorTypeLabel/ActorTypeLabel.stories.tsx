import React from 'react'

import ActorTypeLabel from './ActorTypeLabel'

/**
 * This is a basic level 1 ActorTypeLabel component with a test label.
 */
export const BasicLevel1 = () => (
  <div>
    <ActorTypeLabel label="Test Label [1]" />
  </div>
)

/**
 * This is a basic level 2 ActorTypeLabel component with a test label and a level of 2.
 */
export const BasicLevel2 = () => (
  <div>
    <ActorTypeLabel label="Test Label [2]" level={2} />
  </div>
)

/**
 * This is a basic level 3 ActorTypeLabel component with a test label and a level of 3.
 */
export const BasicLevel3 = () => (
  <div>
    <ActorTypeLabel label="Test Label [3]" level={3} />
  </div>
)

/**
 * This is a basic level 4 ActorTypeLabel component with a test label and a level of 4.
 */
export const BasicLevel4 = () => (
  <div>
    <ActorTypeLabel label="Test Label [4]" level={4} />
  </div>
)
