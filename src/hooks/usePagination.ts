import {useState, useEffect, useRef} from "react"

export default function  usePagination(length: number): ["loading" | "there are not posts" | "finish", number, React.MutableRefObject<Element | undefined>] {
    const [page, setPage] = useState(1)
    const [situation, setSituation] = useState<"loading" | "there are not posts" | "finish">("loading")

    const final = useRef<Element>();

    useEffect(()=>{ 
        if(length > 0) {
            function callback(entries: IntersectionObserverEntry[]){
                if(entries[0].isIntersecting && (length / 6 > page)){
                    setPage((page)=> page + 1)
                }   
            }

            const observer = new IntersectionObserver(callback)

            if(final.current) observer.observe(final.current)


            return function disconnect(){
                observer.disconnect()
            }
        } 
    }, [page, final])

    useEffect(()=>{
        if(length / 6 <= page){
            setSituation("finish")
        }else if(length == 0){
            setSituation("there are not posts")
        }else{
            setSituation("loading")
        }
    }, [page])

    return [situation, page, final]
}