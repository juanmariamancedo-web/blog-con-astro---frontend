import Finish from "../../../components/posts/Finish"
import Categories from "./Categories"
import type { CategoryAndTagMapping } from "../../../models/categoryAndTagMapping"
import { useState, useEffect } from "react"
import usePagination from "../../../hooks/usePagination"

export default function PaginationCategories({categories}: {categories: CategoryAndTagMapping[]}){
    const [querySlice, setQuerySlice] = useState(categories.slice(0, 6))
    const [situation, page, final] = usePagination(querySlice.length)

    useEffect(()=>{
        setQuerySlice(categories.slice((page - 1) * 6, (page - 1) * 6 + 6))
    }, [page])

    return(
        <div className="flex flex-col items-center">
            <div className='container mx-auto px-3 py-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <Categories categories={categories}/>
            </div>
            <Finish ref={final} situation={situation} />
        </div>
    )
}