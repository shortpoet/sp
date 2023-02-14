<template>
  <portal :to="target">
    <!-- 
      * previously had this selector to unify the components - split after styling diverged
      * v-if="href" 
      * v-if="pdfTarget"
    </div>-->
    <div type="input" :class="classObject" @click="showModal">
      <font-awesome-layers class="button-float-icon-layer fa-lg">
        <font-awesome-icon class="button-float-icon-circle" size="2x" icon="circle" />
        <font-awesome-icon
          class="button-float-icon"
          size="2x"
          :transform="_icon.transform"
          :icon="_icon.icon"
        ></font-awesome-icon>
      </font-awesome-layers>
    </div>
    <div class="modal-slot">
      <PDFModal
        v-show="isModalVisible"
        @close="closeModal"
        @to-pdf="savePDF"
        @to-page="toPage"
        @to-canvas="toCanvas"
      >
        <!-- <template v-slot:header>
          <h1>Test Header</h1>
        </template>
        <template v-slot:body>
          <h1>Test Body</h1>
        </template>
        <template v-slot:footer>
          <h1>Test Footer</h1>
        </template>-->
      </PDFModal>
    </div>
  </portal>
</template>

<script>
import PDFModal from "@/components/Resume/PDF/PDFModal";
import { colorLog } from "@/utils/colorLog";
import { log } from "@/utils/colorLog";
// log('blue', 'test')
import jsPDF from "jspdf";
// using fork for now to solve this issue
// the changes i made with the icons as the deployed version still works
// https://github.com/niklasvh/html2canvas/issues/1868#issuecomment-599217709
import html2canvas from "@trainiac/html2canvas";
// import html2canvas from 'html2canvas'
const FontFaceObserver = require("fontfaceobserver");
import moment from "moment";

