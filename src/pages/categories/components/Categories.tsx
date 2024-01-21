const API_URL = import.meta.env.PUBLIC_API_URL
import type { CategoryAndTagMapping } from "../../../models/categoryAndTagMapping"

export default function Categories({categories}: {categories: CategoryAndTagMapping[]}){
    if(categories.length > 0) return(
        <>
            {categories.map((category)=>(
                <article key={category.id} className=" bg-white border-slate-800 dark:bg-slate-800 dark:border-white border-4 rounded-xl shadow-xl flex flex-col items-center justify-between gap-3">
                    <a href={`/categories/${category.slug}`}>
                            <img src={`${API_URL}${category.post.image.src}`}
                                width={category.post.image.width}
                                height={category.post.image.height}
                                alt={category.post.image.alt || ""}
                                />        
                    </a>
                    <div className='p-3 grow flex flex-col justify-between items-center gap-3'>
                        <h2 className='text-slate-900 dark:text-white text-2xl px-3'>{category.title}</h2>
                        <a href={`/categories/${category.slug}`} className="py-1 px-3 text-center bg-yellow-400 text-black dark:bg-white dark:text-black rounded-xl shadow-sm shadow-slate-200 dark:shadow-white">
                            Ver más
                        </a>
                    </div>
                </article>
            ))}
        </>
    )
}