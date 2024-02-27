describe('OG API', () => {
  it('empty test', async () => {})
})

// import { NextRequest } from 'next/server'

// import { ImageResponse } from '@vercel/og'

// import handler from '../../../pages/api/og'

// jest.mock('utils/ogSearch')
// jest.mock('utils/OGFonts')

// describe('OG API', () => {
//   beforeEach(() => {
//     jest.clearAllMocks()
//   })

//   it('returns default OG image when required parameters are missing', async () => {
//     const req = {
//       url: '/api/og?chain=ethereum&network=mainnet',
//     } as NextRequest
//     const res = await handler(req)

//     expect(res).toBeInstanceOf(ImageResponse)
//   })

//   it('returns OG image for address input type', async () => {
//     const req = {
//       url: '/api/og?chain=ethereum&network=mainnet&input=0x0&inputType=address',
//     } as NextRequest
//     const res = await handler(req)

//     expect(res).toBeInstanceOf(ImageResponse)
//   })

//   it('returns OG image for transactions input type', async () => {
//     const req = {
//       url: '/api/og?chain=ethereum&network=mainnet&input=0x0&inputType=transactions',
//     } as NextRequest
//     const res = await handler(req)

//     expect(res).toBeInstanceOf(ImageResponse)
//   })

//   it('returns OG image for tipset input type', async () => {
//     const req = {
//       url: '/api/og?chain=ethereum&network=mainnet&input=0x0&inputType=tipset',
//     } as NextRequest
//     const res = await handler(req)

//     expect(res).toBeInstanceOf(ImageResponse)
//   })
// })
