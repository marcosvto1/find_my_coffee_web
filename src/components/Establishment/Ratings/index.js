import React, { useState, useEffect, Fragment } from "react";
import ReactStars from "react-rating-stars-component";
import Form from "./Form";

import StoreService from "../../../services/store";

export const Ratings = (props) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    loadStore();
  }, [props.place]);

  async function loadStore() {
    setStore([]);
    try {
      const response = await StoreService.show(props.place.place_id);
      console.log(response.data);
      setStore(response.data);
    } catch (error) {
      setStore([]);
    }
  }

  function makeLoadRatings() {
    if (store.ratings) {
      return (
        <div>
          {store.ratings.map((rating, indexForKey) => {
            return (
              <div key={indexForKey}>
                <strong>{rating.user_name}</strong>
                <ReactStars edit={false} value={rating.value} />
                <p>{rating.opinion}</p>
                <p>{rating.data}</p>
                <hr />
              </div>
            );
          })}
        </div>
      );
    }
  }

  return (
    <Fragment>
      <h4>
        {store.ratings_count || 0} Opiniões
        {store.ratings_average && (
          <ReactStars edit={false} value={store.ratings_average || 0} />
        )}
      </h4>
      <hr />

      {makeLoadRatings()}

      <Form place={props.place} loadStore={loadStore} />
    </Fragment>
  );
};

export default Ratings;
