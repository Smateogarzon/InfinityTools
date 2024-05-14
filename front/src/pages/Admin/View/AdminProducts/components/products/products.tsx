import { useState } from 'react';
import styled from './products.module.css';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

function Products() {
  const [status, setStatus] = useState(true);
  return (
    <div className='w-[85%] flex justify-center mt-3 min-h-[500px] max-h-[650px]'>
      <div className={styled.table}>
        <table className='w-[100%] text-center'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Descuento</th>
              <th>Categoria</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>hola</td>
              <td>hola</td>
              <td>hola</td>
              <td>hola</td>
              <td className='w-[300px]'>
                <div className='flex justify-center gap-x-[25px]'>
                  <div className='flex justify-center w-[85px]'>
                    <input
                      type='checkbox'
                      id='checkbox'
                      name='checkbox'
                      className={styled.checkboxRound}
                      onClick={() => setStatus(!status)}
                    />
                    <p>{status ? 'Activo' : 'Inactivo'}</p>
                  </div>
                  <MdEdit />
                  <MdDeleteForever />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;
