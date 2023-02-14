export const propMocker = (prop) => {
  return {
    propsData: {
      [`${prop}`]: `sample ${prop}`
    }
  }
}

// export default propMocker

module.exports = propMocker