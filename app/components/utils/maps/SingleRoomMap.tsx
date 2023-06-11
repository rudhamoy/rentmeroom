'use client'
import ReactMapGL, { Marker} from "react-map-gl";
import { GrLocationPin } from 'react-icons/gr'
import "mapbox-gl/dist/mapbox-gl.css"

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN

interface SingleRoomMapProps {
  longitude: number;
  latitude:  number;
}

const SingleRoomMap:React.FC<SingleRoomMapProps> = ({longitude, latitude}) =>  {

  return (
    <div id="app" style={{ height: "100%", width: "100%", zIndex: 999 }}>
      <ReactMapGL
        longitude={longitude}
        latitude={latitude}
        zoom={15}
        mapboxApiAccessToken={TOKEN}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/rentmeroom/ckz1nnvvz006a14o21ik2wpbg"
      >
        {(longitude && latitude) && (
          <Marker
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <GrLocationPin style={{color: "red", fontSize: `${15 * 2}px`}} />
          </Marker>
        )}
      </ReactMapGL>
    </div>
  )
}

export default SingleRoomMap
