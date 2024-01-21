import Posts from "./Posts"
import type { Datum } from "../../models/posts"
import { useState, useEffect } from "react"
import Finish from "./Finish"
import usePagination from "../../hooks/usePagination"

export default function PaginationPosts({query} : {query: Datum[]}){
    const [querySlice, setQuerySlice] = useState(query.slice(0, 6))
    const [situation, page, final] = usePagination(query.length)

    useEffect(()=>{
        setQuerySlice(query.slice((page - 1) * 6, (page - 1) * 6 + 6))
    }, [page])

    
    return(
        <div className="flex flex-col items-center">
            <div className='container mx-auto px-3 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Posts query={querySlice}/>
            </div>
            <Finish ref={final} situation={situation} />
        </div>
    )
}