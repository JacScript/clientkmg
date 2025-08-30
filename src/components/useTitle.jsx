import React, {useEffect} from 'react';

const useTitle = (title) => {
    useEffect(() => {
        document.title = `KM GROUP - ${title}`; 
    },[]);
}

export default useTitle;

