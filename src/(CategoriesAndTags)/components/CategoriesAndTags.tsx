const API_URL = import.meta.env.PUBLIC_API_URL
import type { CategoryAndTagMapping } from "../../models/categoryAndTagMapping"
import { Badge } from "flowbite-react"

export default function CategoriesAndTags({docs, slug}: {docs: CategoryAndTagMapping[], slug: string}){
    if(docs.length > 0) return(
        <>
            {docs.map((doc)=>(
                <article key={doc.id} className=" bg-white border-slate-800 dark:bg-slate-800 dark:border-white border-4 rounded-xl shadow-xl flex flex-col items-center justify-between gap-3">
                    <a href={`${slug}/${doc.slug}`}>
                            <img src={`${doc.post.image.src}`}
                                width={doc.post.image.width}
                                height={doc.post.image.height}
                                alt={doc.post.image.alt || ""}
                                />        
                    </a>
                    <div className='p-3 grow flex flex-col justify-between items-center gap-3'>
                        <h2 className='text-slate-900 dark:text-white text-2xl px-3'>{doc.title}</h2>
                        <Badge color="gray">{doc.numberOfPosts} {doc.numberOfPosts == 1? "post" : "posts"}</Badge>
                        <a href={`${slug}/${doc.slug}`} className="py-1 px-3 text-center bg-yellow-400 text-black dark:bg-white dark:text-black rounded-xl shadow-sm shadow-slate-200 dark:shadow-white">
                            Ver más
                        </a>
                    </div>
                </article>
            ))}
        </>
    )
}