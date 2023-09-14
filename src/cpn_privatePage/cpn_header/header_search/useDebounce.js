import {
    useEffect,
    useState
} from 'react'


function useDebounce(value, delay) {
    const [deBounce, setDeBounce] = useState(value);

    useEffect(() => {
        const deleteSetTimeout = setTimeout(() => {
            setDeBounce(value);
        }, delay);
        return () => {
            clearTimeout(deleteSetTimeout);
        }
    }, [delay, value]);
    return deBounce;
}


export default useDebounce;