import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';
import { useSelector } from 'react-redux';
import { selectDocToView } from './ViewDocumentSlice';

const ViewDocument = () => {
    const [instance, setInstance] = useState(null);

    const doc = useSelector(selectDocToView);
    const {docRef, searchTerm, pageNumber} = doc;

    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/',
                licenseKey:
                    'demo:1711275376590:7f0c56cd030000000060525107bc85911c3dfb4a55f44d650263ca8942',
            },
            viewer.current,
        ).then(async (instance) => {
            setInstance(instance);
            const {documentViewer, Search} = instance.Core;

            // load document
            const storageRef = storage.ref();
            const URL = await storageRef.child(docRef).getDownloadURL();
            documentViewer.loadDocument(URL);

            // search
            documentViewer.addEventListener('documentLoaded', async () => {
                if(searchTerm){

                } else if(pageNumber){
                    documentViewer.setCurrentPage(pageNumber);
                }
            });
        }, []);
    });
    return (
        <div className="MyComponent">
            <div className="header">Sample</div>
            <div
                className="webviewer"
                ref={viewer}
                style={{ height: '100vh' }}
            ></div>
        </div>
    );
};

export default ViewDocument;
