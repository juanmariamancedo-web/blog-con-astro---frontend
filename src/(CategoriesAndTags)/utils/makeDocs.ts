import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"
import type {Welcome} from "../../models/categoriesAndTags"
import createSearchCategoryAndTag from "./createSearchCategoryAndTag"

export default async function makeDocs(obtainDocs: (page: number)=> Promise<Welcome>): Promise<CategoryAndTagMapping[]>{
    let page = 1

    const docs = await obtainDocs(page)

    const totalPages = docs.meta.pagination.total

    var docsArray = docs.data

    while(page < totalPages){ 
        ++page
        
        const docsParcials = await obtainDocs(page)
        
        docsArray = [...docsArray, ...docsParcials.data]
    }

    const docsToUpdateRaw = await Promise.all(docsArray.map(async(category)=>{
        return await createSearchCategoryAndTag(category);
    }))

    return docsToUpdateRaw.filter((elemento): elemento is CategoryAndTagMapping => elemento !== undefined)
}