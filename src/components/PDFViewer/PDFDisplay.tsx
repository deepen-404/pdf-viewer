import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { Worker } from '@react-pdf-viewer/core';
import { cn } from '../../utils/twmerge';

const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PDFDisplayProps {
  file: File | string | null;
  pageNumber: number;
  zoomLevel: number;
  pageWidth: number;
  darkMode: boolean;
  onDocumentLoadSuccess: (pdf: pdfjs.PDFDocumentProxy) => void;
  as: 'pdf-viewer' | 'certificate-viewer';
}

const PDFDisplay: React.FC<PDFDisplayProps> = React.memo(
  ({
    file,
    pageNumber,
    zoomLevel,
    pageWidth,
    darkMode,
    onDocumentLoadSuccess,
    as,
  }) => {
    const handleContextMenu = (event: React.MouseEvent) => {
      event.preventDefault();
    };

    const [error, setError] = React.useState<Error | null>(null);

    const handleLinkClick = (event: MouseEvent) => {
      if (event.target instanceof HTMLAnchorElement) {
        event.preventDefault();
        const href = event.target.href;
        if (href) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
      }
    };

    if (error) {
      return (
        <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[50vh]">
          <div className="tw-text-center tw-text-red-500 tw-font-bold tw-text-xl">
            {error.message}
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          'tw-flex-1 tw-relative tw-w-full tw-overflow-auto tw-h-full tw-items-center',
          {
            'dark:tw-bg-gray-900': darkMode,
            'tw-bg-gray-200': as === 'pdf-viewer',
          }
        )}
        onContextMenu={handleContextMenu}
        onClick={(event) => handleLinkClick(event as unknown as MouseEvent)}
      >
        <div
          className={`tw-flex tw-justify-center tw-items-center ${darkMode ? 'dark-pdf' : ''}`}
        >
          <Worker workerUrl={pdfWorkerUrl}>
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(error) => {
                setError(error);
              }}
              loading={
                <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[50vh]">
                  Loading...
                </div>
              }
              renderMode="canvas"
            >
              <Page
                pageNumber={pageNumber}
                renderAnnotationLayer
                renderTextLayer
                width={pageWidth * 0.8 * zoomLevel}
                scale={zoomLevel}
              />
            </Document>
          </Worker>
          <style>{`
              .dark-pdf canvas {
                  filter: invert(1) hue-rotate(180deg);
              }
          `}</style>
        </div>
      </div>
    );
  }
);

export default PDFDisplay;
