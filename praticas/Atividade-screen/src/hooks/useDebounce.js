import { useState, useEffect } from 'react';

export default function useDebounce(value, delay = 300) {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);

        // limpeza: cancela o timer anterior se value/delay mudarem
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
}