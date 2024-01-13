import { useState } from "react"
import ButtonOfDarkMode from "./ButtonOfDarkMode"
import SwitchOpen from "./SwitchOpen"

export default function Header(){

    const [open, setOpen] = useState(false)


    function handleClick(){
        setOpen(false)
    }

    function handleClickButton(){
        setOpen(prev => !prev)
    }


    let classListUl = open? "": "-translate-y-full " 
    return(
        <header className="bg-cyan-400 dark:bg-slate-800 h-14 fixed w-full z-10">
            <nav className="h-full flex justify-between items-center mx-auto container px-3">
                <a href="/" onClick={handleClick} className="z-10 font-mono text-3xl text-slate-900 dark:text-white">JM</a>
                <div className="relative flex gap-3">
                    <button className="dark:text-white align-middle font-icons" onClick={handleClickButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
                    </button>
                </div>
                <div className={classListUl + "fixed inset-0 flex flex-col justify-between transition-transform duration-1000 bg-gradient-to-b from-cyan-500 to-blue-500 dark:from-cyan-900 dark:to-blue-900 dark:text-white"}>
                    <div className="container h-14 flex pr-3 justify-end items-center z-10">
                        <button className="dark:text-white align-middle font-icons" onClick={handleClickButton}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div  className="flex justify-center items-center">
                        <ul className="flex flex-col items-center">
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <a href="/" onClick={handleClick} className="text-5xl md:text-8xl">
                                        Home
                                    </a>
                                </SwitchOpen>
                            </li>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <a href="/about" onClick={handleClick} className="text-5xl md:text-8xl">
                                        About
                                    </a>
                                </SwitchOpen>
                            </li>
                            <li>
                                <SwitchOpen setOpen={setOpen}>
                                    <a href="/posts?posts=1" onClick={handleClick} className="text-5xl md:text-8xl">
                                        Posts
                                    </a>
                                </SwitchOpen>
                            </li>
                        </ul>
                    </div>
                    <div className="container h-14 flex pr-3 justify-end items-center z-10">
                        <SwitchOpen setOpen={setOpen}>
                            <ButtonOfDarkMode />
                        </SwitchOpen>
                    </div>
                </div>
            </nav>
        </header>
    )
}