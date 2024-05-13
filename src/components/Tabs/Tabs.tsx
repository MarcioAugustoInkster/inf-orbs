import { forwardRef } from 'react';
import { TabsList as MuiTabsList, TabsListProps } from '@mui/base/TabsList';
import { TabPanel as MuiTabPanel, TabPanelProps } from '@mui/base/TabPanel';
import { Tab as MuiTab, TabProps } from '@mui/base/Tab';
import { twMerge } from 'tailwind-merge';

const resolveSlotProps = (fn: any, args: any) => typeof fn === 'function' ? fn(args) : fn;

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
    const { className, ...other } = props;
    return (
        <MuiTabsList
            ref={ref}
            className={twMerge(
                'mb-0 rounded-t-lg bg-slate-800 flex font-sans items-center justify-center content-between min-w-tabs-list shadow-lg',
                className,
            )}
            {...other}
        />
    );
});

export const Tab = forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
    return (
        <MuiTab
            ref={ref}
            {...props}
            slotProps={{
                ...props.slotProps,
                root: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.root,
                        ownerState,
                    );
                    return {
                        ...resolvedSlotProps,
                        className: twMerge(
                            `font-sans ${ownerState.selected
                                ? 'text-slate-800 bg-white'
                                : 'text-white bg-transparent focus:text-white hover:bg-slate-800'
                            } ${ownerState.disabled
                                ? 'cursor-not-allowed opacity-50'
                                : 'cursor-pointer'
                            } text-sm leading-[1.3] font-semibold w-full py-2.5 px-3 m-1.5 border-0 rounded-lg flex justify-center focus:outline-0 focus:shadow-outline-slate-light`,
                            resolvedSlotProps?.className,
                        ),
                    };
                },
            }}
        />
    );
});

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props, ref) => {
    const { className, ...other } = props;
    return (
        <MuiTabPanel
            ref={ref}
            className={twMerge(
                'py-2 px-2 md:py-6 md:px-4 bg-slate-600 border border-solid border-slate-500 rounded-b-xl rounded-t-sm w-full font-sans text-sm',
                className,
            )}
            {...other}
        />
    );
});
