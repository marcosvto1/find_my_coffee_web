import React, { useState, useEffect } from "react";
import EstablishmentService from "../../services/establishment_service";
import styled from "styled-components";

import Ratings from './Ratings';

const LeftBar = styled.div`
  height: 100%;
  overflow-y: auto;
  width: 250px;
  position: absolute;
  color: white;
  background-color: rgba(10, 10, 10, 0.9);
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  color: rgba(220, 110, 50, 0.7);
`;

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
`;

const Image = styled.img`
  height: 150px;
  width: 150px;
`;

const { REACT_APP_GOOGLE_API_KEY } = process.env;

export const Establisment = (props) => {
  const [establishment, setEstablishment] = useState([]);

  async function getEstablishmentInformation() {
    try {
      const response = await EstablishmentService.show(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment([]);
    }
  }

  useEffect(() => {
    getEstablishmentInformation();
  }, [props.place.place_id]);

  return (
    <LeftBar>
      {establishment.photos ? (
        <Image
          src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${establishment.photos[0].photo_reference}&key=${REACT_APP_GOOGLE_API_KEY}&maxwidth=400`}
          alt={"Coffe Photo"}
        />
      ) : (
        <Image src="/images/no_photo.jpg" alt="Coffee no Photo" />
      )}
      <Title>{establishment.name}</Title>
      {establishment.opening_hours ? (
        <>
          <div>
            {establishment.opening_hours.open_now === true
              ? "Aberto"
              : "Fechado"}
              <hr/>
          </div>
          {establishment.opening_hours.weekday_text.map(
            (schedule, indexForKey) => {
              return <Paragraph key={indexForKey}>{schedule}</Paragraph>;
            }
          )}
        </>
      ) : (
        <Paragraph>Não há cadastro de dias e horários abertos</Paragraph>
      )}
      <hr/>
      <Paragraph>{establishment.formatted_address }</Paragraph>
      <Ratings place={props.place}/>
    </LeftBar>
  );
};

export default Establisment;
