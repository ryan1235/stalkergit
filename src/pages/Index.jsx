import { useEffect, useState } from "react"

import InfoUser from "../Components/InfoUser"
import user from '../img/user.png'

import { TwitterLogo, GithubLogo, LinkedinLogo, InstagramLogo } from "phosphor-react";

export default function Index() {
    const [input, setInput] = useState("")
    const [busca, setBusca] = useState(false)
    const [img, setImg] = useState()
    function togleBusca() {
        if (input.length < 4) {
            window.alert('erro')
        } else {
            setBusca(!busca)
        }
    }
    useEffect(() => {
        if (input.length < 4) {
            setImg(user)
        } else {
            setImg(`https://github.com/${input}.png`)
        }
    }, [input])
    if (busca === false) {
        return (
            <div className="overflow-y-hidden">
                <header className="w-full flex justify-between items-center">
                    <h1 className="text-3xl text-yellow-500 font-bold mt-2">GIT STALKER</h1>
                    <div className="flex text-slate-200 gap-4 px-2">
                        <a href="https://twitter.com/ryanluca007123" target="_blank" className='hover:text-yellow-500 transition-colors'><TwitterLogo size={32} /></a>
                        <a href="https://github.com/ryan1235" target="_blank" className='hover:text-yellow-500 transition-colors'><GithubLogo size={32} /></a>
                        <a href="https://www.linkedin.com/feed/" target="_blank" className='hover:text-yellow-500 transition-colors'><LinkedinLogo size={32} /></a>
                        <a href="https://www.instagram.com/ryanluca007122/" target="_blank" className='hover:text-yellow-500 transition-colors'><InstagramLogo size={32} /></a>
                    </div>
                </header>
                <main className="flex flex-col w-full gap-7 h-screen items-center justify-center">
                    <img className="w-[300px] rounded-full" src={img} alt="Image GitHunb" />
                    <input
                        onChange={res => setInput(res.target.value)}
                        className="w-5/12 bg-transparent h-9 text-center text-slate-200 border border-yellow-400 rounded" type="text" />
                    <button onClick={togleBusca} className="bg-yellow-700 w-4/12 p-2 text-bold text-slate-200 rounded-lg uppercase hover:bg-yellow-800 transition-colors">
                        stalkerar
                    </button>
                </main>
            </div>
        )
    } else {
        return (
            <main className="flex flex-col w-full items-center text-slate-200">
                <InfoUser user={input} setuser={setInput} active={busca} setactive={setBusca} />
            </main>
        )
    }
    }
