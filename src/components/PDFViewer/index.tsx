import { useState, useRef, useCallback, useEffect } from 'react';
import { pdfjs } from 'react-pdf';

/* eslint-disable */



import Nav from './Nav';
import PDFDisplay from './PDFDisplay';
import { useDarkMode } from './hooks/useDarkMode';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { usePDFReaderStorage } from './hooks/usePDFReaderStorage';
import { usePageWidth } from './hooks/usePageWidth';
import { cn } from '../../utils/twmerge';

const pdfWorkerUrl = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

interface PDFViewerProps {
    file: File;
    fullScreen?: boolean;
    as?: 'pdf-viewer' | 'certificate-viewer';
}

export interface IPdfProgress {
    pageNo: number;
    timeSpent: number;
}

interface IAttemptDetails {
    attemptId: number;
    timeSpent: number;
    idleTime: number;
}
export interface IVideoMetadata {
    peopleId: number;
    totalPage: number;
    lessonId?: number;
    pdfProgress: IPdfProgress[];
    attemptDetails: IAttemptDetails;
}

function PDFViewer({ file,  fullScreen = true, as = 'pdf-viewer' }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [zoomLevel, setZoomLevel] = useState<number>(1);
    const [_metaData, setMetaData] = useState<any>(null);

    const [darkMode, setDarkMode] = useDarkMode();
    const [isFullScreen, setIsFullScreen] = useState<boolean>(fullScreen);

    const pdfId = file?.name


    const pdfRef = useRef<HTMLDivElement>(null);
    const pageWidth = usePageWidth(pdfRef);

    const handleFullScreen = () => {
        if (pdfRef.current) {
            if (pdfRef.current.requestFullscreen) {
                pdfRef.current.requestFullscreen();
            } else if ((pdfRef.current as any).webkitRequestFullscreen) {
                (pdfRef.current as any).webkitRequestFullscreen();
            } else if ((pdfRef.current as any).msRequestFullscreen) {
                (pdfRef.current as any).msRequestFullscreen();
            }
            setIsFullScreen(true);
        }
    };


    useEffect(() => {
        if(fullScreen){
            setIsFullScreen(true);
            handleFullScreen?.();
        }
    }, [fullScreen]);

    const exitFullScreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        }
        setIsFullScreen(false);
    };

    const { pageNumber, setPageNumber } = usePDFReaderStorage(pdfId);

    const { zoomIn, zoomOut, goToNextPage, goToPreviousPage } = useKeyboardShortcuts(
        setZoomLevel,
        setPageNumber,
        numPages,
    );

    const onDocumentLoadSuccess = useCallback((pdf: pdfjs.PDFDocumentProxy) => {
        setNumPages(pdf.numPages);

        pdf.getMetadata().then((data) => {
            setMetaData(data);
        });
    }, []);

    const jumpToPage = useCallback(
        (page: number) => {
            if (page >= 1 && page <= numPages) {
                setPageNumber(page);
            }
        },
        [numPages],
    );

    useEffect(() => {
        fullScreen && handleFullScreen();
    }, [fullScreen, file]);

    useEffect(() => {
        _metaData?.info?.Producer?.includes('PowerPoint') ||
        _metaData?.info?.Producer?.includes('iLovePDF') ||
        _metaData?.info?.Creator?.includes('Canva')
            ? setZoomLevel(1.1)
            : setZoomLevel(1);
    }, [_metaData]);

    useEffect(() => {
        const handleFullScreenChange = () => {
            const isFull = !!(
                document.fullscreenElement ||
                (document as any).webkitFullscreenElement ||
                (document as any).msFullscreenElement
            );
            setIsFullScreen(isFull);
        };

        document.addEventListener('fullscreenchange', handleFullScreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullScreenChange); 
        document.addEventListener('msfullscreenchange', handleFullScreenChange); 

        return () => {
            document.removeEventListener('fullscreenchange', handleFullScreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullScreenChange);
            document.removeEventListener('msfullscreenchange', handleFullScreenChange);
        };
    }, []);

    const toggleDarkMode = useCallback(() => {
        setDarkMode((prev) => !prev);
    }, []);

   

    return (
        <div className={cn('tw-flex tw-flex-col tw-h-full tw-w-full tw-relative')} ref={pdfRef}>
            {as === 'pdf-viewer' && (
                <Nav
                    pageNumber={pageNumber}
                    numPages={numPages}
                    zoomIn={zoomIn}
                    zoomOut={zoomOut}
                    jumpToPage={jumpToPage}
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    handleFullScreen={handleFullScreen}
                    exitFullScreen={exitFullScreen}
                    isFullScreen={isFullScreen}
                />
            )}
            <PDFDisplay
                as={as}
                file={file}
                pageNumber={pageNumber}
                zoomLevel={zoomLevel}
                pageWidth={pageWidth}
                darkMode={as === 'pdf-viewer' ? darkMode : false}
                onDocumentLoadSuccess={onDocumentLoadSuccess}
            />
        </div>
    );
}

export default PDFViewer;