// https://stackoverflow.com/questions/38975138/is-using-async-in-settimeout-valid
// let wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "PDFButtonFloat",
  components: {
    PDFModal
  },
  props: {
    target: {
      type: String
    },
    icon: {
      type: String
    },
    pdfTarget: {
      type: String
    }
    // handler: {
    //   type: Function,
    //   required: false
    // }
  },
  data() {
    return {
      iconMap: {
        pdf: {
          icon: "file-pdf",
          transform: "shrink-5 right-2.3"
        },
        save: {
          icon: "save",
          transform: "shrink-5 right-1"
        }
      },
      isModalVisible: false,
      canvas: null,
      jspdf: null
    };
  },
  computed: {
    mobile() {
      return window.innerWidth < 768;
    },
    classObject() {
      return {
        "button-float": true,
        mobile: this.mobile
      };
    },
    _icon() {
      return this.iconMap[`${this.icon}`];
    }
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    /* istanbul ignore next */
    toCanvas() {
      html2canvas(document.getElementById(this.pdfTarget), {
        allowTaint: true
      }).then(canvas => {
        document.body.appendChild(canvas);
      });
    },
    async checkFonts() {
      var fontA = new FontFaceObserver("Open Sans");
      var fontB = new FontFaceObserver("Saira Extra Condensed");
      // must return otherwise load order is not correct
      try {
        return Promise.all([fontA.load(), fontB.load()]).then(function() {
          console.log("Family A & B have loaded");
        });
      } catch {
      /* istanbul ignore next */
        err => console.log(err);
      }
    },
    async getCanvas(options) {
      const vm = this;
      const target = document.getElementById(vm.pdfTarget);
      try {
        let canvas = html2canvas(target, {
          ...options
        });
        return canvas;
      } catch {
      /* istanbul ignore next */
        err => console.log(err);
      }
    },
    // first one is significantly faster
    // second makes mage unresponsive for like 3 secs
    // go unit tests!

    // TODO maybe add the functionality to provide filetype here
    // and then in addImage
    // then would need to actually test this function
    /* istanbul ignore next */
    getDataURL(canvas) {
      return canvas.toDataURL("image/jpeg", 1.0);
      // return canvas.toDataURL('image/png');
    },
    // https://stackoverflow.com/questions/19626680/is-settimeout-a-good-solution-to-do-async-functions-with-javascript
    async setCanvas(options, callback) {
      const vm = this;
      await vm.checkFonts();
      colorLog("fonts have been checked", "violet");
      setTimeout(async () => {
        try {
          const canvas = await vm.getCanvas(options);
          vm.canvas = canvas;
          callback();
        } catch (err) {
        /* istanbul ignore next */
          console.log(err);
        }
      }, 250);
    },
    // close modal first
    // [Vue warn]: Method "isModalVisible" has type "boolean" in the component definition. Did you reference the function correctly?      this.closeModal()
    // [Vue warn]: Method "isModalVisible" has already been defined as a data property.
    // vm.isModalVisible = false
    // vm.closeModal()
    // both threw those warning but only in test
    // realized that the click event on the modal buttons
    // bubbled up to parent backdrop div that closes on click
    // which is why the modal tests had that double event that had me wondering
    // seems then no need to call close from here which makes sense as far as separation of concerns i guess
    //
    // setting width and height cuts it off at the "one page mark"
    // width: 810,
    // height: 1100,
    toPDF() {
      const vm = this;
      const canvas = vm.canvas;
      this.jspdf = new jsPDF("p", "mm", "a4");
      const doc = vm.jspdf;

      const marginX = 0; //(pageWidth - canvasWidth) / 2;
      const marginY = 0; //(pageHeight - canvasHeight) / 2;

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const image = vm.getDataURL(canvas);
      this.jspdf.addImage(
        image,
        "JPEG",
        marginX,
        marginY,
        canvasWidth,
        canvasHeight,
        null,
        "SLOW"
      );

      const fileName = `Carlos_Soriano_${moment().format(
        "YYYY_MM_DD_HH_mm"
      )}.pdf`;
      this.jspdf.save(fileName);
    },
    async savePDF() {
      const vm = this;
      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true
      };
      vm.setCanvas(options, vm.toPDF);
    },
    // https://stackoverflow.com/questions/24069124/how-to-save-a-image-in-multiple-pages-of-pdf-using-jspdf
    // https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer/34934497#34934497
    // insterstingly this used to work even when pdf was not reassigned to paginated
    // eg
    // vm.paginate(target, canvas, pdf);
    // paginated.save(`Carlos_Soriano_${Date.now()}.pdf`);
    // vm.$emit('toPDF', false);
    async toPage() {
      const vm = this;
      const options = {
        width: 810,
        scale: 5,
        useCORS: true,
        allowTaint: true
      };
      vm.$emit("to-render-pdf", true);
      vm.setCanvas(options, vm.paginate);
    },
    paginate() {
      const canvas = this.canvas;
      this.jspdf = new jsPDF("p", "pt", "a4");
      const vm = this;
      const imgData = vm.getDataURL(canvas);

      const marginX = 0;
      const marginY = 0;

      const imgWidth = 595;
      const pageHeight = 842;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      this.jspdf.addImage(
        imgData,
        "JPEG",
        marginX,
        marginY,
        imgWidth,
        imgHeight,
        null,
        "SLOW"
      );

      heightLeft -= pageHeight;
      let secondHalf = heightLeft - imgHeight;

      // colorLog(`secondHalf: ${secondHalf}`, "violet");

      this.jspdf.addPage();
      // TODO
      // add multiple page logic
      this.jspdf.addImage(
        imgData,
        "PNG",
        0,
        secondHalf,
        imgWidth,
        imgHeight,
        null,
        "SLOW"
      );
      const fileName = `Carlos_Soriano_${moment().format(
        "YYYY_MM_DD_HH_mm"
      )}.pdf`;
      
      this.jspdf.save(fileName);

      vm.$emit("to-render-pdf", false);
      return this.jspdf;
    },
    /* istanbul ignore next */
    createDoc(canvas) {
      const doc = new jsPDF("p", "mm", "a4");
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;
      const marginX = 0; //(pageWidth - canvasWidth) / 2;
      const marginY = 0; //(pageHeight - canvasHeight) / 2;
      return {
        doc,
        marginX,
        marginY,
        canvasWidth,
        canvasHeight
      };
    },
    /* istanbul ignore next */
    async _toPDF(canvas) {
      const vm = this;
      const image = vm.getDataURL(canvas);
      const { doc, marginX, marginY, canvasWidth, canvasHeight } = vm.createDoc(
        canvas
      );
      doc.addImage(
        image,
        "JPEG",
        marginX,
        marginY,
        canvasWidth,
        canvasHeight,
        null,
        "SLOW"
      );
      return doc;
    },
    /* istanbul ignore next */
    async _savePDF() {
      const vm = this;
      log("blue", "savePDF from Button Float");
      const options = {
        scale: 5,
        useCORS: true,
        allowTaint: true
      };
      try {
        const callback = async () => {
          const doc = await vm.toPDF(this.canvas);
          log("green", "before save");
          const fileName = `Carlos_Soriano_${Date.now()}.pdf`;
          doc.save(fileName);
          return {
            doc,
            fileName
          };
          // return Promise.resolve({
          //   doc,
          //   fileName
          // })
        };
        log("cyan", "about to do callback");
        vm.setCanvas(options, callback);
      } catch (err) {
        console.log(err);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
</style>