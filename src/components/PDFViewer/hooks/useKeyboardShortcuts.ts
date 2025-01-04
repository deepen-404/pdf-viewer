import { useEffect } from 'react';

export function useKeyboardShortcuts(
    setZoomLevel: React.Dispatch<React.SetStateAction<number>>,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    numPages: number,
) {
    // Zoom Level State (optional, if needed inside the hook)
    // const [zoomLevel, setZoomLevel] = useState<number>(1);

    const zoomIn = () => {
        setZoomLevel((prev) => Math.min(prev + 0.1, 2));
    };

    const zoomOut = () => {
        setZoomLevel((prev) => Math.max(prev - 0.1, 0.5));
    };

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    };

    const goToNextPage = () => {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    };

    const goToPreviousPage = () => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === '+') {
                event.preventDefault();
                zoomIn();
            } else if (event.ctrlKey && event.key === '-') {
                event.preventDefault();
                zoomOut();
            } else if (event.key === 'F11' || (event.ctrlKey && event.shiftKey && event.key.toUpperCase() === 'F')) {
                event.preventDefault();
                toggleFullScreen();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                goToNextPage();
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goToPreviousPage();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [zoomIn, zoomOut, toggleFullScreen, goToNextPage, goToPreviousPage]);

    return {
        zoomIn,
        zoomOut,
        toggleFullScreen,
        goToNextPage,
        goToPreviousPage,
    };
}
