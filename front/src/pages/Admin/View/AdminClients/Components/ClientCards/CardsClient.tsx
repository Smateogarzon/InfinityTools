import CardClient from '../ClientCard/CardClient';
import { UserInfo } from '../../interfaces';
import Lottie from 'lottie-react';
import animationData from '../../../../../../assets/Animation - 1714697021815.json';

interface Props {
  FindAllusers: UserInfo[] | undefined;
  loading: boolean;
  error?: Error;
}

function CardsClient({ FindAllusers, loading, error }: Props) {
  return (
    <div className='flex flex-wrap justify-center ml-[225px]'>
      {loading === true && (
        <div>
          <Lottie animationData={animationData} />
        </div>
      )}
      {error === undefined ? (
        FindAllusers &&
        FindAllusers.map((client: UserInfo, i: number) => (
          <CardClient
            key={i}
            _id={client._id}
            firtsName={client.firtsName}
            rol={client.rol}
            status={client.status}
            picture={client.picture}
            date={client.date}
          />
        ))
      ) : (
        <div>Intentalo de Nuevo</div>
      )}
    </div>
  );
}

export default CardsClient;
