import { t } from 'i18next'

import { translate, validateLanguage } from './translate'

describe('Translate', () => {
  it('should translate text correctly', () => {
    const name = 'test'
    const result = translate(t, name)
    expect(result).toEqual(name)
  })

  describe('validateLanguage', () => {
    it('should validate language correctly', () => {
      const language = 'en'
      const path = '/docs/fr/test'
      const result = validateLanguage(language, path)
      expect(result).toEqual('/docs/en/test')
    })

    it('should return null if language is already valid', () => {
      const language = 'en'
      const path = '/docs/en/test'
      const result = validateLanguage(language, path)
      expect(result).toBeNull()
    })
  })
})
