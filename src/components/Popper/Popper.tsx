import { FC } from 'react';
import { Popper as MuiPopper } from '@mui/base/Popper';
import { PopperPropis } from './PopperPropis';

const Popper: FC<PopperPropis> = ((props) => {
    const { id, open, anchorEl, children } = props;
    
    return (
        <>
            <MuiPopper
                id={id}
                open={open === undefined ? false : open}
                anchorEl={anchorEl}
                className={`${''}`}
                disablePortal={true}
            >
                <div className="rounded-lg font-medium font-sans text-sm m-1 p-2 z-50 border border-solid border-slate-200 bg-white shadow-md text-slate-900">
                    {children}
                </div>
            </MuiPopper>
        </>
    );
});

export default Popper;
