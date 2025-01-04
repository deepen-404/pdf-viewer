
import { useState } from 'react';
import PDFViewer from './components/PDFViewer'


function App() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className='tw-flex tw-flex-col tw-h-full tw-w-full tw-items-center tw-justify-center tw-min-h-[100vh]'>
    <input type="file" onChange={(e) => setFile(e?.target?.files?.[0] ?? null)} />
   <div className='tw-w-4/5'>
   {file && <PDFViewer fullScreen={true} file={file} />}
   </div>
    </div>
  )
}

export default App
