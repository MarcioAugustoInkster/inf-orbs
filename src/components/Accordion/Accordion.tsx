import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AccordionItemProps, AccordionProps, IndicatorProps } from "./AccordionProps";

const AccordionIndicator: FC<IndicatorProps> = ({ toggled }) => {
    return(
        <div className="direction-indicator flex items-center justify-center w-6 text-white font-bold text-2xl">
            {toggled
            ? <i className="bi bi-dash"></i>
            : <i className="bi bi-plus"></i>}
        </div>
    )
}

const Accordion: FC<AccordionProps> = ({ items, keepOthersOpen }) => {
    const [accordionItems, setAccordionItems] = useState<AccordionItemProps[]>([]);

    const handleAccordionToggle = (item: AccordionItemProps) => {
        setAccordionItems([
            ...accordionItems.map((accordion) => {
                let toggled = item.toggled;
                if (item.id === accordion.id) {
                    toggled = !accordion.toggled;
                } else if (!keepOthersOpen) {
                    toggled = false;
                }
                return {
                    ...accordion,
                    toggled
                }
            })
        ]);
    }

    useEffect(() => {
        if (items) {
            setAccordionItems([
                ...items.map(item => ({
                    ...item,
                    toggled: false
                }))
            ]);
        }
    }, [items]);

    return (
        <div className="accordion-parent flex flex-col items-center p-2 shadow-sm rounded-sm border border-slate-400">
            {accordionItems?.map((item, index) =>
                <div key={index} className={`accordion flex flex-col w-full border border-slate-400 my-1 bg-indigo-900 rounded-sm focus:bg-indigo-400${item.toggled ? 'toggled' : ''}`}>
                    <button
                        className="toggle flex items-center justify-between text-md p-2 b-0 bg-transparent cursor-pointer focus:bg-indigo-600 hover:bg-indigo-700 hover:text-slate-600"
                        onClick={() => handleAccordionToggle(item)}
                    >
                        <h6 className="text-white font-bold text-xl uppercase">{item.title}</h6>
                        <AccordionIndicator toggled={item.toggled} />
                    </button>
                    <div className={`content-parent max-h-0 bg-indigo-100 overflow-hidden transition-[max-height] ease-out delay-100 ${item.toggled ? ' max-h-96 ease-in delay-200' : ''}`}>
                        <div className="content bg-transparent py-1 m-2">
                            {item.list?.length !== 0 &&
                                <ol>
                                    {item.list?.map((li, key) =>
                                        <li key={key} className="rounded-lg border border-slate-300 my-2">
                                            <Link to={`${li.link}`} className="inline-block font-bold uppercase text-lg w-full text-center py-2 px-4 bg-emerald-400 rounded-lg hover:text-white hover:bg-emerald-600 active:bg-emerald-600 active:text-white">{li.label}</Link>
                                        </li>
                                    )}
                                </ol>
                            }
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Accordion;
