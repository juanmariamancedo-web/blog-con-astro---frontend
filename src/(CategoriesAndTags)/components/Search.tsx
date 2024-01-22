import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"
import Fuse from "fuse.js"
import type { FuseResult } from "fuse.js"
import { useState } from "react"
const API_URL = import.meta.env.PUBLIC_API_URL
import { ListGroup } from 'flowbite-react';

export default function Search({docs, slug}: {docs: CategoryAndTagMapping[], slug: string}){
    const [search, setSearch] = useState("")
    const [fuse, setFuse] = useState<FuseResult<CategoryAndTagMapping>[]>()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        const fuse = new Fuse(docs, {
            keys: [
                {
                    name: "title"
                }
            ]
        })

        setFuse(fuse.search(search))
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input type="text" value={search} onChange={(e)=>{
                    setSearch(e.target.value)
                    setFuse(undefined)
                }} className="dark:bg-slate-800 dark:text-white" />
                <button type="submit" className="dark:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                    </svg>
                </button>
            </form>
            {fuse && fuse?.length > 0 && (
                <div className="relative">
                    <ListGroup className="absolute inset-x-0 flex flex-col gap-2 dark:bg-slate-800 dark:text-white">
                        {fuse.map(result => (
                            <ListGroup.Item className=" inset-x-0 border-collapse border-amber-50 dark:border-gray-600 border-2" key={`result-${result.item.id}`}>
                                <a href={`${slug}/${result.item.slug}`} className="flex gap-2 justify-between w-full">
                                    <div className="flex justify-center items-center gap-2 basis-2/3">
                                        <p>
                                            {result.item.title}
                                        </p>
                                    </div>
                                    <div className="basis-1/3 flex justify-center items-center">
                                        <img src={`${API_URL}${result.item.post.image.src}`} alt={result.item.post.image.alt} className="aspect-video" />
                                    </div>
                                </a>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>

            )}
        </ div>
    )
}