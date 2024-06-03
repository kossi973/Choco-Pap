import { useState} from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function Caroussel ({ slides }: { slides:Array<string> }) {

    let [currentSlide, SetCurrentSlide] = useState(0);

    // sélectionner slide précédente
    let previousSlide = () => {
        // if (currentSlide === 0) SetCurrentSlide(slides.length-1)
        // else SetCurrentSlide(currentSlide - 1);
        if (currentSlide > 0) SetCurrentSlide(currentSlide - 1)
    };

    // sélectionner slide suivante
    let nextSlide = () => {
        // if (currentSlide === slides.length-1) SetCurrentSlide(0)
        // else SetCurrentSlide(currentSlide + 1);
        if (currentSlide < slides.length-1) SetCurrentSlide(currentSlide + 1)
    };

    return (
        <div className="w-96 rounded border-4 border-amber-700/80 ring-4 ring-amber-700/60 overflow-hidden relative">
            {/* afficher les images une à une */}
            <div className={`h-68 flex transition ease-out duration-700`}
                style = {{
                    transform : `translateX(-${currentSlide * 100}%)`,
                }}>
                {slides.map((slide: string, index: number) => {
                    return (<img key={{slide} && index} src={slide} alt={slide}/>);
                })}
            </div>
            
            {/* positionner les boutons de sélection gauche et droite */}
            <div className="absolute top-0 h-full w-full flex justify-between items-center text-amber-500 text-2xl px-1">
                <button onClick={previousSlide}>
                    <IoIosArrowDropleftCircle/>
                </button>
                <button onClick={nextSlide}>
                    <IoIosArrowDroprightCircle/>
                </button>
            </div>

            {/* positionner les boutons d'identification et sélection des slides */}
            <div className="absolute bottom-0 py-4 flex justify-center gap-5 w-full">
                {slides.map((slide: string, index: number) => {
                    return (
                        <div
                            onClick={() => {
                                SetCurrentSlide(index);
                            }}
                            key={{slide} && index}
                            className={`rounded-full size-4 cursor-pointer
                            ${ index == currentSlide ? "bg-sky-600/75" : "bg-amber-500"                                
                            }`}>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default Caroussel;