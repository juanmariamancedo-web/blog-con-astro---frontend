import type { PostMapping } from "./postMapping"

export type CategoryAndTagMapping = {
    id: number,
    title: string,
    slug: string,
    post: PostMapping
}