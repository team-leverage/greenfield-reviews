export const updateReviews = (state = [], action) => {
  switch (action.type) {
    case 'UPDATE_REVIEWS':
      return action.info;
    default:
      return state;
  }
};

export const updateStarReviews = (state = [], action) => {
  switch (action.type) {
    case 'FILTER_REVIEWS':
      return action.info;
      // return {
      //   filteredReviews: [
      //     ...state.filteredReviews,
      //     action.info,
      //   ],
      // };
    default:
      return state;
  }
};
