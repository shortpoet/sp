// TODO organize rest of tests' imports like this

// test utils
import * as myTest from "@/utils/myTest";
const { createWrapper } = myTest.default;
import { createLocalVue } from "@vue/test-utils";

// utils
import { cloneDeep } from "lodash";
import Vue from "vue";
import { log } from "@/utils/colorLog";

// plugins
import PortalVue from "portal-vue";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
} from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircle,
  faFilePdf,
  faSave,
  faTimes,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

// SUT
import PDFButtonFloat from "@/components/Resume/PDF/PDFButtonFloat";
import PDF from "@/views/PDF";
import {hardResume} from "@/assets/resume.js";

// mocks
// the first way wasn't being 'called'
// it was loggin as a mock function but not the one being used in
// wrapper
// import jspdf from '@/__mocks__/jspdf'
import jspdf, { addImage } from "jspdf";
jest.mock("jspdf");
// similar to mocking @vue/testutils
// folders had to be nested just like source module for mock to work

// importing the mocks directly didn't seem to work
// but could have been due to other error
// consider checking
import html2canvas from "@trainiac/html2canvas";
// import html2canvas from '@/__mocks__/@trainiac/html2canvas'
import fontfaceobserver from "fontfaceobserver";
// import fontfaceobserver from '@/__mocks__/fontfaceobserver'

jest.useFakeTimers();

let wrapper;

