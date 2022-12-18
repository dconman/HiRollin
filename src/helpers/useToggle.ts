import { useCallback, useState } from "react";

function useToggle(initialState: boolean | (() => boolean)) : [boolean, () => void, () => void, () => void] {
    const [value, setValue] = useState(initialState);
    const setTrue = useCallback(() => setValue(true), [setValue]);
    const setFalse = useCallback(() => setValue(false), [setValue]);
    const toggle = useCallback(() => setValue(!value), [value, setValue]);
    return [value, setTrue, setFalse, toggle];
}

export default useToggle;
