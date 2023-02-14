export const propsMocker = (props) => {
  if (Array.isArray(props)) {
    let propsData = {}
    props.map(prop => {
      propsData[`${prop}`] = `sample ${prop}`
    })
    return {
      propsData
    }
  } else {
    let propsData = {}
    const key = Object.keys(props)[0]
    // spread to clone so the splice works on subsequent tests
    let values = [...props[`${key}`]]
    const length = parseInt(values.splice(-1, 1)[0])
    const iterator = [...Array(length).keys()]
    propsData[`${key}`] = []
    let keyDict
    for (let i of iterator) {
      keyDict = {}
      values.map(prop => {
        keyDict[`${prop}`] = `sample ${prop}`
      })
      propsData[`${key}`].push(keyDict)
    }
    return {
      propsData
    }
  }
}

module.exports = propsMocker