describe("pdf.pdfButtonFloat", () => {
  const component = PDFButtonFloat;

  let methods = component.methods;

  const LocalVue = createLocalVue();
  LocalVue.use(PortalVue);

  let propsData;

  let computed;

  let stubs;

  let mocks;

  let ignoredElements;

  let resumeStoreOptions;

  let mountOptions;

  let expected;

  const events = [
    "click",
    "touchstart",
    "touchcancel",
    "touchmove",
    "touchend",
  ];

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();

    jspdf.mockClear();

    jest.useFakeTimers();

    expected = ``;

    library.add(faCircle, faFilePdf, faSave, faTimes, faRocket);

    stubs = {
      FontAwesomeIcon,
      FontAwesomeLayers,
    };

    propsData = {
      target: "save-button-float",
      icon: "save",
      pdfTarget: "pdf-anchor",
    };

    computed = {};

    ignoredElements = [
      // 'portal'
    ];

    mocks = {};

    mountOptions = {
      propsData: propsData,
      stubs: stubs,
    };

    const getResumeLoaded = true;

    resumeStoreOptions = {
      getters: {
        getResumeLoaded: jest.fn(() => getResumeLoaded),
        getResume: jest.fn(() => hardResume),
      },
      mutations: { SET_RESUME_RAW: jest.fn() },
    };

  });

  describe("pdf.pdfButtonFloat.snapshot", () => {
    it("should match snapshot", () => {
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe("pdf.pdfButtonFloat.showModal", () => {
    it("should show modal by changing isModalVisible to true", () => {
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);
      expect(wrapper.vm.isModalVisible).toBe(false);
      // 1st error being thrown seemed to be from test thinking this.isModalVisible was a function assignment
      // fixed by changing to .call()
      // then error bec no this context in test to added wrapper.vm
      // https://medium.com/@lachlanmiller_52885/data-and-interaction-testing-in-vue-e7914a9179d7
      methods.showModal.call(wrapper.vm);
      expect(wrapper.vm.isModalVisible).toBe(true);
    });
  });

  describe("pdf.pdfButtonFloat.closeModal", () => {
    it("should close modal by changing isModalVisible to false", async () => {
      const data = () => {
        return {
          isModalVisible: true,
        };
      };
      mountOptions = {
        propsData: propsData,
        data: data,
      };

      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      expect(wrapper.vm.isModalVisible).toBe(true);
      methods.closeModal.call(wrapper.vm);
      expect(wrapper.vm.isModalVisible).toBe(false);
    });
  });

  describe("pdf.pdfButtonFloat.checkFonts", () => {
    it("should call fontfaceobserver", async () => {
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);
      await methods.checkFonts.call(wrapper.vm);
      expect(fontfaceobserver).toHaveBeenCalled();
    });
  });

  describe("pdf.pdfButtonFloat.getCanvas", () => {
    it("should call html2canvas with options", async () => {
      mocks = {
        dispatch: jest.fn(),
      };

      mountOptions = {
        propsData: propsData,
        mocks: mocks,
        stubs: stubs,
        attachToDocument: true,
      };

      // had to create wrapper from parent component because using vue portal
      wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions);

      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true,
      };

      // this wasy doesn't load the context needed for method to run correctly
      // await methods.getCanvas(options)

      await wrapper.find(PDFButtonFloat).vm.getCanvas(options);

      const target = document.getElementById(
        wrapper.find(PDFButtonFloat).vm.pdfTarget
      );

      expect(html2canvas).toHaveBeenCalledWith(target, options);
    });
  });

  describe("pdf.pdfButtonFloat.createDoc", () => {
    it("should return doc with dimensions", async () => {
      mocks = {
        dispatch: jest.fn(),
      };

      mountOptions = {
        propsData: propsData,
        mocks: mocks,
        stubs: stubs,
        attachToDocument: true,
      };

      wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions);

      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true,
      };

      // https://github.com/hustcc/jest-canvas-mock
      const getDataURL = jest.fn(
        () =>
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      );

      wrapper.find(PDFButtonFloat).setMethods({ getDataURL: getDataURL });

      const canvas = await wrapper.find(PDFButtonFloat).vm.getCanvas(options);

      const createDoc = await wrapper.find(PDFButtonFloat).vm.createDoc(canvas);
      const doc = new jspdf("p", "mm", "a4");

      expect(createDoc).toMatchObject({
        doc: doc,
        marginX: 0,
        marginY: 0,
        canvasWidth: 888,
        canvasHeight: 888,
      });
    });
  });

  describe("pdf.pdfButtonFloat.setCanvas", () => {
    it("calls getCanvas assigning returned value to component data after 250s timeout", async () => {
      mocks = {
        dispatch: jest.fn(),
      };

      mountOptions = {
        propsData: propsData,
        mocks: mocks,
        stubs: stubs,
        attachToDocument: true,
      };

      wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions);

      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true,
      };

      const getDataURL = jest.fn(
        () =>
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      );
      wrapper.find(PDFButtonFloat).setMethods({ getDataURL: getDataURL });

      const callback = jest.fn();

      await wrapper.find(PDFButtonFloat).vm.setCanvas(options, callback);

      const canvas = { width: 888, height: 888 };

      expect(wrapper.find(PDFButtonFloat).vm.canvas).toBeNull();

      jest.advanceTimersByTime(250);
      await Promise.resolve();

      expect(wrapper.find(PDFButtonFloat).vm.canvas).toMatchObject(canvas);
    });
  });

  describe("pdf.pdfButtonFloat.toPDF", () => {
    const getDataURL = jest.fn(
      () =>
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    );

    // need to mock canvas because this function expects it
    // to already be set by setcanvas which calls this as callback
    const canvas = { width: 888, height: 888 };

    const doc = new jspdf("p", "mm", "a4");
    
    const canvases = [ { width: 555, height: 888 }, { width: 888, height: 888 }, { width: 888, height: 555 } ]

    beforeEach(() => {
      // need before each else the stubs don't get reset (props among other things)

      jest.resetModules();
      jest.clearAllMocks();

      jspdf.mockClear();

      mocks = {
        dispatch: jest.fn(),
      };
      const data = () => {
        return {
          canvas: canvas,
        };
      };

      mountOptions = {
        propsData: propsData,
        data: data,
        stubs: stubs,
      };

      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      wrapper.setMethods({ getDataURL: getDataURL });
    });

    it("jspdf null on load and should create new jspdf and set it to data property", async () => {
      expect(wrapper.vm.jspdf).toBeNull();

      await wrapper.vm.toPDF();

      expect(wrapper.vm.jspdf).toMatchObject(doc);
    });

    canvases.forEach(canvas => {
      it(`should add image with correct dimensions w: ${canvas.width} & h: ${canvas.height}`, async () => {
        
        // must have fresh data object here so loaded SUT matches expected
        const data = () => {
          return {
            canvas: canvas,
          };
        };
  
        mountOptions = {
          propsData: propsData,
          data: data,
          stubs: stubs,
        };
  
        wrapper = createWrapper(component, mountOptions, resumeStoreOptions);
  
        wrapper.setMethods({ getDataURL: getDataURL });
          await wrapper.vm.toPDF();
  
        const addImageSpy = jest
          .spyOn(wrapper.vm.jspdf, "addImage")
          .mockImplementation(() => jest.fn());
  
        const marginX = 0; //(pageWidth - canvasWidth) / 2;
        const marginY = 0; //(pageHeight - canvasHeight) / 2;
  
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;
  
        const image = getDataURL();
    
        expect(addImageSpy).toHaveBeenCalledWith(
          image,
          "JPEG",
          marginX,
          marginY,
          canvasWidth,
          canvasHeight,
          null,
          "SLOW"
        );
      });
    })


    it("should save pdf with correct filename", async () => {
      await wrapper.vm.toPDF();

      const saveSpy = jest
        .spyOn(wrapper.vm.jspdf, "save")
        .mockImplementation(() => jest.fn());

      const fileName = `Carlos_Soriano_${moment().format(
        "YYYY_MM_DD_HH_mm"
      )}.pdf`;

      expect(saveSpy).toHaveBeenCalledWith(fileName);
    });
  });

  describe("pdf.pdfButtonFloat.savePDF", () => {
    it("should call setCanvas with options and pdf callback", async () => {
      mocks = {
        dispatch: jest.fn(),
      };

      mountOptions = {
        propsData: propsData,
        mocks: mocks,
        stubs: stubs,
        attachToDocument: true,
      };

      wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions);

      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true,
      };

      const getDataURL = jest.fn(
        () =>
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      );

      const setCanvas = jest.fn();

      const toPDF = jest.fn();

      // i really like this test, it doesn't let me arbitrarily change method names! XD
      wrapper.find(PDFButtonFloat).setMethods({
        getDataURL: getDataURL,
        setCanvas: setCanvas,
        toPDF: toPDF,
      });

      await wrapper.find(PDFButtonFloat).vm.savePDF();

      wrapper.find(PDFButtonFloat).setMethods({ getDataURL: getDataURL });
      expect(setCanvas).toHaveBeenCalledWith(options, toPDF);
    });
  });
  describe("pdf.pdfButtonFloat.paginate", () => {

    const getDataURL = jest.fn(
      () =>
        "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
    );

    const doc = new jspdf("p", "mm", "a4");

    beforeEach(() => {
      // need before each else the stubs don't get reset (props among other things)
  
      // need to mock canvas because this function expects it
      // to already be set by setcanvas which calls this as callback
      const canvas = { width: 888, height: 888 };
    
      const data = () => {
        return {
          canvas: canvas,
        };
      };

      mountOptions = {
        propsData: propsData,
        data: data,
        stubs: stubs,
      };


      jest.resetModules();
      jest.clearAllMocks();

      jspdf.mockClear();

      mocks = {
        dispatch: jest.fn(),
      };

      // a typo in one of the paginate methods which called toPDF instead
      // created an error only when running the whole file instead of just the describe

      });

    it("jspdf null on load and should create new jspdf and set it to data property", async () => {
      // added new addPage method to mock
      
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      wrapper.setMethods({ getDataURL: getDataURL });
  
      expect(wrapper.vm.jspdf).toBeNull();

      await wrapper.vm.paginate();

      log('green', wrapper.vm.jspdf)

      expect(wrapper.vm.jspdf).toMatchObject(doc);
    });

    it("should add image with correct dimensions and divides up the page into chunks that fit an a4 then switches back to regular layout", async () => {
      
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      wrapper.setMethods({ getDataURL: getDataURL });
  
      const canvas = { width: 888, height: 888 };
    
      await wrapper.vm.paginate();

      log('green', wrapper.vm.jspdf)

      const addImageSpy = jest
        .spyOn(wrapper.vm.jspdf, "addImage")
        .mockImplementation(() => jest.fn());

      const marginX = 0; //(pageWidth - canvasWidth) / 2;
      const marginY = 0; //(pageHeight - canvasHeight) / 2;

      const imgWidth = 595;
      const pageHeight = 842;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      const imgData = getDataURL();

      expect(addImageSpy).toHaveBeenCalledWith(
        imgData,
        "JPEG",
        marginX,
        marginY,
        imgWidth,
        imgHeight,
        null,
        "SLOW"
      );

      log("green", "test");

      expect(wrapper.find(PDFButtonFloat).emitted()).toMatchObject({
        "to-render-pdf": [[false]],
      });
    });

    it("should save pdf with correct filename", async () => {
      
      wrapper = createWrapper(component, mountOptions, resumeStoreOptions);

      wrapper.setMethods({ getDataURL: getDataURL });
        
      await wrapper.vm.paginate();

      log('green', wrapper.vm.jspdf)

      const saveSpy = jest
        .spyOn(wrapper.vm.jspdf, "save")
        .mockImplementation(() => jest.fn());

      const fileName = `Carlos_Soriano_${moment().format(
        "YYYY_MM_DD_HH_mm"
      )}.pdf`;

      expect(saveSpy).toHaveBeenCalledWith(fileName);
    });

  });

  describe("pdf.pdfButtonFloat.toPage", () => {
    it("should call setCanvas with options and paginate callback after emitting to-render-pdf", async () => {
      mocks = {
        dispatch: jest.fn(),
      };

      mountOptions = {
        propsData: propsData,
        mocks: mocks,
        stubs: stubs,
        attachToDocument: true,
      };

      wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions);

      const options = {
        width: 810,
        scale: 5,
        useCORS: true,
        allowTaint: true,
      };

      const getDataURL = jest.fn(
        () =>
          "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
      );

      const setCanvas = jest.fn();

      const paginate = jest.fn();

      wrapper.find(PDFButtonFloat).setMethods({
        getDataURL: getDataURL,
        setCanvas: setCanvas,
        paginate: paginate,
      });

      await wrapper.find(PDFButtonFloat).vm.toPage();

      expect(wrapper.find(PDFButtonFloat).emitted()).toMatchObject({
        "to-render-pdf": [[true]],
      });

      expect(setCanvas).toHaveBeenCalledWith(options, paginate);
    });
  });

  describe('#### _toPDF ####', () => {
    it("#### was a crazy test for some spaghetti functions ####", async () => {
      //   mocks = {
      //     dispatch: jest.fn()
      //   }
      //   mountOptions = {
      //     propsData: propsData,
      //     mocks: mocks,
      //     stubs: stubs,
      //     attachToDocument: true
      //   }
      //   // had to create wrapper from parent component because using vue portal
      //   wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions)
      //   const options = {
      //     scale: 5,
      //     useCORS: true,
      //     allowTaint: true,
      //   }
      //   // this wasy doesn't load the context needed for method to run correctly
      //   // await methods.getCanvas(options)
      //   // const getCanvas = jest.fn(() => 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')
      //   const getDataURL = jest.fn(() => 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')
      //   wrapper.find(PDFButtonFloat).setMethods({getDataURL: getDataURL})
      //   // let savePDF = await wrapper.find(PDFButtonFloat).vm.savePDF()
      //   // console.log(savePDF)
      //   // const doc = new jspdf('p', 'mm', 'a4');
      //   // expect(savePDF).toBeUndefined()
      //   // expect(jspdf).toHaveBeenCalledTimes(1)
      //   // // jest.advanceTimersByTime(250)
      //   // // await Promise.resolve()
      //   // console.log(savePDF)
      //   // const fileName = `Carlos_Soriano_${Date.now()}.pdf`
      //   // expect(savePDF).toMatchObject({doc, fileName})
      //   // jest.advanceTimersByTime(250)
      //   return wrapper.find(PDFButtonFloat).vm.savePDF().then( async (first) => {
      //     jest.advanceTimersByTime(250)
      //     await Promise.resolve()
      //     console.log(first)
      //   }).then(async (next) => {
      //     jest.advanceTimersByTime(250)
      //     await Promise.resolve()
      //     // this gets called right after timeout
      //     // and before callback
      //     console.log(next)
      //   }).then(async (next2) => {
      //     jest.advanceTimersByTime(250)
      //     await Promise.resolve()
      //     // by now doc has been logged from callback
      //     console.log(next2)
      //   }).then(async (next3) => {
      //     jest.advanceTimersByTime(250)
      //     await Promise.resolve()
      //     console.log(next3)
      //   })
    });

    it('#### should call jsPDF with options ####', async () => {

      // mocks = {
      //   dispatch: jest.fn()
      // }

      // mountOptions = {
      //   propsData: propsData,
      //   mocks: mocks,
      //   stubs: stubs,
      //   attachToDocument: true
      // }

      // wrapper = createWrapper(PDF, mountOptions, resumeStoreOptions)

      // const options = {
      //   scale: 5,
      //   useCORS: true,
      //   allowTaint: true,
      // }

      // const getDataURL = jest.fn(() => 'data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==')
      // wrapper.find(PDFButtonFloat).setMethods({getDataURL: getDataURL})

      // const doc = new jspdf('p', 'mm', 'a4');

      // expect(jspdf).toHaveBeenCalledTimes(1)

      // const canvas = await wrapper.find(PDFButtonFloat).vm.getCanvas(options)

      // const toPDF = await wrapper.find(PDFButtonFloat).vm.toPDF(canvas)

      // expect(toPDF).toMatchObject(doc)

    })
  })
});
