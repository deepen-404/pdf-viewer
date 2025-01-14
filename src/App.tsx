import { useRef, useState } from 'react';
import PDFViewer from './components/PDFViewer';
import { Button } from './components/Button';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-items-center tw-justify-center tw-bg-gray-900 tw-py-10 ">
      <div className="tw-flex tw-flex-col tw-items-center tw-gap-6">
        {/* Input Section */}
        <Button handleClick={() => inputRef?.current?.click()} variant="green">
          Select Pdf
        </Button>
        <input
          type="file"
          accept=".pdf"
          className="tw-hidden"
          ref={inputRef}
          onChange={(e) => setFile(e?.target?.files?.[0] ?? null)}
        />

        {/* File Name */}
        {file && (
          <p className="tw-text-gray-300 tw-text-sm tw-font-medium">
            Selected file: <span className="tw-text-gray-100">{file.name}</span>
          </p>
        )}

        {/* PDF Viewer */}
        {file && <PDFViewer file={file} />}
      </div>
    </div>
  );
}

export default App;
