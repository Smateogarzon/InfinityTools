import logo from '../../../../assets/logo.png';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsLinkedin } from 'react-icons/bs';
import { BsInstagram } from 'react-icons/bs';

export default function Footer() {
  return (
    <div className='w-full bg-[#000000] flex flex-wrap [&>*]:max-w-[400px] [&>*]:w-full [&>*]:h-[120px] justify-center text-center'>
      <div>
        <img width={100} src={logo}></img>
        <p>Infinity Tools</p>
        <p>©2024. Todos los derechos reservados.</p>
      </div>

      <div>
        <p>Contacto</p>
        <ul>
          <li>correo@empresa.com</li>
          <li>+56 65 7845-5843</li>
        </ul>
      </div>

      <div>
        <p>Nuestras redes</p>
        <ul>
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
