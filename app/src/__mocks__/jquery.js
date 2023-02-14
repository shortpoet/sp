export const $ = jest.fn((...params) => {
  console.log('hello from jquery mock')
  console.log(params)
  return this
})

$.click = jest.fn((...params) => {
  console.log('hello from jquery mock')
  console.log(params)
  return this
})
$.fn = {}
$.fn.collapse = jest.fn((...params) => {
  console.log('hello from jquery mock')
  console.log(params)
  return this
})


