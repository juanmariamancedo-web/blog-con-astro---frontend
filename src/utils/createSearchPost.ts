import type { PostMapping } from "../models/postMapping"
import type { Datum } from "../models/posts"

export default function createSearchPost(post: Datum): PostMapping{
    return({
        id: post.id,
        title: post.attributes.title,
        description: post.attributes.description,
        category: post.attributes.category.data?.attributes.Title,
        tags: post.attributes.tags.data.map((tag)=>tag.attributes.Title),
        slug: post.attributes.slug,
        image: {
            id: post.attributes.cover.data.id,
            src: post.attributes.cover.data.attributes.url,
            alt: post.attributes.cover.data.attributes.alternativeText,
            width: post.attributes.cover.data.attributes.width,
            height: post.attributes.cover.data.attributes.height
        }
    })
}