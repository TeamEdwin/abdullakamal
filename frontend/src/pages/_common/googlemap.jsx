import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

export default function GoogleMaps() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 26.2285087, lng: 50.58164 }), []);

  const showInMapClicked = () => {
    window.open("https://goo.gl/maps/WVs2FtEJr2bk2JYm6");
  };

  return (
    <GoogleMap zoom={9} center={center} mapContainerClassName="map-container">
      <Marker position={center} onClick={showInMapClicked} />
    </GoogleMap>
  );
}
