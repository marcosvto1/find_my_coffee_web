import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import ReactStars from 'react-rating-stars-component';
import StoreService from '../../../services/store';


const RightBar = styled.div`
  width: 250px;
  position: absolute;
  color: white;
  right: 0;
  top: 0;
`;

const Head = styled.div`
  background-color: rgba(10,10, 10, 0.9);
  border-radius: 6px;
  padding: 2px;
  text-align: center;
  margin: 10px;
`;

const Body = styled.div`
  background-color: rgba(10,10, 10, 0.9);
  border-radius: 6px;
  padding: 20px;
  height: 450px;
  overflow-y: auto;
  margin: 10px;
`;

const Footer = styled.div`
  background-color: rgba(10,10, 10, 0.9);
  border-radius: 6px;
  padding: 10px 20px 20px 20px;
  font-size: 13px;
  margin: 10px;
`;

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 13px;
`;

const Title = styled.h1`
  font-size: 18px;
  color: rgba(210, 110, 50, 0.7);
`;

const EstablishmentItem = styled.div`
  cursor: pointer;
  :hover {
    background-color: #111;
  }
`;

export const NeartsCoffess = (props) => {

  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNeartsStore();
  }, [props.latitude])

  async function loadNeartsStore() {
    const response = await StoreService.index(props.latitude, props.longitude);
    setStores(response.data);
  }

  return (
    <RightBar>
      <Head>
        <h3>Find My Coffee</h3>
      </Head>
      <Body>
       <strong>Mais amados na região</strong>
       <hr/>
        {
           stores.map(store => {
             return (
               <EstablishmentItem key={store.name}>
                 <Title>{store.name}</Title>
  ​
                 <Paragraph>
                  {store.address}
                 </Paragraph>
  ​
                { store.ratings_count || 0 } Opiniões
                 <ReactStars edit={false} value={store.ratings_average || 0} />
                 <hr/>
               </EstablishmentItem>
            )
          })
        } 
     </Body>

     <Footer>
       <h2>OneBitCode.com</h2>
       <Paragraph>
        Projeto Open Source desenvolvido na Semana Super Full
        Stack da escola online de programação
       </Paragraph>
     </Footer>

    </RightBar>
  )
}

export default NeartsCoffess;