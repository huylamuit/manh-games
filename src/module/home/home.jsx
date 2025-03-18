import { Link } from "react-router-dom";
import './home.css';

function Home() {
    const GameList = [
        { name: 'Flip Card', url: '/flip-card' },
        {name: 'Avoid Eggs', url:'/avoid-eggs'}
        
    ];

    return (
        <div className="home">
            <div className="header">
                <h1>Manh Games</h1>
            </div>

            <div className="game-menu">
                {GameList.map((game, index) => (
                    <Link to={game.url} key={index} className="game-card">
                        {game.name}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Home;
