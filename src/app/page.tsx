'use client';
import SelfLocationMarker from '@/components/SelfLocationMarker';
import { logger } from '@/utils/logger';
import { Map } from '@vis.gl/react-google-maps';
import { useRef, useState } from 'react';

const Home = () => {
  const currentLocation = useRef<{lat: number, lng: number}>(undefined);
  const isFirstRender = useRef(true);
  const [mapCenter, setMapCenter] = useState<{lat: number, lng: number}>({ lat: 35.6813, lng: 139.767066 });

  const getCurrentPosition = () => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.current = { 
          lat: position.coords.latitude, 
          lng: position.coords.longitude 
        };
        setMapCenter(currentLocation.current);
        logger('info', `Current location: ${currentLocation.current.lat}, ${currentLocation.current.lng}`, {
          calledBy: 'Home', 
          statusCode: 200
        });
      }, 
      (error) => {
        logger('error', error.message, {
          calledBy: 'Home', 
          statusCode: 500
        });
      }
    );
  };

  return (
    <Map
      defaultCenter={mapCenter}
      defaultZoom={16}
      minZoom={10}
      maxZoom={20}
      gestureHandling={'greedy'}
      disableDefaultUI={true}
      mapId={'main-map'}
      onIdle={getCurrentPosition}
      className='w-full h-full'>
        <SelfLocationMarker position={currentLocation.current}/>
    </Map>
  );
};

export default Home;