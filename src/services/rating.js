import Api from './api';

const RatingService = {
  create: (store, rating) => Api.post('/ratings', {store, rating})
}

export default RatingService;