// mock for @ipld/dag-cbor because it throws module not found error
module.exports = {
  encode: jest.fn(),
  decode: jest.fn(),
}
