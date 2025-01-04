import { useState, useEffect } from 'react';


export function usePDFReaderStorage(pdfId: string, ) {
    const [pageNumber, setPageNumber] = useState<number>(1);

    /* Generate storage keys based on pdfId */
    const lastPageKey = `lastPage_${pdfId}`;

    /* Load last page and pages visited from storage on mount or when pdfId changes */
    useEffect(() => {
        const lastPage = JSON.parse(localStorage?.getItem(lastPageKey) || '{}');

        if (lastPage?.userId && lastPage?.pageNumber && lastPage?.pdfId) {
            setPageNumber(parseInt(lastPage?.pageNumber, 10));
        } else {
            /* Reset to first page if no saved page */
            setPageNumber(1);
        }

    }, [lastPageKey]);

    

    return {
        pageNumber,
        setPageNumber,
    };
}
