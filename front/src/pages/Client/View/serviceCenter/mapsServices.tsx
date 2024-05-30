import { useEffect, useState } from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MarkerWithInfowindow } from './marker';
import { initialCenter, MapProps } from './servicios';
const key = import.meta.env.VITE_GOOGLE_MAPS;
console.log('🚀 ~ key:', key);

function MapsServices() {
  const [ubications, setUbications] = useState<MapProps>(initialCenter);
  const [valSelect, setValSelect] = useState('');
  const [marcas, setMarcas] = useState<string[]>([]);
  /*eslint-disable */
  useEffect(() => {
    let set = new Set();
    if (ubications.markers) {
      ubications.markers.map((marker) => {
        marker.marca && set.add(marker.marca);
      });
      const marcas = Array.from(set) as string[];
      setMarcas(marcas);
    }
  }, []);
  /*eslint-enable */
  useEffect(() => {
    const markers = initialCenter.markers?.filter((marker) => {
      if (marker.marca === valSelect) {
        return marker;
      }
    });
    if (markers && markers?.length > 0) {
      setUbications({
        ...initialCenter,
        markers,
      });
    }
  }, [valSelect]);
  const handleReset = () => {
    setValSelect('');
    setUbications(initialCenter);
  };
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setValSelect(value);
  };
  return (
    <div className='w-full flex flex-col justify-center'>
      <div className='w-full flex justify-center mt-2 mb-4 gap-5 [&>select]:w-fit [&>select]:px-1 [&>select]:h-[35px] [&>select]:text-lg  *:bg-bright-sun-100 *:text-[#DBDBDB] *:rounded-lg *:cursor-pointer'>
        <button className='px-3 text-xl font-bold' onClick={handleReset}>
          Todas
        </button>
        <select
          name='Brands'
          id='brands'
          value={valSelect}
          onChange={handleSelect}
          className='px-3 font-bold'>
          <option value='' disabled>
            Todas
          </option>
          {marcas.length > 0 &&
            marcas.map((marker, index) => (
              <option key={index} value={marker}>
                {marker}
              </option>
            ))}
        </select>
      </div>
      <APIProvider apiKey={key}>
        <Map
          style={{ width: '100%', height: '500px' }}
          defaultCenter={ubications.initialCenter}
          defaultZoom={ubications.zoom}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          mapId={'1d9a7b7b2a9f9f1e'}>
          {ubications.markers &&
            ubications.markers.map((marker, index) => (
              <MarkerWithInfowindow
                key={index}
                label={marker.label}
                position={marker.position}
                linkUrl={marker.link}
                direction={marker.direction}
                color={marker.color}
                marca={marker.marca}
                telefono={marker.telefono}
              />
            ))}
        </Map>
      </APIProvider>
    </div>
  );
}

export default MapsServices;
