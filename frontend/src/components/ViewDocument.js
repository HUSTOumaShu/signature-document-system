import { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const ViewDocument = () => {
    const viewer = useRef(null);

    useEffect(() => {
        WebViewer(
            {
                path: '/webviewer/lib',
                licenseKey:
                    'demo:1711275376590:7f0c56cd030000000060525107bc85911c3dfb4a55f44d650263ca8942',
                initialDoc: '/files/sdms_system.pdf',
            },
            viewer.current,
        ).then(async (instance) => {
            const { documentViewer, annotationManager, Annotations } =
                instance.Core;

            documentViewer.addEventListener('documentLoaded', () => {
            });
        });
    }, []);

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
