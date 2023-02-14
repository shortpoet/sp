import * as myTest from '@/utils/myTest'
const { createWrapper } = myTest.default
import PDFModal from '@/components/Resume/PDF/PDFModal'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faFilePdf, faSave, faTimes, faRocket, faGrinTongueSquint} from '@fortawesome/free-solid-svg-icons'

describe('PDFModal.vue', () => {

  const component = PDFModal

  let wrapper
  let mountOptions = {}
  let stubs

  beforeEach(() => {
    jest.resetModules()
    jest.clearAllMocks()

    library.add(
      faCircle, faFilePdf, faSave, faTimes, faRocket
    )

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers
    }
    mountOptions = { stubs }
  })

  describe('event emissions', () => {

    it('emits close when close button is clicked', () => {
      
      const wrapper = createWrapper(component, mountOptions)
      wrapper.find('.btn-close').trigger('click')
      expect(wrapper.emitted()).toMatchObject( {'close': [ [], [] ]} )

    })
    it('emits to-pdf and close as a follow up from toPDF in PDFButtonFloat when toPDF button is clicked', () => {
      
      const wrapper = createWrapper(component, mountOptions)
      wrapper.find('.btn-save').trigger('click')
      expect(wrapper.emitted()).toMatchObject( { 'to-pdf': [ [] ], 'close': [ [] ] } )

    })
    it('emits to-page and close as a follow up from toPage in PDFButtonFloat when toPage button is clicked', () => {
      
      const wrapper = createWrapper(component, mountOptions)
      wrapper.find('.btn-page').trigger('click')
      expect(wrapper.emitted()).toMatchObject( { 'to-page': [ [] ], 'close': [ [] ] } )

    })

    it('matches snapshot', () => {

      wrapper = createWrapper(component, mountOptions)
  
      expect(wrapper.html()).toMatchSnapshot()
  
    })

  })

})
