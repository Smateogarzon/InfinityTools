import { FaTruckFast } from 'react-icons/fa6';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa6';
import { BiSupport } from 'react-icons/bi';
import { FaBoxArchive } from 'react-icons/fa6';
import style from './InfoCards.module.css';

export default function InfoCards() {
  return (
    <div
      className='mt-[75px] pb-[75px] flex flex-wrap justify-center items-center w-full  gap-10
      [&>div]:flex [&>div]:flex-col [&>div]:justify-around [&>div]:w-[325px] [&>div]:h-[250px] [&>div]:text-center [&>div]:rounded-xl [&>div]:p-3 [&>div]:text-balance
      [&>div>p]:text-balance 
      [&>div>div]:text-5xl '>
      <div className={style.cardsInfo}>
        <p>ENVÍOS A TODO EL PAÍS</p>
        <div>
          <FaTruckFast />
        </div>
        <p>Los costos de envío dependen de la zona a la que se dirige</p>
      </div>

      <div className={style.cardsInfo}>
        <p>COMPRA A CRÉDITO</p>
        <div>
          <BsCreditCard2BackFill />
        </div>
        <p>Tenemos sistema de crédito automático por compras superiores a $50.000</p>
      </div>

      <div className={style.cardsInfo}>
        <p>MÉTODOS DE PAGO CONFIABLES</p>
        <div>
          <FaWallet />
        </div>
        <p>
          Contamos con pasarela de pago que te facilita hacer tu compra a través de diferentes
          medios
        </p>
      </div>

      <div className={style.cardsInfo}>
        <p>SOPORTE</p>
        <div>
          <BiSupport />
        </div>
        <p>
          Estamos a su disposición de Lunes a Viernes de 8:00 AM a 6:00 PM y Sábados de 9:00 AM a
          12:30 PM, para resolverle sus inquietudes.
        </p>
      </div>

      <div className={style.cardsInfo}>
        <p>DEVOLUCIONES</p>
        <div>
          <FaBoxArchive />
        </div>
        <p>
          {
            'Aceptamos Devoluciones hechas dentro de los cinco (5) días hábiles siguientes a la entrega del producto. Ver requisitos en Términos y Condiciones del Contrato de Compraventa en linea.'
          }
        </p>
      </div>
    </div>
  );
}
