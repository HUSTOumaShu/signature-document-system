const fs = require('fs-extra')

const copyWebViewerFiles = async () => {
    try {
        await fs.copy('../node_modules/@pdftron/webviewer/public', '../public/webviewer/lib');
        console.log('WebViewer files copied successfully')
    } catch(err) {
        console.error(err)
    }
}

copyWebViewerFiles()