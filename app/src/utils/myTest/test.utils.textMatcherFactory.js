import textMatcher from './test.utils.textMatcher'

// this function creates an it/test:
// 'renders interests ${dict.selector} that matches ${dict.prop} prop'
// for each prop in prop dict
// needs to be able to account for nested component props of diff types eg pdfabout socials
export const textMatcherFactory = (component, propDicts) => {
  const props = propDicts.map(d => d.prop)
  propDicts.forEach(dict => {
    it(`renders interests ${dict.selector} that matches ${dict.prop} prop`, () => {
      textMatcher(component, props, dict.prop, dict.selector)
    })  
  })
}

module.exports = textMatcherFactory