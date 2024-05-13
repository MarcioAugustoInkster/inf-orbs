export interface IndicatorProps {
    toggled?: boolean;
}

export interface AccordionListProps {
    label?: string
    link?: string
}

export type AccordionItemProps = {
    id?: number,
    title?: string,
    list?: AccordionListProps[],
    toggled: boolean
}

export type AccordionProps = {
    items?: AccordionItemProps[],
    keepOthersOpen: boolean
}
