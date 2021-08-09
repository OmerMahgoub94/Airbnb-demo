import { getCenter } from 'geolib';
import { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import house from '../public/house.svg'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/solid';
import { HeartIcon } from '@heroicons/react/outline';

function Map({ searchResults }) {
    const [selectedLocation, setSelectedLocation] = useState({})

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

    console.log('selected', selectedLocation)

    return (
        <ReactMapGL onClick={() => setSelectedLocation({})}
            mapStyle='mapbox://styles/yabani/cks33tuux7jcy18qgd76wqjgw'
            mapboxApiAccessToken={process.env.mapboxKey}
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
                        <p className="h-7 w-7 cursor-pointer animate-bounce"
                            onClick={() => setSelectedLocation(res)}
                            aria-label="push-house-icon"
                            role="img"
                        >
                            <Image src={house} />

                        </p>
                    </Marker>
                    {/* Marker popup  */}
                    {selectedLocation.long === res.long ? (
                        <Popup className="z-50"
                            onClose={() => setSelectedLocation({})}
                            closeOnClick={true}
                            latitude={res.lat}
                            longitude={res.long}
                        >
                            <div className="relative flex flex-col bg-white pb-2 border rounded-tl-2xl	rounded-tr-2xl">
                                <div className="relative flex-grow  h-40 w-100%">
                                    <Image src={res.img} className="rounded-tl-2xl	rounded-tr-2xl"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <HeartIcon className="fixed h-5 cursor-pointer right-5 top-1/4 fill-current text-red-400" />

                                </div>
                                <div className="flex-grow pt-2 px-2">
                                    <div className="flex flex-row items-center pb-1">

                                        <StarIcon className=" h-4 text-red-400" />

                                        <p className="text-sm">
                                            {res.star}
                                        </p>
                                    </div>

                                    <h1 className="text-sm font-thin">{res.title}</h1>
                                    <p className="text-sm font-thin">{res.location}</p>
                                    <p className="pt-1">{res.price}</p>
                                </div>
                            </div>
                        </Popup>
                    ) : (false)}
                </div>
            ))}

        </ReactMapGL>
    )
}

export default Map
