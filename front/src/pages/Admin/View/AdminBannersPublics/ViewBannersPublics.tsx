import { useMutation } from '@apollo/client';
import ViewBanners from './ViewBanners';
import { CreateBanners, deleteBData } from './graphql/query';
import { Bounce, toast } from 'react-toastify';
import { useState } from 'react';
import {
  Backdrop,
  Box,
  Fade,
  Input,
  Modal,
  Typography,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
} from '@mui/material';
import animation from '../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';
import { useQuery } from '@apollo/client';
import { getBanners } from './graphql/query';
const mapSections = [
  { name: 'Banner principal Home', only: true },
  { name: 'Carrusel 1 Home', only: false },
  { name: 'Carrusel 2 Home', only: false },
  { name: 'Carrusel de marcas', only: false },
];
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'Black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ViewBannersPublics() {
  const [create, { loading }] = useMutation(CreateBanners);
  const [dBanner] = useMutation(deleteBData);
  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
  const handleOpenD = () => setOpenD(!openD);
  const handleOpen = () => setOpen(!open);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [errors, setErrors] = useState({
    name: '',
  });
  const [selectedImage, setSelectedImage] = useState('');
  const [showModal, setShowModal] = useState<boolean[]>([false, false, false, false]);
  const response = useQuery(getBanners);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setErrors({
      ...errors,
      name:
        event.target.value === ''
          ? 'El nombre es requerido'
          : event.target.value.includes('.')
            ? 'El nombre no puede contener puntos'
            : '',
    });
  };
  const handleImageChangeD = (event: SelectChangeEvent) => {
    setSelectedImage(event.target.value);
  };
  const deleteBanners = async () => {
    try {
      await dBanner({ variables: { updateBannerInput: { name: selectedImage } } });
      response.refetch();
      handleOpenD();
      setSelectedImage('');
      notify2('imagen eliminada correctamente');
      /*eslint-disable*/
    } catch (error: any) {
      notify(error.message as Error);
    }
  };
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
  const createBanner = async () => {
    try {
      if (errors.name !== '' || image === null) {
        notify(new Error(errors.name || 'La imagen es requerida'));
        return;
      }

      await create({ variables: { createBannerInput: { name: selectedOption }, image } });
      setImage(null);
      setImagePreview(null);
      setSelectedOption('');
      notify2('imagen cargada correctamente');
      response.refetch();
      handleOpen();
    } catch (error: any) {
      notify(error.message as Error);
    }
  };
  const cancel = () => {
    setImage(null);
    setImagePreview(null);
    setSelectedOption('');
    handleOpen();
  };
  const showModals = (i: number) => {
    setShowModal(showModal.map((e, index) => (i === index ? !e : false)));
  };

  return (
    <div className='flex flex-col items-center  ml-[225px] mt-5 h-screen overflow-y-auto'>
      <h1>Vista de Banners de la pagina</h1>
      <div className='border-solid border-[3px] border-bright-sun-600 flex w-full mt-5 justify-between py-5'>
        <div className='w-1/2 flex flex-col items-start pt-3 gap-3'>
          {mapSections.map((e, i) => (
            <ViewBanners
              key={i}
              nameSection={e.name}
              onLy={e.only}
              data={response?.data}
              showModals={showModals}
              index={i}
              showModal={showModal}
            />
          ))}
        </div>
        <div className='flex flex-col pr-8 gap-10 mt-5'>
          <button
            onClick={handleOpen}
            className=' bg-bright-sun-100 hover:bg-bright-sun-800 text-white text-lg font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
            Agregar una nueva imagen
          </button>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={open}
            onClose={handleOpen}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={open}>
              {loading ? (
                <Lottie animationData={animation} loop={true} className='w-[100px] h-[100px]' />
              ) : (
                <Box sx={style}>
                  <Typography id='transition-modal-title' variant='h6' component='h2'>
                    Añade una nueva imagen
                  </Typography>
                  <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                    Carga una imagen:
                  </Typography>
                  <Input type='file' onChange={handleImageChange} sx={{ mt: 2 }} />
                  {imagePreview && (
                    <Box
                      component='img'
                      sx={{
                        mt: 2,
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'cover',
                      }}
                      src={imagePreview}
                      alt='Vista previa de la imagen'
                    />
                  )}
                  <Typography id='name' sx={{ mt: 2 }}>
                    Nombre de la imagen:
                  </Typography>
                  <Input
                    type='text'
                    onChange={handleSelectChange}
                    sx={{
                      bgcolor: 'grey',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      border: '1px solid white',
                      '&:hover': {
                        borderColor: 'white',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'white',
                      },
                    }}
                  />
                  {errors.name && (
                    <Typography id='error' sx={{ color: 'red', mt: 2 }}>
                      {errors.name}
                    </Typography>
                  )}
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant='contained' color='primary' onClick={createBanner}>
                      Guardar
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={cancel}>
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              )}
            </Fade>
          </Modal>
          <button
            onClick={handleOpenD}
            className=' bg-bright-sun-100 hover:bg-bright-sun-800 text-white text-lg font-bold py-2 px-4 rounded cursor-pointer text-[#fff]'>
            Eliminar una imagen
          </button>
          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={openD}
            onClose={handleOpenD}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}>
            <Fade in={openD}>
              {loading ? (
                <Lottie animationData={animation} loop={true} className='w-[100px] h-[100px]' />
              ) : (
                <Box sx={style}>
                  <Typography id='transition-modal-title' variant='h6' component='h2'>
                    Elimina una imagen
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Select
                      value={selectedImage}
                      onChange={handleImageChangeD}
                      displayEmpty
                      fullWidth
                      sx={{
                        backgroundColor: 'lightgray',
                        '& .MuiSelect-select': {
                          fontWeight: 'bold',
                        },
                      }}>
                      <MenuItem value='' disabled>
                        Selecciona una imagen
                      </MenuItem>
                      {response?.data?.Allbanners.map((image: any) => (
                        <MenuItem key={image.name} value={image.name}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <img
                              src={image.picture}
                              alt={image.name}
                              style={{ width: 40, height: 40 }}
                            />
                            <Typography>{image.name}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Button variant='contained' color='primary' onClick={deleteBanners}>
                      Guardar
                    </Button>
                    <Button
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        handleOpenD();
                        setSelectedImage('');
                      }}>
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              )}
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ViewBannersPublics;
