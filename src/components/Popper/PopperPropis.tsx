import { ReactNode } from "react"

export type PopperPropis = {
    id?: string,
    open: boolean,
    anchorEl: HTMLElement | null,
    children?: ReactNode,
}

export type PopperStatsPropis = {
    count: number,
    element: {
        code: number;
        result: string;
    },
}
