import { useState, useEffect } from "react"



export default function Infofollowers({ active, user }) {
    const [seguindos, setSeguindos] = useState()
    useEffect(() => {
        fetch(`https://api.github.com/users/${user}/followers`)
            .then(res => res.json())
            .then(data => {
                setSeguindos(data)
            })
    }, [active])
    return (
        <div className="w-full flex flex-wrap gap-16 justify-around">
            {seguindos?.map(seguindo => {
                return (
                    <a className="flex flex-col items-center gap-2" href={seguindo.html_url}>
                        <img className="w-[94px] rounded-full" src={seguindo.avatar_url} alt={`usuario gitHunb Chamado ${seguindo.login}`} />
                        <span>{seguindo.login}</span>
                    </a>
                )
            })}
        </div>
    )
}
