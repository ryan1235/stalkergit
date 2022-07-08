import { useState } from "react"
import { useEffect } from "react"

import { UserFocus, FlagBanner, ArrowSquareLeft, TwitterLogo, EnvelopeSimple, Rows, HourglassSimple, Timer, Users, AddressBook, HouseLine } from "phosphor-react";

import Infofollowers from "./infoFollowers";
import InfoReps from "./infoRepos";
import loadergif from "../img/835.gif"

import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

export default function InfoUser({ user, active, setactive, setuser }) {
    const [infos, setInfos] = useState({ name: '', avatar_url: '', location: '', email: '', bio: '', twitter_username: '', public_repos: '', followers: '', following: '', created_at: '', updated_at: '' })
    const [carregamento, setCarregamento] = useState(false)
    const [repoUser, setRepoUser] = useState(true)
    const [followers, SsetFollowers] = useState(false)
    function activerepoUser() {
        setRepoUser(true)
        SsetFollowers(false)
    }
    function sctivefollowers() {
        setRepoUser(false)
        SsetFollowers(true)
    }
    useEffect(() => {
        fetch(`https://api.github.com/users/${user}`)
            .then(res => res.json())
            .then(data => {
                setInfos({
                    name: data.name,
                    avatar_url: data.avatar_url,
                    location: data.location,
                    email: data.email,
                    bio: data.bio,
                    twitter_username: data.twitter_username,
                    public_repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    repos_url: data.repos_url,
                    company: data.company,
                })
                setCarregamento(true)
            })
    }, [active])

    function exit() {
        setactive(false)
        setuser('')
    }

    if (carregamento == false) {
        return (
            <div className="h-screen flex justify-center items-center">
                <img src={loadergif} alt="carregando.." />
            </div>
        )
    } else {
        const criadoem = new Date(infos.created_at)
        const criadoemdia = format(criadoem, " dd'/'MM'/'yyyy", {
            locale: ptBR,
        })
        const criadoemhora = format(criadoem, "k", {
            locale: ptBR,
        })
        const ultimaatt = new Date(infos.updated_at)
        const ultimaattdia = format(ultimaatt, " dd'/'MM'/'yyyy", {
            locale: ptBR,
        })
        const ultimaatthora = format(ultimaatt, "k", {
            locale: ptBR,
        })
        return (
            <div className="w-full flex">
                <div className="w-3/12 h-screen"></div>
                <div className="w-3/12 h-screen top-0 fixed bg-slate-800/50 flex flex-col items-center gap-4 p-4 rounded-lg">
                    <div onClick={exit} className='absolute left-1 cursor-pointer hover:text-yellow-500 transition-colors'>
                        <ArrowSquareLeft size={32} />
                    </div>
                    <strong>{infos.name}</strong>
                    <img className="w-[220px] rounded-full border-2 border-yellow-500" src={infos.avatar_url} alt={`imagem do usuario do gitHunb ${infos.name}`} />
                    <div className="w-6/6 flex flex-col gap-2 items-start justify-center">
                        {infos.bio == null ? <span className="flex items-center gap-1"><UserFocus size={20} />bio: <strong className="text-yellow-500"> Sem Informação</strong></span> : <span className="flex items-center gap-1"><UserFocus size={20} />bio:  <strong className="text-yellow-500">{infos.bio}</strong></span>}
                        {infos.location == null ? <span className="flex items-center gap-1"><FlagBanner size={20} /> Pais: <strong className="text-yellow-500">Sem Informação</strong></span> : <span className="flex items-center gap-1"><FlagBanner size={20} />Pais:  <strong className="text-yellow-500">{infos.location}</strong></span>}
                        {infos.company == null ? <span className="flex items-center gap-1"><HouseLine size={20} /> Cidade: <strong className="text-yellow-500">Sem Informação</strong></span> : <span className="flex items-center gap-1"><HouseLine size={20} />Cidade:  <strong className="text-yellow-500">{infos.company}</strong></span>}
                        {infos.email === null ? <span className="flex items-center gap-1"><EnvelopeSimple size={20} />Email: <strong className="text-yellow-500">Sem Informação</strong></span> : <span className="flex items-center gap-1"><EnvelopeSimple size={20} />Email: <strong className="text-yellow-500">{infos.email}</strong></span>}
                        {infos.twitter_username === null ? <span className="flex items-center gap-1"><TwitterLogo size={20} />twitter: <strong className="text-yellow-500">Sem Informação</strong></span> : <span className="flex items-center gap-1"><TwitterLogo size={20} />twitter: <strong className="text-yellow-500">@{infos.twitter_username}</strong></span>}
                        <span className="flex items-center gap-1"><Rows size={20} />Repositorios Publicos: <strong className="text-yellow-500">{infos.public_repos}</strong></span>
                        <span className="flex items-center gap-1"><Users size={20} />Seguidores: <strong className="text-yellow-500">{infos.followers}</strong> Pessoas</span>
                        <span className="flex items-center gap-1"><AddressBook size={20} />Seguindo: <strong className="text-yellow-500">{infos.following}</strong> Pessoas</span>
                        <span className="flex items-center gap-1"><HourglassSimple size={20} /> Criado em: <strong className="text-yellow-500">{criadoemdia}</strong> ás <strong className="text-yellow-500">{criadoemhora}</strong>h</span>
                        <span className="flex items-center"><Timer size={20} />Ultima Atualização: <strong className="text-yellow-500">{ultimaattdia}</strong> ás <strong className="text-yellow-500">{ultimaatthora}</strong>h</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="w-full flex justify-center items-center gap-2 py-8">
                        <button onClick={activerepoUser}><h2 className={repoUser ? `text-1xl mt-8 text-yellow-500 underline` : `text-1xl mt-8 hover:underline`}>Repositorios de {infos.name}</h2></button><button onClick={sctivefollowers}><h2 className={followers ? `text-1xl mt-8 text-yellow-500 underline` : `text-1xl mt-8 hover:underline`}>Quem o {infos.name} Segue</h2></button>
                    </div>
                    {repoUser ? <InfoReps active={infos.active} user={user} /> : null}
                    {followers ? <Infofollowers active={infos.active} user={user} /> : null}
                </div>
            </div>
        )
    }

    }
