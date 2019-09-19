const getMetaData = (state = {}, action) => {
  switch (action.type) {
    case 'GET_METADATA':
      console.log(action.data);
      return action.data;
    default:
      return state;
  }
};

const averageRating = (state = 0, action) => {
  switch (action.type) {
    case 'AVG_RATING':
      return action.rating;
    default:
      return state;
  }
};

export { getMetaData, averageRating };
