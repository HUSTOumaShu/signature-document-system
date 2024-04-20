import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

export const mergeAnnotations = async (docRef, xfdf) => {
    const Core = window.Core;
    const PDFNet = window.Core.PDFNet;
    Core.setWorkerPath('../../../lib/core');

    const URL = await getDownloadURL(ref(storage, docRef));

    const main = async () => {
        const doc = await PDFNet.PDFDoc.createFromURL(URL);
        doc.initSecurityHandler();
        
        let i;
        for(i = 0; i < xfdf.length; i++) {
            console.log(xfdf[i]);
            let fdfDoc = await PDFNet.FDFDoc.createFromXFDF(xfdf[i]);
            await doc.fdfMerge(fdfDoc);
            await doc.flattenAnnotations();
        }

        const docbuf = await doc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);
        const blob = new Blob([docbuf], {type: 'application/pdf'});
        const documentRef = ref(storage, docRef);
        documentRef.put(blob).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

        await PDFNet.runWithCleanup(main);
    }
}
