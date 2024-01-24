import type { Datum } from "../../models/posts";
import { Badge } from "flowbite-react";

// This is an async Server Component
export default function Posts({query} : {query: Datum[]}) {
    if(query.length > 0) return (
        <>    
            {query.map((post)=>{
                return (
                    <article key={post.id} className=" bg-white border-slate-800 dark:bg-slate-800 dark:border-white border-4 rounded-xl shadow-xl flex flex-col items-center justify-between gap-3">
                        <a href={`/posts/${post.attributes.slug}`}>
                                <img src={`${post.attributes.cover.data.attributes.url}`}
                                    width={post.attributes.cover.data.attributes.width}
                                    height={post.attributes.cover.data.attributes.height}
                                    alt={post.attributes.cover.data.attributes.alternativeText || ""}

                                    />        
                        </a>
                        <div className='p-3 grow flex flex-col justify-between items-center gap-3'>
                            <h2 className='text-slate-900 dark:text-white text-2xl px-3'>{post.attributes.title}</h2>
                            <div className="flex gap-3">
                                {post.attributes.category.data?.attributes.Title? (
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold">Category: </p>
                                        <a href={`/categories/${post.attributes.category.data.attributes.slug}`}>
                                            <Badge color="gray">{post.attributes.category.data?.attributes.Title}</Badge>
                                        </a>
                                    </ div>
                                ): null}
                                {post.attributes.tags.data.length > 0? (
                                    <div className="flex flex-col items-center">
                                        <p className="font-bold">Tags:</p>
                                        <ul className="flex gap-2 flex-wrap">
                                            {post.attributes.tags.data.map((tag)=>(
                                                <Badge color="gray">
                                                    <a href={`/tags/${tag.attributes.slug}`}>
                                                        {tag.attributes.Title}
                                                    </a>
                                                </Badge>
                                            ))}
                                        </ul>
                                    </div>
                                ): null}
                            </div>
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