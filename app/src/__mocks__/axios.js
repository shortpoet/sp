export default {
  get: jest.fn((...params) => {
    // console.log(params)
    return new Promise((resolve, reject) => {
      resolve({
        params,
        data: {
          resume: {
            title: 'Test Resume',
          }
        }
      })    
    })
  })
}