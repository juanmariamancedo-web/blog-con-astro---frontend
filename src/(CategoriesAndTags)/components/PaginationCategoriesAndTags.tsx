import Finish from "../../components/posts/Finish"
import CategoriesAndTags from "./CategoriesAndTags"
import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"
import { useState, useEffect, useRef } from "react"
import usePagination from "../../hooks/usePagination"

export default function PaginationCategoriesAndTags({docs, slug}: {docs: CategoryAndTagMapping[], slug: string}){
    const [querySlice, setQuerySlice] = useState(docs.slice(0, 6))
    const [situation, page, final] = usePagination(querySlice.length)

    useEffect(()=>{
        setQuerySlice(docs.slice((page - 1) * 6, (page - 1) * 6 + 6))
    }, [page])

    return(
        <div className="flex flex-col items-center">
            <div className='container mx-auto px-3 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <CategoriesAndTags slug={slug} docs={docs}/>
            </div>
            <Finish ref={final} situation={situation} />
        </div>
    )
}