import { useState, useEffect } from "react"
import loadergif from "../img/835.gif"

export default function InfoReps({ active, user }) {
    const[repositorios, setRepositorios] = useState()

    useEffect(() => {
        fetch(`https://api.github.com/users/${user}/repos`)
            .then(res => res.json())
            .then(data => {
                setRepositorios(data)
            })
    }, [active])
    if (!repositorios) {
        return (
            <div className="flex flex-wrap w-5/6 h-screen items-center justify-center gap-4">
                <img src={loadergif} alt="carregando..." />
            </div>
        )
    }return (
        <div className="flex flex-wrap w-5/6 items-center justify-center gap-4">
            {repositorios.map(repositorio => {
                return (
                    <a key={repositorio.id} href={repositorio.html_url} data-aos="fade-left" className='flex flex-col w-6/12 gap-1 border-2 border-yellow-500 p-5 hover:p-7 transition-transform'>
                        <span>{repositorio.name}</span>
                        {repositorio.language === null ? <span>Linguagem predominante: Não Encontrado</span> : <span>Linguagem predominante: {repositorio.language}</span>}
                    </a>
                )
            })}
        </div>
    )
}
