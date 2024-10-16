export const useStorage = () => {
    const getItem = (key: string) => {
        return typeof key === 'string' ?
            localStorage.getItem(key)
            : null;
    };

    const setItem = (key: string, value: string) => {
        if (typeof key === 'string' && typeof value === 'string') {
            localStorage.setItem(key, value);
        } else {
            throw new Error('Key and value must be strings');
        }
    }

    return {
        getLocalStorage: getItem,
        setLocalStorage: setItem
    }
}

