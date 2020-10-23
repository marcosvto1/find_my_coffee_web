import React, { Fragment, useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import EstablishmentService from "./services/establishment_service";
import Establishment from './components/Establishment';
import NeartsCoffess from "./components/Establishment/NearstCoffees";

const { REACT_APP_GOOGLE_API_KEY } = process.env;

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [establishments, setEstablishments] = useState([]);
  const [selected, setSelected] = useState({});

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(
      function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        loadCoffeeEstablishments();
      },
      function (err) {
        alert("Habilite a localização para usar esse app");
      }
    );
  }

  async function loadCoffeeEstablishments() {
    const response = await EstablishmentService.index(latitude, longitude);
    setEstablishments(response.data.results);
  }

  useEffect(() => {
    setCurrentLocation();
  }, []);

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ height: "100vh", width: "100%" }}
          zoom={15}
          center={{ lat: latitude, lng: longitude }}
        >
          {establishments.map((item, indexForKey) => {
            return (
              <Marker
                key={indexForKey}
                title={item.name}
                icon="/images/coffee-pin.png"
                animation="4"
                onClick={() => setSelected(item)}
                position={{
                  lat: item.geometry.location.lat,
                  lng: item.geometry.location.lng,
                }}
              />
            );
          })}

          {
            selected.place_id && (
              <Establishment place={selected} />
            )
          }

          <Marker
            key="user_location"
            title="Onde estou"
            icon="/images/my-location-pin.png"
            animation="2"
            position={{ lat: latitude, lng: longitude }}
          />
          { (latitude !== 0 && longitude !== 0 ) && (<NeartsCoffess latitude={latitude} longitude={longitude} /> ) }
      
        </GoogleMap>

      </LoadScript>
    </Fragment>
  );
}

export default App;
