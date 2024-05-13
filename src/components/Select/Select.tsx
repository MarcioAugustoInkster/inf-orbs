import { ForwardedRef, forwardRef } from 'react';
import { Select as MuiSelect, SelectRootSlotProps, SelectProps } from '@mui/base/Select';
import { Option as MuiOption, OptionProps, OptionOwnerState } from '@mui/base/Option';
import { twMerge } from 'tailwind-merge';

const getOptionColorClasses = ({ selected, highlighted, disabled }: Partial<OptionOwnerState<number>>) => {
    let classes = '';
    if (disabled) {
        classes += 'text-slate-400';
    } else {
        if (selected) {
            classes += ' bg-red-100 text-red-950';
        } else if (highlighted) {
            classes +=' bg-slate-100 text-slate-900';
        }
        classes += ' hover:bg-indigo-100 hover:text-indigo-900';
    }
    return classes;
};

export const Option = forwardRef<HTMLLIElement, OptionProps<string>>((props, ref) => {
    return (
        <MuiOption
            ref={ref}
            {...props}
            slotProps={{
                root: ({ selected, highlighted, disabled }) => ({
                    className: `flex items-center list-none px-0 py-1 rounded-sm cursor-default last-of-type:border-b-0 cursor-pointer ${getOptionColorClasses(
                        { selected, highlighted, disabled },
                    )}`,
                }),
            }}
        />
    );
});

export const Button = forwardRef(function Button<TValue extends object, Multiple extends boolean>(
    props: SelectRootSlotProps<TValue, Multiple>,
    ref: ForwardedRef<HTMLButtonElement>
) {
    const { ownerState, ...other } = props;
    return (
        <button type="button" className={ownerState.className} {...other} ref={ref}>
            {other.children}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M11.475 14.475L7.85 10.85q-.075-.075-.112-.162T7.7 10.5q0-.2.138-.35T8.2 10h7.6q.225 0 .363.15t.137.35q0 .05-.15.35l-3.625 3.625q-.125.125-.25.175T12 14.7q-.15 0-.275-.05t-.25-.175Z"/>
            </svg>
        </button>
    );
});

const resolveSlotProps = (fn: any, args: object) => typeof fn === 'function' ? fn(args) : fn;

export const Select = forwardRef(function CustomSelect<TValue extends string, Multiple extends boolean>(
    props: SelectProps<TValue, Multiple>,
    ref: ForwardedRef<HTMLButtonElement>
    ) {
    return (
        <MuiSelect
            ref={ref}
            {...props}
            slots={{
                root: Button,
                ...props.slots,
            }}
            className={twMerge('CustomSelect', props.className)}
            slotProps={{
                ...props.slotProps,
                root: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.root,
                        ownerState
                    );
                    return {
                        ...resolvedSlotProps,
                        className: twMerge(
                            `relative text-sm font-sans box-border w-32 px-2 py-1 rounded-sm text-left bg-white border border-solid border-slate-300 text-slate-900 transition-all hover:bg-slate-50 outline-0 shadow-[0_2px_4px_rgb(0_0_0/_0.05)] ${ownerState.focusVisible
                                ? 'border-purple-400 shadow-outline-purple'
                                : ''
                            } [&>svg]:text-base	[&>svg]:absolute [&>svg]:h-full [&>svg]:top-0 [&>svg]:right-0`,
                            resolvedSlotProps?.className
                        )
                    };
                },
                listbox: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.listbox,
                        ownerState
                    );
                    return {
                        ...resolvedSlotProps,
                        className: twMerge(
                            `text-sm font-sans p-1 mt-3 w-44 rounded-sm overflow-auto outline-0 bg-white border border-solid border-slate-200 text-slate-900 shadow shadow-slate-200`,
                            resolvedSlotProps?.className
                        )
                    };
                },
                popper: (ownerState) => {
                    const resolvedSlotProps = resolveSlotProps(
                        props.slotProps?.popper,
                        ownerState
                    );
                    return {
                        ...resolvedSlotProps,
                        className: twMerge(`z-10`, resolvedSlotProps?.className)
                    };
                }
            }}
        />
    );
});
