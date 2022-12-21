

export function numberify(param: string): number | undefined {
    return param.match(/^(\+|-)?\d*\.?\d+$/) ? +param : undefined;
}

export function functionify<FuncType>(param: unknown) : FuncType | undefined {
    return typeof param === "function" ? param as FuncType : undefined;
    
}
