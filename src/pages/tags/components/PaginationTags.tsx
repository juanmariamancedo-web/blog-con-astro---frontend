import Finish from "../../../components/posts/Finish"
import Tags from "./Tags"
import type { TagMapping } from "../../../models/tagMapping"
import { useState, useEffect } from "react"
import usePagination from "../../../hooks/usePagination"

export default function PaginationTags({tags}: {tags: TagMapping[] | undefined[]}){
    const [querySlice, setQuerySlice] = useState(tags.slice(0, 6))
    const [situation, page, final] = usePagination(querySlice.length)

    console.log(querySlice)
    useEffect(()=>{
        setQuerySlice(tags.slice((page - 1) * 6, (page - 1) * 6 + 6))
    }, [page])

    return(
        <div className="flex flex-col items-center">
            <div className='container mx-auto px-3 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Tags tags={tags}/>
            </div>
            <Finish ref={final} situation={situation} />
        </div>
    )
}