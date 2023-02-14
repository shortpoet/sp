// import propsFinder from '../test.utils.propsFinder'

const createWrapper = jest.genMockFromModule('@/utils/myTest/test.utils.createWrapper')

console.log('hello from createWrapper mock module')

const propsFinder = jest.fn()

const propFinder = jest.fn()
const find = jest.fn()
const expect = jest.fn()

const doMatch = jest.fn()


createWrapper.propsFinder = propsFinder
createWrapper.propFinder = propFinder
createWrapper.find = find
createWrapper.expect = expect
createWrapper.doMatch = doMatch

// using default creates a 'default' object in the mock implementations that 
// throws an error
// doesn't use the mocked propsFinder, instead using default
// still need to learn more about how this works
// export default createWrapper

module.exports = createWrapper