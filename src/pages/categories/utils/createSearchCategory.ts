import type { Datum } from "../../../models/categoriesAndTags";
import type { CategoryMapping } from "../../../models/categoryAndTagMapping";
import type { Welcome } from "../../../models/post"

const API_URL = import.meta.env.PUBLIC_API_URL

async function obtainLastPostOfCategory(id: number): Promise<Welcome>{
    console.log(`Ruta a fecth ${API_URL}/api/posts/${id}?populate=cover`)
    let post = await fetch(`${API_URL}/api/posts/${id}?populate=cover`)
    return await post.json()
}

export default async function createSearchCategory(category: Datum): Promise<CategoryMapping | undefined> {
    if(!category || category.attributes.posts.data.length == 0) return undefined

    const post = await obtainLastPostOfCategory(category.attributes.posts.data[0].id)

    if(!post.data) return undefined

    return({
        id: category.id,
        title: category.attributes.Title,
        slug: category.attributes.slug,
        post: {
            id: post.data.id,
            title: post.data.attributes.title,
            description: post.data.attributes.description,
            category: undefined,
            tags: [],
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