import React, { useEffect } from "react";
import { Map as GMap, useMap } from "@vis.gl/react-google-maps";
import Marker from "./Marker";

const Map = ({ place }) => {
  const mapInstance = useMap();

  useEffect(() => {
    if (place && mapInstance) {
      const { latitude, longitude } = place;
      mapInstance.panTo({ lat: latitude, lng: longitude });
    }
  }, [place, mapInstance]);

  return (
    <GMap
      defaultCenter={{ lat: 49.2569501547411, lng: -123.11058970045666 }}
      defaultZoom={12}
      disableDefaultUI
    >
      {place && <Marker place={place} />}
    </GMap>
  );
};

export default Map;
