import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { LuZoomIn, LuZoomOut } from 'react-icons/lu';
import { MdFullscreen } from 'react-icons/md';
import { Button } from '../Button';



interface NavProps {
    pageNumber: number;
    numPages: number;
    zoomIn: () => void;
    zoomOut: () => void;
    jumpToPage: (page: number) => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    handleFullScreen?: () => void;
    exitFullScreen?: () => void;
    isFullScreen: boolean;
    lessonId?: number;
}

const Nav: React.FC<NavProps> = ({
    pageNumber,
    numPages,
    zoomIn,
    zoomOut,
    jumpToPage,
    darkMode,
    toggleDarkMode,
    goToNextPage,
    goToPreviousPage,
    handleFullScreen,
    exitFullScreen,
    isFullScreen,
}) => {
    const [pageInput, setPageInput] = useState<string>(pageNumber.toString());

    


    const eachPageTimeRef = useRef<number>(Date.now());

   


   

    useEffect(() => {
        setPageInput(pageNumber.toString());
    }, [pageNumber]);

    const handlePageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageInput(event.target.value);
    };

    const handlePageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        

        const page = parseInt(pageInput, 10);
        if (!isNaN(page)) {
            jumpToPage(page);
        }
    };

  



    

    useEffect(() => {
        eachPageTimeRef.current = Date.now();
    }, [pageNumber]);



    return (
        <nav className="tw-flex tw-sticky tw-top-0 tw-z-20 tw-items-center tw-justify-between tw-px-4 tw-py-2 tw-bg-white dark:tw-bg-gray-800 tw-border-b tw-border-gray-200 dark:tw-border-gray-700">
            <form onSubmit={handlePageSubmit} className="tw-flex tw-items-center">
                <input
                    type="number"
                    min="1"
                    max={numPages}
                    value={pageInput}
                    onChange={handlePageInput}
                    className="tw-w-fit tw-border tw-border-gray-300 dark:tw-border-gray-600 tw-rounded tw-px-2 tw-py-1 tw-text-center tw-bg-white dark:tw-bg-gray-700 tw-text-black dark:tw-text-gray-100"
                />
                <span className="tw-ml-2 tw-mr-3 tw-text-gray-600 dark:tw-text-gray-300">/ {numPages}</span>
                <Button type="submit" variant="blue">
                    Go
                </Button>
            </form>
            <div className="tw-flex tw-items-center tw-gap-x-3">
                <div onClick={zoomIn} className="tw-rounded-full hover:tw-bg-gray-200 tw-p-1.5 tw-cursor-pointer">
                    <LuZoomIn className="tw-text-xl tw-text-color-green tw-font-semibold" />
                </div>
                <div onClick={zoomOut} className="tw-rounded-full hover:tw-bg-gray-200 tw-p-1.5 tw-cursor-pointer">
                    <LuZoomOut className="tw-text-xl tw-text-color-green tw-font-semibold" />
                </div>
            </div>
            <div className="tw-flex tw-items-center tw-gap-x-3">
                <Button
                    handleClick={() => {
                       
                        eachPageTimeRef.current = Date.now();
                        goToPreviousPage();
                    }}
                    isDisable={pageNumber <= 1}
                    variant="red"
                    isFill={false}
                    icon={<FaChevronLeft aria-hidden="true" />}
                >
                    Previous
                </Button>

                <Button
                    handleClick={() => {
                      
                        eachPageTimeRef.current = Date.now();
                        goToNextPage();
                    }}
                    isDisable={pageNumber >= numPages}
                    variant="green"
                    position="right"
                    isFill={false}
                    icon={<FaChevronRight aria-hidden="true" />}
                >
                    Next
                </Button>
            </div>
            <div className="tw-flex tw-items-center tw-gap-x-5">
                <label className="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} className="sr-only" />
                    <div
                        className={`tw-w-11 tw-h-5 tw-rounded-full tw-transition-colors tw-duration-300 ${
                            darkMode ? 'tw-bg-gray-700' : 'tw-bg-gray-300'
                        }`}
                    >
                        <span
                            className={`tw-absolute tw-w-5 tw-h-5 tw-bg-white tw-rounded-full tw-shadow-md tw-flex tw-items-center tw-justify-center tw-transition-transform tw-duration-300 tw-transform ${
                                darkMode ? 'tw-translate-x-6' : 'tw-translate-x-0'
                            }`}
                        >
                            {darkMode ? (
                                // Sun icon for dark mode
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="tw-w-4 tw-h-4 tw-text-yellow-500"
                                >
                                    <path d="M12 2.75a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5A.75.75 0 0112 2.75zm0 15a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zM4.97 4.97a.75.75 0 011.06 0l1.77 1.77a.75.75 0 11-1.06 1.06L4.97 6.03a.75.75 0 010-1.06zm11.19 11.19a.75.75 0 011.06 0l1.77 1.77a.75.75 0 01-1.06 1.06l-1.77-1.77a.75.75 0 010-1.06zM2.75 12a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5H3.5a.75.75 0 01-.75-.75zm15-.75a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5zM6.74 16.72a.75.75 0 010 1.06l-1.77 1.77a.75.75 0 01-1.06-1.06l1.77-1.77a.75.75 0 011.06 0zm11.19-11.19a.75.75 0 010 1.06l-1.77 1.77a.75.75 0 11-1.06-1.06l1.77-1.77a.75.75 0 011.06 0zM12 6.25A5.75 5.75 0 1017.75 12 5.757 5.757 0 0012 6.25z" />
                                </svg>
                            ) : (
                                // Moon icon for light mode
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="tw-w-4 tw-h-4 tw-text-blue-500"
                                >
                                    <path d="M21.752 15.002A9.718 9.718 0 0113 21.75 9.75 9.75 0 116.25 3 9.718 9.718 0 0112.998 1.75a.75.75 0 01.711 1.004 8.25 8.25 0 109.536 9.536.75.75 0 011.004.711z" />
                                </svg>
                            )}
                        </span>
                    </div>
                </label>

                <MdFullscreen
                    onClick={isFullScreen ? exitFullScreen : handleFullScreen}
                    className="tw-text-2xl tw-cursor-pointer tw-text-color-green tw-font-semibold"
                />
            </div>
        </nav>
    );
};

export default React.memo(Nav);
