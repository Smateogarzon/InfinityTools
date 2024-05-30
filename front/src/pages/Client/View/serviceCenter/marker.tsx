import { useState } from 'react';
import { AdvancedMarker, InfoWindow, Pin, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';

export const MarkerWithInfowindow = ({
  label,
  position,
  linkUrl,
  direction,
  color,
  marca,
  telefono,
}: {
  label: string;
  position: { lat: number; lng: number };
  linkUrl: string;
  direction: string;
  color?: string;
  marca?: string;
  telefono?: string;
}) => {
  const [infowindowOpen, setInfowindowOpen] = useState(false);
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        onClick={() => setInfowindowOpen(true)}
        position={position}
        title={'AdvancedMarker that opens an Infowindow when clicked.'}>
        <Pin background={color} borderColor={'#006425'} glyphColor={'#000000'} />
      </AdvancedMarker>
      {infowindowOpen && (
        <InfoWindow
          anchor={marker}
          maxWidth={200}
          onCloseClick={() => setInfowindowOpen(false)}
          style={{ color: 'black' }}>
          <h3>{label}</h3>
          <p>{direction}</p>
          <p>{telefono}</p>
          <p className='font-bold'>{marca}</p>
          <a href={linkUrl}>LLevame</a>
        </InfoWindow>
      )}
    </>
  );
};
