import { useState } from "react"

const useBoolean = (initial = false) => {
    const [value, setValue] = useState(initial)
    const toggle = () => {
        setValue(!value)
    }
    const setTrue = () => {
        setValue(true)
    }
    const setFalse = () => {
        setValue(false)
    }
    return {
        value,
        setValue,
        toggle,
        setTrue,
        setFalse
    }
}

export default useBoolean;