/**
 * Import the SupportedActorTypeColors and actorTypeColor from 'MethodDefinitions'.
 */
import { SupportedActorTypeColors, actorTypeColor } from './MethodDefinitions'

/**
 * Test suite for MethodDefinitions module
 */
describe('MethodDefinitions', () => {
  /**
   * Test suite for actorTypeColor function
   */
  describe('actorTypeColor', () => {
    /**
     * Test that checks that the actorTypeColor function returns
     * the correct color depending on the input actor type and theme.
     */
    it('should return the correct color for the given actor type and theme', () => {
      expect(actorTypeColor('light', 'account')).toEqual(SupportedActorTypeColors.MethodsAccount.light)
      expect(actorTypeColor('dark', 'account')).toEqual(SupportedActorTypeColors.MethodsAccount.dark)
      expect(actorTypeColor('light', 'init')).toEqual(SupportedActorTypeColors.MethodsInit.light)
      expect(actorTypeColor('dark', 'init')).toEqual(SupportedActorTypeColors.MethodsInit.dark)
    })

    /**
     * Test that checks that the actorTypeColor function returns
     * the default color if the input actor type is not recognized.
     */
    it('should return the default color if the actor type is not recognized', () => {
      expect(actorTypeColor('light', 'unknown')).toEqual(SupportedActorTypeColors.Default.light)
      expect(actorTypeColor('dark', 'unknown')).toEqual(SupportedActorTypeColors.Default.dark)
    })
  })
})
