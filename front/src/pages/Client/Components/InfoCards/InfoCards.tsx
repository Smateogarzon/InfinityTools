import { FaTruckFast } from 'react-icons/fa6';
import { BsCreditCard2BackFill } from 'react-icons/bs';
import { FaWallet } from 'react-icons/fa6';
import { BiSupport } from 'react-icons/bi';
import { FaBoxArchive } from 'react-icons/fa6';

export default function InfoCards() {
  return (
    <div className='mt-[75px] pb-[75px] bg-gradient-to-b from-zeus-950 to-[#000000] w-full flex flex-wrap justify-evenly text-center [&>div]:shadow-lg [&>div]:relative [&>*>:last-child]:h-full [&>*>:last-child]:flex [&>*>:last-child]:items-center [&>*>:first-child]:mt-[10px] [&>*>:first-child] [&>*>:first-child]:font-bold [&>*>:first-child]:mb-[5px] [&>*>:first-child]:text-xl *:text-[#000000] *:font-medium *:p-[10px] *:w-[300px] *:h-[300px] *:bg-gradient-to-b *:from-bright-sun-500 *:to-bright-sun-700 *:m-[25px] *:rounded-2xl *:flex *:flex-col *:items-center *:justify-between [&>div>div>*]:w-[75px] [&>div>div>*]:h-[75px] [&>div>div]:mb-auto'>
      <div>
        <p>ENVÍOS A TODO EL PAÍS</p>
        <div>
          <FaTruckFast />
        </div>

        <p>Los costos de envío dependen de la zona a la que se dirige</p>
      </div>

      <div>
        <p>COMPRA A CRÉDITO</p>
        <div>
          <BsCreditCard2BackFill />
        </div>
        <p>Tenemos sistema de crédito automático por compras superiores a $50.000</p>
      </div>

      <div>
        <p>MÉTODOS DE PAGO CONFIABLES</p>
        <div>
          <FaWallet />
        </div>
        <p>
          Contamos con pasarela de pago que te facilita hacer tu compra a través de diferentes
          medios
        </p>
      </div>

      <div>
        <p>SOPORTE</p>
        <div>
          <BiSupport />
        </div>
        <p>
          Estamos a su disposición de Lunes a Viernes de 8:00 AM a 6:00 PM y Sábados de 9:00 AM a
          12:30 PM, para resolverle sus inquietudes.
        </p>
      </div>

      <div>
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
