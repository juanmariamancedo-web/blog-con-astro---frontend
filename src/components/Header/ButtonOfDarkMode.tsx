import { useEffect, useState } from 'react'
import DarkMode from '../icons/DarkMode'
import LightMode from '../icons/LightMode'

export default function ButtonOfDarkMode(){
    const [theme, setTheme] = useState("dark")
   
    useEffect(()=>{
        if(localStorage.theme != 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: light)').matches)){
            document.body.classList.remove("dark")
            localStorage.theme = "light"
            setTheme("light")
        }else{
            document.body.classList.add("dark")
            localStorage.theme = "dark"
            setTheme("dark")
        }

    }, [])

    function changeThemeMode(){
        if(theme == "dark"){
            document.body.classList.remove("dark")
            localStorage.theme = "light"
            setTheme("light")
        }else{
            document.body.classList.add("dark")
            localStorage.theme = "dark"
            setTheme("dark")
        }
    }

    return(
        <button onClick={changeThemeMode} className="flex justify-center items-center">
                {theme == "dark"? <LightMode className="dark:text-white align-middle" />  : <DarkMode className="dark:text-white align-middle" />}
        </button>
    )
}