import { FC, useMemo } from "react";
import { BodyRowProps, ClubViewProps, HeadRowProps, TableProps } from "./TableDynamicProps";
import { twMerge } from "tailwind-merge";

const ClubView: FC<ClubViewProps> = ((props) => {
    const { name, image } = props;

    return(
        <div className="flex items-center gap-4 py-0.5">
            <div className="w-6">
                <img src={image} alt={name} width="100%" height="100%" />
            </div>
            <span className="block text-lg font-semibold font-sans text-slate-600">
                {name}
            </span>
        </div>
    )
});

const HeadRow: FC<HeadRowProps> = ((props) => {
    const { label, size } = props;

    return(
        <div className={twMerge("bg-white", size)}>
            <span className={twMerge("block text-center text-sm text-slate-500 uppercase",
                (label.length === 0) ? 'py-3' : '')}
            >
                {label}
            </span>
        </div>
    )
});

const BodyRow: FC<BodyRowProps> = ((props) => {
    const { content, polarity, size } = props;

    const polarityStyle = useMemo(() => {
        return polarity ?
            typeof(content) === 'number'
                ? content < 0
                    ? 'text-red-500'
                    : content > 0
                        ? 'text-green-500'
                        : 'text-slate-800'
                : ''
            : 'text-slate-600';
    }, [polarity, content]);

    return(
        <div className={twMerge("bg-white", size)}>
            <span className={twMerge("block text-center", polarityStyle)}>
                {content}
            </span>
        </div>
    )
});

const TableDynamic: FC<TableProps> = (({ season, clubs }) => {
    const headers = [
        { label: "", size: "w-16" },
        { label: "", size: "w-full" },
        { label: "MP", size: "w-1/12" },
        { label: "W", size: "w-1/12" },
        { label: "D", size: "w-1/12" },
        { label: "L", size: "w-1/12" },
        { label: "GS", size: "w-1/12" },
        { label: "GA", size: "w-1/12" },
        { label: "GD", size: "w-1/12" },
        { label: "Pts", size: "w-1/12" },
    ];
    
    return (
        <div className="">
            <span className="block text-center text-xl">
                Season: {season}
            </span>
            <div className="pt-4 bg-white">
                <div className="flex items-center border-b border-slate-400">
                    {headers.map((item, index) => (
                        <HeadRow key={index} label={item.label} size={item.size} />
                    ))}
                </div>
                {clubs?.sort((a, b) =>
                    (b.points - a.points) ||
                    (b.difference - a.difference) ||
                    (b.goalsScored - a.goalsScored) ||
                    (a.name.normal.localeCompare(b.name.normal))).map((data, index) => (
                    <div className="flex items-center bg-white border-b border-slate-300" key={index}>
                        <BodyRow content={(index + 1)} size="w-16" />
                        <BodyRow
                            content={(
                                <ClubView name={data.name.normal} image={data.image} />
                            )}
                            size="w-full"
                        />
                        <BodyRow content={data.matches} size="w-1/12" />
                        <BodyRow content={data.wins} size="w-1/12" />
                        <BodyRow content={data.draws} size="w-1/12" />
                        <BodyRow content={data.losses} size="w-1/12" />
                        <BodyRow content={data.goalsScored} size="w-1/12" />
                        <BodyRow content={data.goalsAgainst} size="w-1/12" />
                        <BodyRow content={data.difference} size="w-1/12" polarity />
                        <BodyRow content={data.points} size="w-1/12" />
                    </div>
                ))}
            </div>
        </div>
    )
});

export default TableDynamic;
