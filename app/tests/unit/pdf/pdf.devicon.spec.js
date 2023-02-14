import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import PDFDevIcon from '@/components/Resume/PDF/PDFDevIcon'
import { cloneDeep } from 'lodash'

describe('PDFDevIcon.vue', () => {

  const component = PDFDevIcon
  const mountOptions = {
    propsData: {
      source: 'sample_source',
      name: '',
      showName: false
    }
  }

  let wrapper

  let expected
  let isImage
  let imgClass

  const imageExtensions = ['.svg', '.jpg', '.png', '.jpeg']
  const names = ['vue', 'tableau', 'd3', 'ts', 'azure', 'bash', 'powershell', 'terraform', 'aws']

  beforeEach(() => {
    isImage = false
    imgClass = ''
    expected = ''
    jest.resetModules()
    jest.clearAllMocks()
  })

  describe('renders i if not isImage with class containing source', () => {

    const _mountOptions = cloneDeep(mountOptions)
    _mountOptions.propsData.source += ``
    expected += ``

    it('renders i if not isImage with class containing source', () => {

      wrapper = createWrapper(component, _mountOptions)

      expect(wrapper.find('i').attributes().class).toContain(expected)

    })

    it('matches snapshot', () => {

      wrapper = createWrapper(component, _mountOptions)

      expect(wrapper.html()).toMatchSnapshot()

    })

  })


  imageExtensions.forEach(ext => {
    names.forEach(name => {
      describe(`renders img if isImage with class containing source ${ext} and name ${name}`, () => {

        const _mountOptions = cloneDeep(mountOptions)

        _mountOptions.propsData.source += ext

        _mountOptions.propsData.name += name

        wrapper = createWrapper(component, _mountOptions)

        switch (name) {
          case "vue":
            imgClass = "vue-devicon";
            break;
          case "ts":
            imgClass = "ts-devicon";
            break;
          case "tableau":
            imgClass = "tableau-devicon";
            break;
          case "d3":
            imgClass = "d3-devicon";
            break;
          case "azure":
            imgClass = "azure-devicon";
            break;
          case "bash":
            imgClass = "bash-devicon";
            break;
          case "terraform":
            imgClass = "terraform-devicon";
            break;
          case "powershell":
            imgClass = "powershell-devicon";
            break;
          case "aws":
            imgClass = "aws-devicon";
            break;
        }

        expected += `${imgClass}`

        it(`renders img if isImage with class containing source ${ext} and name ${name}`, () => {

          wrapper = createWrapper(component, _mountOptions)

          expect(wrapper.find('img').attributes().class).toContain(expected)

        })

        it('matches snapshot', () => {

          wrapper = createWrapper(component, _mountOptions)

          expect(wrapper.html()).toMatchSnapshot()

        })
        it('renders span with name if showName true', () => {

          const __mountOptions = cloneDeep(_mountOptions)

          __mountOptions.propsData.showName = true

          wrapper = createWrapper(component, __mountOptions)

          expect(wrapper.find('span').text()).toMatch(name)

        })
        it('matches snapshot with showname', () => {

          const __mountOptions = cloneDeep(_mountOptions)

          __mountOptions.propsData.showName = true

          wrapper = createWrapper(component, __mountOptions)

          expect(wrapper.html()).toMatchSnapshot()

        })
      })
    })

  })

})
