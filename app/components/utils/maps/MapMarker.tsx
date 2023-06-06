'use client'
import { useState } from 'react'
import ReactMapGL, { Layer, Marker, Popup } from "react-map-gl";
import { GrLocationPin } from 'react-icons/gr'

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

interface MapMarkerProps {
  newPlace: object | null;
  setNewPlace:  React.Dispatch<React.SetStateAction<null>>;
}

const MapMarker:React.FC<MapMarkerProps> = ({newPlace, setNewPlace}) =>  {
  // const [newPlace, setNewPlace] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 23.8315,
    longitude: 91.2868,
    zoom: 12
  })

  const handleAddClick = (e) => {
    const [longitude, latitude] = e.lngLat;
    setNewPlace({
      lat: latitude,
      long: longitude,
    });
  };

  return (
    <div id="app" style={{ height: "100%", width: "100%", zIndex: 999 }}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoicmVudG1lcm9vbSIsImEiOiJjbGlpdm9ld2IwMmIwM3JxcThwcjloZWdvIn0.8dgK3-o6R4Fg997NVE3m6Q"
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/rentmeroom/ckz1nnvvz006a14o21ik2wpbg"
        onViewportChange={(viewport) => setViewport(viewport)}
        onDblClick={handleAddClick}
      >
        {newPlace && (
          <Marker
            latitude={newPlace.lat}
            longitude={newPlace.long}
            offsetLeft={-20}
            offsetTop={-20}
            draggable
            onDragEnd={handleAddClick}
          >
            <GrLocationPin style={{color: "red", fontSize: `${viewport.zoom * 2}px`}} />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  )
}

export default MapMarker
