import { useEffect, useState } from 'react';
import { FaAngleDoubleDown } from 'react-icons/fa';
import { deleteBanner, findImg, updateBanner } from './graphql/query';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Bounce, toast } from 'react-toastify';
import { IoCloseSharp } from 'react-icons/io5';
function ViewBanners({
  nameSection,
  onLy,
  data,
  showModals,
  index,
  showModal,
}: {
  nameSection: string;
  onLy: boolean;
  data: any; // eslint-disable-line
  index: number;
  showModals: (i: number) => void;
  showModal: boolean[];
}) {
  const [imageSelected, setImageSelected] = useState<string>('');
  const [uBanners] = useMutation(updateBanner);
  const [delBanner] = useMutation(deleteBanner);

  const [getImges, response] = useLazyQuery(findImg);

  const notify = (e: Error) =>
    toast.warn(`${e}`, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  const notify2 = (e: string) =>
    toast.success(e, {
      position: 'top-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      transition: Bounce,
    });
  useEffect(() => {
    getImges({
      variables: {
        search: nameSection,
      },
    });
  }, [getImges, nameSection]);
  const handleChange = (e: string) => {
    setImageSelected(e);
  };
  const handleUpdate = async () => {
    try {
      const arraySplit = imageSelected.split('.');
      await uBanners({
        variables: {
          updateBannerInput: {
            name: arraySplit[0],
            label: arraySplit[1],
            only: onLy,
          },
        },
      });
      await response.refetch({
        search: nameSection,
      });
      notify2('imagen vinculada correctamente');
      setImageSelected('');
      /*eslint-disable*/
    } catch (error: any) {
      notify(error.message as Error);
    }
  };
  const handleDelete = async (name: string, label: string) => {
    try {
      const { data } = await delBanner({
        variables: {
          updateBannerInput: {
            name: name,
            label: label,
          },
        },
      });
      await response.refetch({
        search: nameSection,
      });
      notify2(`${data?.removeBanner.name} eliminada correctamente`);
    } catch (error: any) {
      notify(error.message as Error);
    }
  };
  return (
    <div className='flex flex-col  justify-center pl-3' style={{ overflow: 'visible' }}>
      <h2 className=''>{nameSection}</h2>
      <div className='flex relative gap-1 items-center'>
        <div className='flex flex-col bg-Black-full rounded w-[300px] max-h-[250px] overflow-y-auto'>
          {response?.data?.bannerIMG.map((e: any, i: number) => {
            return (
              <div key={i} className='flex relative'>
                <img src={e.picture} alt={e.name} className='w-full h-[100px]' />
                <IoCloseSharp
                  className='absolute right-1 top-1 cursor-pointer bg-Red'
                  onClick={() => handleDelete(e.name, nameSection)}
                />
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            showModals(index);
          }}
          id='AllImages'
          className='relative pl-1 flex gap-1 items-center justify-center min-w-[300px] max-h-[30px] bg-athens-gray-600 rounded cursor-pointer hover:bg-athens-gray-700'>
          <p>Imagenes</p>
          <FaAngleDoubleDown />
          {showModal[index] && (
            <div className='absolute z-10 top-[100%] left-0 w-full max-h-[300px] overflow-y-scroll bg-Black-full'>
              {data?.Allbanners.map((e: any, i: number) => {
                return (
                  <div key={i} onClick={() => handleChange(`${e.name}.${nameSection}`)}>
                    <img src={e.picture} alt={e.name} className='w-full h-[100px]' />
                    <p>{e.name}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={() => {
            handleUpdate();
          }}
          disabled={imageSelected === ''}
          className={`p-1 rounded cursor-pointer text-white text-[15px] font-bold max-h-[30px] ${
            imageSelected === '' ? 'bg-gray-300' : 'bg-bright-sun-100 hover:bg-bright-sun-700'
          }`}>
          {onLy ? `cambiar imagen` : `agregar imagen`}
        </button>
      </div>
    </div>
  );
}

export default ViewBanners;
