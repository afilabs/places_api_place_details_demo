import React, { useEffect } from "react";
import { Map as GMap, Marker, useMap } from "@vis.gl/react-google-maps";

const Map = ({ selectedPlace }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace && map) {
      const { latitude, longitude } = selectedPlace;
      map.panTo({ lat: latitude, lng: longitude });
    }
  }, [selectedPlace, map]);

  return (
    <GMap
      defaultCenter={{ lat: 49.2569501547411, lng: -123.11058970045666 }}
      defaultZoom={12}
      disableDefaultUI
    >
      {selectedPlace && (
        <Marker
          position={{
            lat: selectedPlace.latitude,
            lng: selectedPlace.longitude,
          }}
        />
      )}
    </GMap>
  );
};

export default Map;
