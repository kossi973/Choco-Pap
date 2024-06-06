import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AfficherQtePanier } from './AfficherQtePanier';
import Panier from './Panier';

const logoUrl = '/images/logo.png';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <header className="container-fluid h-32 w-full bg-amber-700 mx-auto flex justify-between items-center px-10">
                <div>
                    <img className="logo-spin h-16" src={logoUrl} alt="logo-Choco" />
                </div>
                
                <nav className='hidden md:inline-flex items-center'>
                    <ul className='flex text-white font-bold text-xl' >
                        <li className='mr-4'><Link to={"/"}>Accueil</Link></li>
                        <li className='mr-10'><Link to={"/boutique"}>Boutique</Link></li>
                    </ul>                    
                    <p className='mr-2 font-bold bg-yellow-200 rounded-full px-2'><AfficherQtePanier/></p>
                    {<Panier/>}
                </nav> 

                <div className='md:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>                    
                        {
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="yellow" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        }
                    </button>
                </div>
                
                {isOpen &&
                    <div className="z-10 text-white text-lg font-bold absolute top-32 h-52 w-full md:w-2/5 bg-amber-600/95 md:hidden left-0">
                        <div>
                            <nav className='flex flex-col pl-4' onClick={() => setIsOpen(!isOpen)}>
                                <Link to={"/"} className='my-6'>Accueil </Link>
                                <Link to={"/boutique"} className='mb-6'>Boutique </Link>
                            </nav>
                        </div>                                
                        <div className='pl-4 flex gap-4 items-center'>
                            <p>Panier</p>
                            <p className='text-black bg-yellow-200 rounded-full px-2 ml-4'><AfficherQtePanier/></p>
                            {<Panier/>} 
                        </div>
                    </div>}
            </header>
        </div>
    )
}

export default Header;

