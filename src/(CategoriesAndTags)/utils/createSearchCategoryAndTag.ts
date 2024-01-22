import type { Datum } from "../../models/categoriesAndTags"
import type { Welcome } from "../../models/post"
import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"

const API_URL = import.meta.env.PUBLIC_API_URL

async function obtainLastPostOfDoc(id: number): Promise<Welcome>{
    let post = await fetch(`${API_URL}/api/posts/${id}?populate=cover`)
    return await post.json()
}

export default async function createSearchtag(doc: Datum): Promise<CategoryAndTagMapping | undefined> {
    if(!doc || doc.attributes.posts.data.length == 0) return undefined
    
    const post = await obtainLastPostOfDoc(doc.attributes.posts.data[0].id)

    if(!post.data) return undefined

    return({
        id: doc.id,
        title: doc.attributes.Title,
        slug: doc.attributes.slug,
        numberOfPosts: doc.attributes.posts.data.length,
        post: {
            id: post.data.id,
            title: post.data.attributes.title,
            description: post.data.attributes.description,
            tags: [],
            category: undefined,
            slug: post.data.attributes.slug,
            image: {
                id: post.data.attributes.cover.data.id,
                src: post.data.attributes.cover.data.attributes.url,
                alt: post.data.attributes.cover.data.attributes.alternativeText,
                width: post.data.attributes.cover.data.attributes.width,
                height: post.data.attributes.cover.data.attributes.height
            } 
        } 
    })
}