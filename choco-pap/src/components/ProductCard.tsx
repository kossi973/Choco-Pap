
import { AjouterAuPanier } from "./AjouterAuPanier";
import { Link } from "react-router-dom";

export interface CardProps {
    id : string,
    title : string,
    price : number,
    note : number,
    image: string,
    category: {
        blanc: boolean,
        lait: boolean,
        noir: boolean,
        caramel: boolean,
        noix: boolean,
        fruit: boolean,
        liqueur: boolean
      },
      description: string,
      ingredients: string,
}

const Card: React.FC<CardProps> = ({...product}) => {
    const {image, title, price, note} = product;

    return (
        <div className='text-white max-w-xs mb-10 mx-5 bg-amber-800 shadow-md shadow-amber-100 rounded-lg overflow-hidden'>
            <img src={image} alt={product.title} className='h-36 w-60' />
            <div className='px-6 py-6'>
                <div className='font-bold text-lg mb-1 grid justify-center'>
                    {title}
                </div>
                <p className='text-lg font-bold mb-3 grid justify-center'>
                    {price} €
                </p>
                <div className="text-yellow-200 grid justify-center underline underline-offset-4">
                <Link to='/pages/productdetails' state={{from:'productcard', product: product}}>
                    Voir plus
                </Link>
                </div>
                <p className='text-lg my-3'>
                    Note: {note}
                </p>
                <div className='text-lg border border-white bg-amber-600 grid justify-center shadow-md shadow-amber-100 rounded-lg'>
                    {<AjouterAuPanier {...product}/>}
                </div>               
            </div>
        </div>
    );
}
export default Card;

