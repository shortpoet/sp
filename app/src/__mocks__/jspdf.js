// these modules' names must match exactly.  i had jsPDF at first and it didn't work
// git renamed this file on a merge BUG OPPORTUNITY

/* gotta watch out for how return values are nested
previously 
return {
  doc: {
    internal: ...
  }
}
had one too many {} and was not matching expected in function
*/

console.log('hello from jsPDF mock')

// https://stackoverflow.com/questions/44686077/how-to-use-jest-to-test-file-download
import FileSaver from 'file-saver'
export const fs = jest.mock('file-saver', ()=>({saveAs: jest.fn()}))

const getWidth = jest.fn(() => 888)
const getHeight = jest.fn(() => 888)
export const addImage = jest.fn(() => 'Test Image')
export const addPage = jest.fn(() => 'Test Page')
export const save = jest.fn(() => fs)
const doc = {
  internal: {
    pageSize: {
      getWidth: getWidth,
      getHeight: getHeight
    }
  },
  addImage: addImage,
  addPage: addPage,
  save: save
  // addImage: jest.fn(() => Promise.resolve(true)),
  // save: jest.fn(() => Promise.resolve(true))

}



// class jspdf {
//   constructor (type, size, dimension) {
//     this.internal = {
//       pageSize: {
//         getWidth: getWidth,
//         getHeight: getHeight
//       }
//     }

//   }

//   addImage = () => jest.fn(() => 'Test Image')

//   save = () => jest.fn(() => 'Test Save')

// }

const mock = jest.fn().mockImplementation(() => {
  return doc;
});

export default mock;

// module.exports = jspdf
