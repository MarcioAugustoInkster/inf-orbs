import { FC, useMemo } from "react";
import { IconProps } from "./Icon.interface";
import { twMerge } from "tailwind-merge";

const Icon: FC<IconProps> = ({ icon, color, size = 'sm' }) => {
    const colors = useMemo(() => {
        switch(color) {
            case 'primary':
                return 'text-purple-500';
            case 'secondary':
                return 'text-cyan-500';
            case 'success':
                return 'text-green-500';
            case 'info':
                return 'text-blue-500';
            case 'warning':
                return 'text-yellow-400';
            case 'danger':
                return 'text-red-500';
            case 'white':
                return 'text-white';
            case 'black':
                return 'text-black';
            default:
                return 'text-slate-800';
        }
    }, [color]);
    
    const sizes = useMemo(() => {
        switch(size) {
            case 'sm':
                return 'text-lg';
            case 'lg':
                return 'text-2xl';
            case 'xl':
                return 'text-3xl';
            default:
                return 'text-xl';
        }
    }, [size]);

    return <i className={twMerge(`bi bi-${icon}`, sizes, colors)}></i>
}

export default Icon;
