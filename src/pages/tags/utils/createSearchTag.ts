import type { Datum } from "../../../models/tags"
import type { Welcome } from "../../../models/posts"
import type { TagMapping } from "../../../models/tagMapping"

const API_URL = import.meta.env.PUBLIC_API_URL

async function obtainLastPostOfTag(id: number): Promise<Welcome>{
    let post = await fetch(`${API_URL}/api/posts?tags.id=${id}&pagination[pageSize]=1&populate=cover`)
    return await post.json()
}

export default async function createSearchtag(tag: Datum): Promise<TagMapping | undefined> {
    const post = await obtainLastPostOfTag(tag.id)

    if(!post.data[0]) return undefined

    return({
        id: tag.id,
        title: tag.attributes.Title,
        slug: tag.attributes.slug,
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