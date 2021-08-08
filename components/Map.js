import { getCenter } from 'geolib';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import house from '../public/house.svg'
import Image from 'next/image'

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocations] = useState()

    const coordinates = searchResults.map((res) => (
        {
            longitude: res.long,
            latitude: res.lat
        }
    ));
    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 13,
        width: "100%",
        height: "100%"
    });


    return (
        <ReactMapGL
            mapStyle='mapbox://styles/yabani/cks33tuux7jcy18qgd76wqjgw'
            mapboxApiAccessToken={process.env.mapbox_key}
            {...viewport}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {searchResults.map(res => (
                <div key={`${res.long}${res.lat}`}>
                    <Marker
                        longitude={res.long}
                        latitude={res.lat}
                        offsetLeft={-20}
                        offsetTop={-10}

                    >
                        <Image className="cursor-pointer animate-bounce" src={house} />


                    </Marker>
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
