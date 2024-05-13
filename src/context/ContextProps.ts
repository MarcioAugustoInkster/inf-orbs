export type IContext = {
    country: string;
    language: string;
}

export type ContextType = {
    context: IContext;
    saveContext: (context: IContext) => void;
}
