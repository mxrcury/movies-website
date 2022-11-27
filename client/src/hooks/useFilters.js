import { useState } from 'react';

const useFilters = (filters) => {

    const [ page, setPage ] = useState(1)

    const handlePage = (event,page) => {
        setPage(page)
    }

    return {
        page,
        handlePage
    }

}

export default useFilters