import type { Datum, Welcome } from "../../models/categoriesAndTags";

export default async function makeFilterDocs(obtainDocs: (page: number)=> Promise<Welcome>): Promise<Datum[]> {
    let page = 1

    const docs = await obtainDocs(page)

    const totalPages = docs.meta.pagination.total

    var docsJson = docs.data

    while(page < totalPages){ 
        ++page

        const docsParcials = await obtainDocs(page)
        
        docsJson = [...docsJson, ...docsParcials.data]
    }

    return docsJson.filter((doc)=>{
        if(doc.attributes.posts.data[0]) return doc
    })
}