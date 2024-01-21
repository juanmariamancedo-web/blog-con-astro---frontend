const API_URL = import.meta.env.PUBLIC_API_URL
import type { TagMapping } from "../../../models/tagMapping"

export default function Tags({tags}: {tags: TagMapping[]}){
    if(tags.length > 0) return(
        <>
            {tags.map((tag)=>(
                <article key={tag.id} className=" bg-white border-slate-800 dark:bg-slate-800 dark:border-white border-4 rounded-xl shadow-xl flex flex-col items-center justify-between gap-3">
                    <a href={`/tags/${tag.slug}`}>
                            <img src={`${API_URL}${tag.post.image.src}`}
                                width={tag.post.image.width}
                                height={tag.post.image.height}
                                alt={tag.post.image.alt || ""}
                                />        
                    </a>
                    <div className='p-3 grow flex flex-col justify-between items-center gap-3'>
                        <h2 className='text-slate-900 dark:text-white text-2xl px-3'>{tag.title}</h2>
                        <a href={`/tags/${tag.slug}`} className="py-1 px-3 text-center bg-yellow-400 text-black dark:bg-white dark:text-black rounded-xl shadow-sm shadow-slate-200 dark:shadow-white">
                            Ver más
                        </a>
                    </div>
                </article>
            ))}
        </>
    )
}