const API_URL = import.meta.env.PUBLIC_API_URL
import type { Datum } from "../../models/posts";

// This is an async Server Component
export default function Posts({query} : {query: Datum[]}) {
    if(query.length > 0) return (
        <>    
            {query.map((post)=>{
                return (
                    <article key={post.id} className=" bg-white border-slate-800 dark:bg-slate-800 dark:border-white border-4 rounded-xl shadow-xl flex flex-col items-center justify-between gap-3">
                        <a href={`/posts/${post.attributes.slug}`}>
                                <img src={`${API_URL}${post.attributes.cover.data.attributes.url}`}
                                    width={post.attributes.cover.data.attributes.width}
                                    height={post.attributes.cover.data.attributes.height}
                                    alt={post.attributes.cover.data.attributes.alternativeText || ""}

                                    />        
                        </a>
                        <div className='p-3 grow flex flex-col justify-between items-center gap-3'>
                            <h2 className='text-slate-900 dark:text-white text-2xl px-3'>{post.attributes.title}</h2>
                            <p className='text-slate-500 dark:text-slate-400 px-3'>
                                {post.attributes.description}
                            </p>
                            <a href={`/posts/${post.attributes.slug}`} className="py-1 px-3 text-center bg-yellow-400 text-black dark:bg-white dark:text-black rounded-xl shadow-sm shadow-slate-200 dark:shadow-white">
                                Ver más
                            </a>
                        </div>
                    </article>
                )
            })}
        </>
    );
  }