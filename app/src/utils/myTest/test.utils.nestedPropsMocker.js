

// // this is incomplete
// // maybe try and develop using TDD  
  
// export const nestedPropsMocker = (props) => {

//   console.log(props)

//   let propsData = {}


//   const handleArray = (props) => {
//     propsData = {}
//     props.map(prop => {
//       propsData[`${prop}`] = `sample ${prop}`
//     })
//     return {
//       propsData
//     }
//   }


//   const handleNested = (props, propsData, previousKey, nextKey) => {
//     console.log(props, propsData)

//     let firstLevel
//     if (previousKey === null && nextKey === null) {
//       firstLevel = true
//     }

//     // spread to clone so the splice works on subsequent tests
//     let values = [...props]

//     const length = parseInt(values.splice(-1, 1)[0])
//     console.log(length)
//     const iterator = [...Array(length).keys()]

//     if (firstLevel === true) {
//       previousKey = values.splice(0, 1)[0]
//       propsData[`${previousKey}`] = []
//     } else {
//       console.log('#### not first run ####')
//       console.log(propsData)
//       console.log(previousKey)
//       nextKey = values.splice(0, 1)[0]
//       console.log(nextKey)
//       propsData[`${previousKey}`][`${nextKey}`] = []
//     }


//     let keyDict

//     for (let i of iterator) {
//       keyDict = {}
//       values.map(prop => {
//         if (Array.isArray(prop)) {
//           console.log(prop)
//           console.log('#### calling handleNested from nested ####')
//           // this would only work for one level nested
//           // TODO maybe refactor for infinite recursion
//           console.log(previousKey)
//           console.log(nextKey)
//           console.log(propsData)
//           handleNested(prop, propsData, previousKey, nextKey)
//         } else {
//           console.log(prop)
//           keyDict[`${prop}`] = `sample ${prop}`
//         }
//       })
//       if (firstLevel === true) {
//         propsData[`${previousKey}`].push(keyDict)
//         firstRun = false
//       } else {
//         console.log(propsData)
//         console.log(previousKey)
//         console.log(nextKey)
//         console.log(propsData.experiences)
//         console.log(propsData.experiences.jobs)
//         propsData[`${previousKey}`][`${nextKey}`].push(keyDict)
//       }
//     }
//     return {
//       propsData
//     }
//   }

//   const isNested = props.some(p => Array.isArray(p))
//   const previousKey = null
//   const nextKey = null

//   if (isNested) {
//     console.log('#### is nested ####')
//     handleNested(props, propsData, previousKey, nextKey)
//   } else  {
//     handleArray(props)
//   }
// }
