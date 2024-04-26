import CardClient from '../ClientCard/CardClient';

interface Client {
  id: number;
  imgClient: string;
  name: string;
  status: boolean;
  date: string;
  rol: string;
}

function CardsClient() {
  const clients: Client[] = [
    {
      id: 1,
      imgClient:
        'https://img.freepik.com/fotos-premium/chico-anime-sudadera-capucha-fondo-azul_721243-709.jpg?w=360',
      name: 'Nombre Aleatorio 1',
      status: true,
      date: '16/10/2005',
      rol: 'Administrador',
    },
    {
      id: 2,
      imgClient:
        'https://static.vecteezy.com/system/resources/thumbnails/033/662/051/small_2x/cartoon-lofi-young-manga-style-girl-while-listening-to-music-in-the-rain-ai-generative-photo.jpg',
      name: 'Nombre Aleatorio 2',
      status: true,
      date: '12/12/2000',
      rol: 'Administrador',
    },
    {
      id: 3,
      imgClient:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxTw0FB9aw4YuiL4z8kagB9vA4bsvL-qTl5-8N658kHw&s',
      name: 'Nombre Aleatorio 3',
      status: true,
      date: '19/05/1996',
      rol: 'Mayorista',
    },
    {
      id: 4,
      imgClient:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGowNAAPNyuDfPyYSmT8_JkQyibSEAzhwIYFo8wmoWqw&s',
      name: 'Nombre Aleatorio 4',
      status: false,
      date: '12/12/1993',
      rol: 'Usuario',
    },
    {
      id: 5,
      imgClient: 'https://i1.sndcdn.com/avatars-sqpFyHHydfkys2TW-eUwhog-t500x500.jpg',
      name: 'Nombre Aleatorio 5',
      status: true,
      date: '12/10/2001',
      rol: 'Usuario',
    },
    {
      id: 6,
      imgClient: 'https://images.dpsmiles.net/computer-night-black-euddp.jpg',
      name: 'Nombre Aleatorio 6',
      status: true,
      date: '03/02/2003',
      rol: 'Usuario',
    },
    {
      id: 7,
      imgClient: 'https://pics.craiyon.com/2023-07-09/48803dc6e4ce481e82c8f0d365c69a48.webp',
      name: 'Nombre Aleatorio 7',
      status: true,
      date: '12/12/1990',
      rol: 'Usuario',
    },
    {
      id: 8,
      imgClient: 'https://i.pinimg.com/originals/5c/c5/d7/5cc5d769b2e18ca8a4423a2dabf442bc.jpg',
      name: 'Nombre Aleatorio 8',
      status: false,
      date: '12/11/2000',
      rol: 'Usuario',
    },
    {
      id: 9,
      imgClient: 'https://pm1.aminoapps.com/6208/5cb7beeba9199362a6c449cfcabfe6e6b146dc99_00.jpg',
      name: 'Nombre Aleatorio 9',
      status: true,
      date: '12/12/2005',
      rol: 'Mayorista',
    },
  ];
  return (
    <div className='flex flex-wrap justify-center ml-[225px]'>
      {clients.map((client) => (
        <CardClient
          key={client.id}
          imgClient={client.imgClient}
          name={client.name}
          status={client.status}
          date={client.date}
          rol={client.rol}
        />
      ))}
    </div>
  );
}

export default CardsClient;
