import { Link } from 'react-router-dom';
import Caroussel from "../components/Caroussel";

function Home() {
    let slidesCaroussel = [
        "/images/accueil1.jpg",
        "/images/accueil2.jpg",
        "/images/accueil3.jpg",
    ]

    return (
        // page principale CHOCO PAP
        <main className='min-h-screen bg-hero'>
            <div className='min-h-screen bg-amber-950/80 flex contain-fluid overflow-hidden grid justify-center text-white'>
             
                    {/* titre */}
                    <h1 className='my-32 text-7xl font-bold text-yellow-500 text-center'>CHOCO PAP</h1>

                    {/* lien vers la boutique */}
                    <button className='mb-40 h-10 px-24 mx-auto text-xl font-bold border rounded-lg bg-sky-500/75 shadow-lg shadow-orange-300'>
                        <Link to={"/boutique"}>VOIR LA BOUTIQUE</Link>
                    </button>

                    {/* le caroussel */}
                    <div className='mx-auto mb-48'>
                        <Caroussel slides={slidesCaroussel} />
                    </div>      
               
            </div>
        </main>

    );
}

export default Home;
