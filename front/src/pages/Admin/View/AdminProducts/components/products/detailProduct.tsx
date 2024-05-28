import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import animation from '../../../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import { getProductById } from '../../graphql/querys';
// import { CiStar } from 'react-icons/ci';
import { FaStar } from 'react-icons/fa';
// import { FaStarHalfAlt } from 'react-icons/fa';
import { Idescription } from '../../interface';
import { CiMedal } from 'react-icons/ci';
import styled from './products.module.css';
import Sets from '../../../../../../components/sets/sets';
import SumaryReviews from '../../../../../../components/reviews/summaryReviews';
import Reviews from '../../../../../../components/reviews/reviews';
import { CSSTransition } from 'react-transition-group';
const inicialDescription: Idescription = {
  dimensiones: {
    Alto: undefined,
    Ancho: undefined,
    Capacidad: undefined,
    Largo: undefined,
    Largo_de_la_manguera: undefined,
    Peso: undefined,
    Tamaño: undefined,
  },
  especificaciones: {
    Amperaje: undefined,
    Aspira_líquidos: '',
    Características: '',
    Color: '',
    Consumo: undefined,
    Cantidad_contenida_en_el_empaque: '',
    Garantía_Producto: '',
    Inalambrico: '',
    Incluye: '',
    Material: '',
    Modelo: '',
    País_de_Origen: '',
    Pila: '',
    Potencia: undefined,
    Tipo: '',
    Tipo_de_aspiradora: '',
    Uso_de_Herramienta: '',
    Voltaje: undefined,
  },
};

