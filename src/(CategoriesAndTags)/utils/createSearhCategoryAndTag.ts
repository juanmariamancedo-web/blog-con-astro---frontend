import type { Datum } from "../../models/categoriesAndTags"
import type { Welcome } from "../../models/posts"
import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"

export default async function createSearchtag(tag: Datum, obtainLastPostOfDoc: (id: number) => Promise<Welcome>): Promise<CategoryAndTagMapping | undefined> {
    if(!tag || tag.attributes.posts.data.length == 0) return undefined
    
    const post = await obtainLastPostOfDoc(tag.attributes.posts.data[0].id)

    if(!post.data[0]) return undefined

    return({
        id: tag.id,
        title: tag.attributes.Title,
        slug: tag.attributes.slug,
        numberOfPosts: post.data.length,
        post: {
            id: post.data[0].id,
            title: post.data[0].attributes.title,
            description: post.data[0].attributes.description,
            tags: [],
            category: undefined,
            slug: post.data[0].attributes.slug,
            image: {
                id: post.data[0].attributes.cover.data.id,
                src: post.data[0].attributes.cover.data.attributes.url,
                alt: post.data[0].attributes.cover.data.attributes.alternativeText,
                width: post.data[0].attributes.cover.data.attributes.width,
                height: post.data[0].attributes.cover.data.attributes.height
            } 
        } 
    })
}