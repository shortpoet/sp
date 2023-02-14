import jsPDF from 'jspdf'
// using fork for now to solve this issue
// the changes i made with the icons as the deployed version still works
// https://github.com/niklasvh/html2canvas/issues/1868#issuecomment-599217709
import html2canvas from '@trainiac/html2canvas'

/* istanbul ignore next */
const originalToPDF = (target) => {
  // timeout is set to account for loading time i believe
  setTimeout(() => {
    console.log(target)
    html2canvas(document.getElementById(target), {
      scale: 3,
      useCORS: true,
      allowTaint: true,
    }).then(canvas => {
      const image = canvas.toDataURL('image/jpeg', 1.0);
      const doc = new jsPDF('p', 'mm', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight, null, 'SLOW');
      doc.save(`Carlos_Soriano_${Date.now()}.pdf`);
    });
  }, 250);
}
/* istanbul ignore next */
const paginate1 = (target, canvas, pdf) => {
  for (var i = 0; i <= target.clientHeight/842; i++) {
    //! This is all just html2canvas stuff
    var srcImg  = canvas;
    var sX      = 0;
    var sY      = 1120*i; // start 980 pixels down for every new page
    var sWidth  = 778;
    var sHeight = 1120;
    var dX      = 0;
    var dY      = 0;
    var dWidth  = 778;
    var dHeight = 1120;

    var onePageCanvas = document.createElement("canvas");
    onePageCanvas.setAttribute('width', 778);
    onePageCanvas.setAttribute('height', 1120);
    var ctx = onePageCanvas.getContext('2d');
    // details on this usage of this function: 
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
    ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

    // document.body.appendChild(canvas);
    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

    var width         = onePageCanvas.width;
    var height        = onePageCanvas.clientHeight;

    //! If we're on anything other than the first page,
    // add another page
    if (i > 0) {
        pdf.addPage(595, 842); //8.5" x 11" in pts (in*72)
    }
    //! now we declare that we're working on that page
    pdf.setPage(i+1);
    //! now we add content to that page!
    pdf.addImage(canvasDataURL, 'PNG', 0, 0, (width*.72), (height*.71));              
    // pdf.addImage(canvasDataURL, 'JPEG', 0, 0, (width*.72), (height*.71), null, 'SLOW');
    // pdf.addImage(canvasDataURL, 'JPEG', marginX, marginY, canvasWidth, canvasHeight, null, 'SLOW');
  }
  return pdf;
}
/* istanbul ignore next */
const paginate2 = (target, canvas, pdf) => {
  for (var i = 0; i <= target.clientHeight/842; i++) {
    //! This is all just html2canvas stuff
    var srcImg  = canvas;
    var sX      = 0;
    var sY      = 980*i; // start 980 pixels down for every new page
    var sWidth  = 900;
    var sHeight = 980;
    var dX      = 0;
    var dY      = 0;
    var dWidth  = 900;
    var dHeight = 980;

    var onePageCanvas = document.createElement("canvas");
    onePageCanvas.setAttribute('width', 900);
    onePageCanvas.setAttribute('height', 980);
    var ctx = onePageCanvas.getContext('2d');
    // details on this usage of this function: 
    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
    ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

    // document.body.appendChild(canvas);
    var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

    var width         = onePageCanvas.width;
    var height        = onePageCanvas.clientHeight;

    //! If we're on anything other than the first page,
    // add another page
    if (i > 0) {
        pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
    }
    //! now we declare that we're working on that page
    pdf.setPage(i+1);
    //! now we add content to that page!
    pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
  }
  return pdf;
}
/* istanbul ignore next */
const paginate3 = (target, canvas, pdf) => {
  var imgData = canvas.toDataURL('image/png');

  /*
  Here are the numbers (paper width and height) that I found to work. 
  It still creates a little overlap part between the pages, but good enough for me.
  if you can find an official number from jsPDF, use them.
  */
  // var imgWidth = 210; 
  // var pageHeight = 295;  
  var imgWidth = 595; 
  var pageHeight = 842;  
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;

  var position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }
  return pdf;
}
/* istanbul ignore next */
const paginate = (target, canvas, pdf) => {
  var imgData = canvas.toDataURL('image/png');

  var imgWidth = 595; 
  var pageHeight = 842;  
  var imgHeight = canvas.height * imgWidth / canvas.width;
  var heightLeft = imgHeight;
  // console.log(heightLeft)
  // var secondHalf = imgHeight - firstHalf;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, null, 'SLOW');
  heightLeft -= pageHeight;
  // console.log(heightLeft)
  var secondHalf = heightLeft - imgHeight
  // console.log(secondHalf)
  pdf.addPage();
  pdf.addImage(imgData, 'PNG', 0, secondHalf, imgWidth, imgHeight, null, 'SLOW');
  return pdf;
}
/* istanbul ignore next */
toCanvas = () => {
  html2canvas(document.getElementById(this.pdfTarget), {
      // scale: 5,
      // useCORS: true,
      allowTaint: true,
    }).then(canvas => {
      console.log(canvas)
      // var _canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
    })
}
/* istanbul ignore next */
toPage = () => {
  const vm = this;
  vm.isModalVisible = false;
  let target = document.getElementById(vm.pdfTarget);
  var fontA = new FontFaceObserver('Open Sans');
  var fontB = new FontFaceObserver('Saira Extra Condensed');
  vm.$emit('to-pdf', true);
  Promise.all([fontA.load(), fontB.load()]).then(function () {
    console.log('Family A & B have loaded');
    setTimeout(()=>{
      html2canvas(target, {
        // width: '210mm',
        // height: '297mm',        
        // width: '595px',
        // height: '842px',
        width: 810,
        // height: 1100,
        scale: 5,
        useCORS: true,
        allowTaint: true,
      }).then(function(canvas) {
        var pdf = new jsPDF('p', 'pt', 'a4');
        console.log(target.clientHeight);
        console.log(canvas, pdf)
        // https://stackoverflow.com/questions/24069124/how-to-save-a-image-in-multiple-pages-of-pdf-using-jspdf
        // https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer/34934497#34934497

        vm.paginate(target, canvas, pdf);
        pdf.save(`Carlos_Soriano_${Date.now()}.pdf`);
        vm.$emit('toPDF', false);
      });
    }, 250);
  });
}
/* istanbul ignore next */
toPDF = () => {
  const vm = this;
  // close modal first
  vm.isModalVisible = false;
  // timeout is set to account for loading time i believe
  var fontA = new FontFaceObserver('Open Sans');
  var fontB = new FontFaceObserver('Saira Extra Condensed');
  Promise.all([fontA.load(), fontB.load()]).then(function () {
    console.log('Family A & B have loaded');
    setTimeout(() => {
      console.log(vm.target)
      html2canvas(document.getElementById(vm.pdfTarget), {
        // setting width and height cuts it off at the "one page mark"
        // width: 810,
        // height: 1100,
        scale: 5,
        useCORS: true,
        allowTaint: true,
      }).then(canvas => {
        const image = canvas.toDataURL('image/jpeg', 1.0);
        const doc = new jsPDF('p', 'mm', 'a4');
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        // console.log(pageWidth)
        // console.log(pageHeight)

        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        // console.log(canvas.width)
        // console.log(canvas.height)

        // console.log(widthRatio)
        // console.log(widthRatio)
        

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        // console.log(canvasWidth)
        // console.log(canvasHeight)

        const marginX = 0 //(pageWidth - canvasWidth) / 2;
        const marginY = 0 //(pageHeight - canvasHeight) / 2;
        
        // console.log(marginX)
        // console.log(marginY)

        // console.log(image)

        doc.addImage(image, 'JPEG', marginX, marginY, canvasWidth, canvasHeight, null, 'SLOW');
        doc.save(`Carlos_Soriano_${Date.now()}.pdf`);
      });
    }, 250);
  });      
}
