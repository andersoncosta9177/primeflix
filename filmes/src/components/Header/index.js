import './header.css';
import { Link } from 'react-router-dom';


function Header(){
    return(
        <header>
            <Link className='logo' to="/">Prime Flix</Link>
            <Link className='favorite' to="/favoritos">Meus filmes favoritos</Link>
        </header>

    )
}

export default Header