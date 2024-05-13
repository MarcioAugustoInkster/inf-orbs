import {  } from 'react';
import graphicData from './graphics.json';

const Graphics = () => {
    const graphics = graphicData.data;

    return (
        <div className="my-4">
            <div className="flex justify-center gap-1 bg-indigo-950 py-2">
                {graphics.map((item, index) => (
                    <div className="flex flex-col space-y-0.5 p-0.5 bg-yellow-500" key={index}>
                        {item.goals.sort((a, b) => a.time - b.time).map((time, key) => (
                            <div className="flex" key={key}>
                                <div className="w-10 bg-blue-600 p-0.5">
                                    <span className="block text-center text-white text-sm leading-3">
                                        {time.time}'
                                    </span>
                                </div>
                                <div className="w-10 bg-white p-0.5">
                                    <strong className="block text-center text-sm font-bold leading-3">
                                        x
                                    </strong>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Graphics;
