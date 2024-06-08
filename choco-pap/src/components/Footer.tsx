const logoFB = '/images/logo-facebook.png'
const logoInsta = '/images/logo-instagram.jpeg'
const logoTwitter = '/images/logo-twitter.png'

// Afficher le footer
function Footer() {
    return (
        <footer className="md:h-32 w-full container-fluid overflow-hidden bg-amber-700">
            <div className="md:flex container justify-between px-10 py-3 mx-auto">
                <div className='basis-1/3 text-white mb-2'>
                    <h2 className='font-bold text-lg mb-1 text-yellow-500'>Choco Pap</h2>
                    <p className='border-t border-blue-400'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                </div>
                <div className='basis-1/3 text-white mb-4'>
                    <h2 className='font-bold text-lg mb-1 text-yellow-500'>Contact</h2>                  
                    <p className='border-t border-blue-400'><span className='font-bold'>Adresse </span>: 51 rue du chocolat 75000 Paris</p>
                    <p><span className='font-bold'>Téléphone </span>: 01 23 45 67 89</p>
                    <p><span className='font-bold'>Horaires </span>: 9h00-17h00 du Lundi au vendredi</p>
                </div>
                <div className='flex items-center'>
                    <img className="h-10 rounded" src={logoFB} alt="logo-Facebook" />
                    <img className="h-10 mx-4 rounded" src={logoInsta} alt="logo-Instagram" />
                    <img className="h-10 rounded" src={logoTwitter} alt="logo-Twitter" />
                </div>
            </div>
        </footer>
    );
}

export default Footer;