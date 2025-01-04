import React from 'react';
import { LuChevronDown } from 'react-icons/lu';

/* eslint-disable */


export type ButtonVariant = 'primary' | 'yellow' | 'green' | 'red' | 'blue' | 'neutral' | 'none';

export interface ButtonProps {
    className?: string;
    text?: string;
    handleClick?: any;
    isloading?: boolean;
    style?: any;
    isDisable?: boolean;
    isCircular?: boolean;
    icon?: any;
    variant?: ButtonVariant;
    isFill?: boolean;
    isDropdown?: boolean;
    position?: string;
    type?: any;
    children?: React.ReactNode;
    cursorPointer?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    text,
    handleClick,
    isloading = false,
    style,
    isDisable = false,
    isCircular = false,
    icon,
    isFill = true,
    variant = 'primary',
    isDropdown = false,
    position = 'left',
    type,
    children,
    cursorPointer = true,
}) => {
    const getVariantStyles = (variant: ButtonVariant) => {
        switch (variant) {
            case 'yellow':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-color-yellow hover:tw-bg-white ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-yellow-500/50'}   hover:tw-text-color-yellow tw-bg-color-yellow tw-text-white`
                    : `tw-border tw-border-color-yellow tw-text-color-yellow ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-yellow-500/50'}  hover:tw-bg-color-yellow hover:tw-text-white`;
            case 'green':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-color-green hover:tw-bg-white hover:tw-text-color-green ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-green-500/50'}  tw-bg-color-green tw-text-white`
                    : `tw-border tw-border-color-green tw-text-color-green  ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-green-500/50'} hover:tw-bg-color-green hover:tw-text-white`;
            case 'red':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-color-red hover:tw-bg-white ${isDisable ? '' : 'hover:tw-shadow-lg hover:tw-shadow-red-500/50'}   hover:tw-text-color-red tw-bg-color-red tw-text-white`
                    : `tw-border tw-border-color-red tw-text-color-red ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-red-500/50'}  hover:tw-bg-color-red hover:tw-text-white`;
            case 'blue':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-color-blue ${isDisable ? '' : 'hover:tw-shadow-lg hover:tw-shadow-blue-500/50'}   hover:tw-bg-white hover:tw-text-color-blue tw-bg-color-blue tw-text-white`
                    : `tw-border tw-border-color-blue tw-text-color-blue ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-blue-500/50'}  hover:tw-bg-color-blue hover:tw-text-white`;
            case 'primary':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-primary ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-primary/50'}  hover:tw-bg-white hover:tw-text-primary tw-bg-primary tw-text-white`
                    : `tw-border tw-border-primary tw-text-primary ${isDisable ? '' : 'hover:tw-shadow-lg hover:tw-shadow-primary/50'}   hover:tw-bg-primary hover:tw-text-white`;

            case 'neutral':
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-neutral hover:tw-bg-white hover:tw-text-black ${isDisable || !cursorPointer ? '' : 'hover:tw-shadow-lg hover:tw-shadow-gray-500/50'}  tw-bg-neutral tw-text-black`
                    : `tw-border tw-border-neutral tw-text-black hover:tw-bg-neutral ${isDisable || !cursorPointer ? '' : ' hover:tw-shadow-lg hover:tw-shadow-gray-500/50'}  hover:tw-text-black`;
            case 'none':
                return '';
            default:
                return isFill
                    ? `hover:tw-border tw-border-transparent tw-border hover:tw-border-primary hover:tw-bg-white hover:tw-text-primary ${isDisable ? '' : ' hover:tw-shadow-lg hover:tw-shadow-primary-500/50'}  tw-bg-primary tw-text-white`
                    : `tw-border tw-border-primary tw-text-primary hover:tw-bg-primary ${isDisable ? '' : 'hover:tw-shadow-lg hover:tw-shadow-primary-500/50'}   hover:tw-text-white`;
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isloading ? true : false || isDisable}
            style={style}
            type={type}
            className={`${getVariantStyles(variant)}  ${!cursorPointer || isDisable ? 'tw-cursor-not-allowed tw-opacity-50' : 'tw-cursor-pointer tw-opacity-100'} tw-font-medium  tw-text-[13px] tw-text-center tw-transition-all tw-ease-out tw-duration-300 ${isDropdown ? 'tw-px-2 tw-pl-4 tw-flex tw-justify-end tw-items-center tw-gap-x-3' : `tw-px-3 tw-flex tw-items-center tw-justify-center ${text || children ? 'tw-gap-x-2' : 'tw-gap-x-0'}`} tw-py-[5px] ${isCircular ? 'tw-rounded-full' : 'tw-rounded-md'} ${className}`}
        >
            {isloading ? (
                <div className="tw-flex tw-items-center tw-gap-x-1">
                    <svg
                        className={`tw-mr-3 tw-h-5 tw-w-5 tw-animate-spin tw-text-gray-300`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <p  className="tw-text-gray-300">
                        Loading...
                    </p>
                </div>
            ) : (
                <div className="tw-flex tw-items-center tw-justify-center tw-gap-2">
                    {icon && position === 'left' && <p>{icon}</p>}
                    {(text || children) && <p>{text || children}</p>}

                    {icon && position === 'right' && <p>{icon}</p>}
                    {isDropdown && <LuChevronDown className="tw-text-lg tw-font-semibold" />}
                </div>
            )}
        </button>
    );
};
