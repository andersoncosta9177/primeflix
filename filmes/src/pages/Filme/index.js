import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import './filme.css'
import {toast}   from 'react-toastify'




function Filme() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        async function loadFilme() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "7e4cacb01df272f108bcf4f9382ffbda",
                    language: "pt-BR"
                }
            })

                .then((response) => {
                    setFilme(response.data)
                    setLoading(false)

                }).catch(() => {
                    navigate("/", { replace: true })
                    return;

                })
        }
        loadFilme()


        return () => {
            console.log("desmontado")
        }
    }, [navigate, id])


    function salvarFilme() {
        const minhaLista = localStorage.getItem("@primeflix");
        let filmesSalvos = JSON.parse(minhaLista) || []

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)
        if (hasFilme) {
            toast.warning("Filme já esta na sua lista de favoritos!")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success(" Filme salvo com sucesso!")
    }



    if (loading) {
        return (
            <div className='filme-info'>
                <h1>Carregando Detalhes...</h1>
            </div>
        )
    }

    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse:</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average}</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a rel='external' target='blank' href={`https://youtube.com/results?search_query=${filme.title} trailer`}>Trailer</a>
                </button>

            </div>
        </div>

    )
}
export default Filme