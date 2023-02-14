
// const html2canvas = jest.genMockFromModule('@trainiac/html2canvas')

console.log('hello from html2canvas mock')

const html2canvas = jest.fn(() => {
  return {
    width: 888,
    height: 888
  }
})

module.exports = html2canvas