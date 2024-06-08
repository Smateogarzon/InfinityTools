import { useMutation } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateGender } from './graphql/query';

function Register() {
  const [uGender, response] = useMutation(updateGender);
  const navigate = useNavigate();
  const { name } = useParams();
  const [gender, setGender] = useState('');
  const handleSubmit = () => {
    if (gender !== '') {
      uGender({ variables: { updateUserInput: { gender } } });
    }
  };
  useEffect(() => {
    if (response.data?.UpdateUser) {
      navigate('/?auth=google');
    }
  }, [response.data?.UpdateUser]);
  return (
    <div
      className='w-full h-screen flex items-center justify-center'
      style={{
        background:
          'url(https://e1.pxfuel.com/desktop-wallpaper/605/349/desktop-wallpaper-power-tools.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}>
      <div
        className='w-[315px] rounded flex flex-col items-center justify-center text-center text-white py-5 
    [&>select]:w-full [&>select]:px-1 [&>select]:h-[35px] [&>select]:text-base [&>select]:bg-bright-sun-500
        '
        style={{ background: 'rgba(0,0,0,0.75)' }}>
        <h2 className=''>
          ¡Hola {name} Bienvenido <br />a
        </h2>
        <img
          src='https://storage.googleapis.com/pictures_infinity/logo.png'
          alt='logo'
          className='w-[180px] '
        />
        <p className='text-lg text-balance'>
          Gracias por unirte a nuestra banda de amantes del poder eléctrico. Estamos listos para
          trabajar juntos. 💥🛠️
          <br />
        </p>
        <p className='text-base text-balance mt-2'>
          <strong> ¿podrías decirnos tu género?</strong> Esto nos ayudará a personalizar tu
          experiencia de compra. ¡Gracias! 🤘
        </p>
        <label htmlFor='genero' className='mt-2'>
          Género:
        </label>
        <select
          id='genero'
          name='genero'
          value={gender}
          onChange={(e) => setGender(e.target.value)}>
          <option value='' disabled>
            Selecciona tu genero
          </option>
          <option value='MALE'>Masculino</option>
          <option value='FEMALE'>Femenino</option>
          <option value='OTHER'>Otro</option>
        </select>
        <button
          type='submit'
          onClick={handleSubmit}
          className='w-80% mt-2 bg-bright-sun-600 hover:bg-bright-sun-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'>
          Registrarme:
        </button>
        {gender === '' && (
          <p className='text-base text-balance mt-2 text-Red'>
            Para continuar, por favor ingresa tu genero
          </p>
        )}
      </div>
    </div>
  );
}

export default Register;
