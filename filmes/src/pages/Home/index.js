import { useEffect, useState } from "react"
import api from '../../services/api'
import { Link } from "react-router-dom"
import './home.css'

function Home() {
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes() {
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "7e4cacb01df272f108bcf4f9382ffbda",
                    language: "pt-BR",
                    page: 1
                }
            })

            setFilmes(response.data.results)
            setLoading(false)

        }
        loadFilmes()

    }, [])


    if (loading) {
        return (
            <div className="loading">
                <h2>Carregando filme</h2>
            </div>
        )
    }


    return (
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((filme) => {
                    return (
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}

            </div>

        </div>
    )
}
export default Home