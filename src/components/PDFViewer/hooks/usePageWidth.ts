import { useState, useEffect } from 'react';

export function usePageWidth(ref: React.RefObject<HTMLDivElement>) {
    const [pageWidth, setPageWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const updatePageWidth = () => {
            if (ref.current) {
                setPageWidth(ref.current.offsetWidth);
            } else {
                setPageWidth(window.innerWidth);
            }
        };
        window.addEventListener('resize', updatePageWidth);
        updatePageWidth();

        return () => {
            window.removeEventListener('resize', updatePageWidth);
        };
    }, [ref]);

    return pageWidth;
}