function DetailProduct() {
  const { id } = useParams();
  const [getProduct, { data, loading }] = useLazyQuery(getProductById);
  const [pictures, setPictures] = useState<string[]>([]);
  const [showImg, setShowImg] = useState<string>('');
  const [hImg, setHImg] = useState<string>('100px');
  const [description, setDescription] = useState<Idescription>(inicialDescription);
  const [randomDescription, setRandomDescription] = useState<(string | undefined)[]>([]);
  const [showReviews, setShowReviews] = useState<boolean>(false);
  console.log('🚀 ~ DetailProduct ~ data:', data);
  useEffect(() => {
    getProduct({ variables: { id: id } });
    const temPictures = data?.FindOneproduct?.extraPicture || [];
    setPictures([data?.FindOneproduct?.picture, ...temPictures]);
    setShowImg(data?.FindOneproduct?.picture);
    setDescription(JSON.parse(data?.FindOneproduct?.description || '{}'));
  }, [data, getProduct]);
  useEffect(() => {
    if (pictures.length > 1) {
      const baseHeight = 500 / pictures.length;
      const heightWithOffset = baseHeight - 8; // Restar 2rem (32px)
      setHImg(`${heightWithOffset}px`);
    }
  }, [pictures.length]);
  useEffect(() => {
    const arrayVal = [];
    if (!description.dimensiones || !description.especificaciones) return;
    for (const [key, value] of Object.entries(description.dimensiones)) {
      if (value && value.toString().length < 15) {
        arrayVal.push(`${key}: ${value}`);
      }
    }
    for (const [key, value] of Object.entries(description.especificaciones)) {
      if (value && value.toString().length < 15) {
        arrayVal.push(`${key}: ${value}`);
      }
    }
    if (arrayVal.length > 5) {
      const indexCont: number[] = [];
      while (indexCont.length < 5) {
        const randomIndex = Math.floor(Math.random() * arrayVal.length);
        if (!indexCont.includes(randomIndex)) {
          indexCont.push(randomIndex);
        }
      }
      setRandomDescription(arrayVal.filter((_, index) => indexCont.includes(index)));
    } else {
      setRandomDescription(arrayVal);
    }
  }, [description]);

  return (
    <div className='w-fit flex justify-center my-3 py-3 pb-10 bg-Black-full px-5 '>
      {loading ? (
        <div className='w-[50%]'>
          <Lottie animationData={animation} />
        </div>
      ) : (
        <section className='flex justify-center gap-[30px] w-full flex-col'>
          <div className='flex justify-center gap-[30px] w-full'>
            <section className='flex flex-col gap-3'>
              <div className='flex  gap-3 py-2'>
                <div className='flex flex-col gap-2'>
                  {pictures.map((picture, i) => (
                    <img
                      key={i}
                      src={picture}
                      alt={i.toString()}
                      className={`w-[100px]  cursor-pointer rounded-lg`}
                      style={{ height: hImg }}
                      onMouseEnter={() => setShowImg(picture)}
                    />
                  ))}
                </div>
                <img src={showImg} alt='major' className='w-[500px] h-[500px] rounded-xl' />
              </div>

              <div className='flex flex-col gap-2 max-w-[600px]'>
                {description.dimensiones && Object.keys(description.dimensiones).length > 0 && (
                  <div className='flex flex-col '>
                    <p className='text-zeus-50 text-lg '>Dimensiones:</p>
                    <div className={styled.description}>
                      {Object.entries(description.dimensiones).map(([key, value]) => (
                        <div key={key} className='flex items-center'>
                          <p className='text-Black-full font-bold bg-zeus-200 w-[180px] p-1'>
                            {key}
                          </p>
                          <p className='text-zeus-50 text-sm pl-2'>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {description.especificaciones &&
                  Object.keys(description.especificaciones).length > 0 && (
                    <div className='flex flex-col gap-2'>
                      <p className='text-zeus-50 text-lg '>Especificaciones:</p>
                      <div className={styled.description}>
                        {Object.entries(description.especificaciones).map(([key, value]) => (
                          <div key={key} className='flex items-center'>
                            <p className='text-Black-full justify-start font-bold bg-zeus-200 min-w-[180px] p-1 h-full flex items-center '>
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className='text-zeus-50 text-sm text-balance pl-2 '>{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            </section>
            <section className='flex flex-col gap-3'>
              <div className='flex flex-col gap-3 mt-3 border-solid border-2 border-bright-sun-600 p-2 rounded w-[450px] h-fit'>
                <p className='text-lg font-bold text-left '>
                  {data?.FindOneproduct?.brand.name.toUpperCase()}
                </p>
                <p className='text-xl  text-left pr-2 '>{data?.FindOneproduct?.name}</p>
                <div className='flex gap-1'>
                  <p className='text-sm  text-end  '>5</p>
                  <FaStar className='text-bright-sun-400' />
                  <FaStar className='text-bright-sun-400' />
                  <FaStar className='text-bright-sun-400' />
                  <FaStar className='text-bright-sun-400' />
                  <FaStar className='text-bright-sun-400' />
                  <p className='text-sm  text-end '>(500)</p>
                </div>
                <p className='text-base  text-left line-through'>
                  {data?.FindOneproduct?.referencePrice &&
                    data?.FindOneproduct?.referencePrice.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}
                </p>
                <p className='text-3xl  text-left '>
                  {data?.FindOneproduct?.sellingPrice.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </p>
                {Number(data?.FindOneproduct?.sellingPrice) > 100000 && (
                  <p className='text-sm  text-left '>
                    <b className='text-bright-sun-600 text-base'>Envío gratis</b> a todo el país
                    Conoce los tiempos y las formas de envío.
                    <br />{' '}
                    <a href='#' className='text-bright-sun-300 cursor-pointer'>
                      {' '}
                      Calcular cuándo llega{' '}
                    </a>
                  </p>
                )}
                <p className='text-base  text-left '>Especificaciones principales</p>
                {randomDescription.map((d, i) => (
                  <ul key={i} className='text-sm ml-3'>
                    <li className='list-disc'>{d && d.replace(/_/g, ' ')}</li>
                  </ul>
                ))}
              </div>
              <div className='flex flex-col gap-4 mt-3 border-dashed border-2 border-bright-sun-600 p-2 rounded max-w-[450px] h-fit'>
                <article className='flex gap-1 items-center'>
                  <span>
                    <CiMedal className='text-bright-sun-600 w-[50px] h-[70px]' />
                  </span>
                  <div>
                    <h3>Satisfacción Garantizada</h3>
                    <p className='text-balance text-sm'>
                      Puedes devolver este producto en un plazo máximo de 30 días, éste debe estar
                      en perfecto estado: sin uso, tener todos sus accesorios, manuales y embalaje
                      original.{' '}
                    </p>
                  </div>
                </article>
              </div>
              <div className='mt-4 max-w-[450px]'>
                <h2>En combo es más vacano.</h2>
                <div className='flex flex-wrap gap-2 w-full'>
                  <Sets />
                  <Sets />
                  <Sets />
                  <Sets />
                  <Sets />
                  <Sets />
                </div>
              </div>
            </section>
          </div>

          <section>
            <div className='bg-zeus-200 text-Black-full rounded '>
              <h2 className='pl-3 pt-3 w-fit'>Reseñas de los clientes.</h2>
              <SumaryReviews showReviews={showReviews} setShowReviews={setShowReviews} />
              <CSSTransition in={showReviews} timeout={300} classNames='fade' unmountOnExit>
                <Reviews />
              </CSSTransition>
            </div>
          </section>
        </section>
      )}
    </div>
  );
}

export default DetailProduct;
