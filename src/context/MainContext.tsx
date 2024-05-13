import { createContext, FC, ReactNode, useState } from 'react';
import { ContextType, IContext } from './ContextProps';

export const MainContext = createContext<ContextType | null>(null);

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [context, setContext] = useState<IContext>(
        {
            country: 'US',
            language: 'English'
        }
    );

    const saveContext = (data: IContext) => {
        if (data.country !== context.country) {
            const contextData: IContext = {
                country: data.country,
                language: data.language
            }
            setContext(contextData);
        }
    }
    
    return(
        <MainContext.Provider value={{ context, saveContext }}>
            {children}
        </MainContext.Provider>
    )
}

export default ContextProvider;
