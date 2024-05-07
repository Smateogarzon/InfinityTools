import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';

export default function Footer() {
  return (
    <div className='w-full p-10 bg-[#000000] flex flex-wrap [&>*]:max-w-[400px] [&>*]:w-full  justify-center text-center gap-7'>
      <div>
        <img width={180} src='https://storage.googleapis.com/pictures_infinity/logo.png'></img>
        <p>Infinity Tools</p>
        <p>©2024. Todos los derechos reservados.</p>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p>Contacto</p>
        <ul>
          <li>correo@empresa.com</li>
          <li>+56 65 7845-5843</li>
        </ul>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <p>Nuestras redes</p>
        <ul className='flex justify-center gap-5 mt-2'>
          <li>
            <BsFacebook />
          </li>
          <li>
            <BsTwitter />
          </li>
          <li>
            <BsLinkedin />
          </li>
          <li>
            <BsInstagram />
          </li>
        </ul>
      </div>
    </div>
  );
}
