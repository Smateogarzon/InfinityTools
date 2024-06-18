import { userInfoProfile } from '../../../../pages/Admin/View/AdminClients/graphql/querys';
import { useQuery } from '@apollo/client';
import animation from '../../../../assets/Animation - 1714697021815.json';
import Lottie from 'lottie-react';

function Profile() {
  const { data, loading } = useQuery(userInfoProfile);
  console.log('🚀 ~ Profile ~ data:', data);
  return (
    <div className='w-full flex justify-center min-h-[700px]'>
      {loading ? (
        <Lottie animationData={animation} className='w-[300px] h-[300px]' />
      ) : (
        <div className='flex flex-col gap-2'>
          <section className='mt-10'>
            <img
              src={data?.FindOneuser?.picture}
              alt='profilePicture'
              className='w-[150px] h-[150px] rounded'
            />
          </section>

          <section className='flex w-full justify-center'>
            <h1 className='text-3xl'>
              {data?.FindOneuser?.firtsName}&nbsp;{data?.FindOneuser?.MiddleName}&nbsp;
              {data?.FindOneuser?.lastName}&nbsp;{data?.FindOneuser?.MiddleLastName}
            </h1>
          </section>
        </div>
      )}
    </div>
  );
}

export default Profile;
