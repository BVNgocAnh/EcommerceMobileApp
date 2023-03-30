const addressReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_ADDRESS":
      return [...state, action.payload];

    case "DELETE_ADDRESS":
      const deleteAddress = state.filter((item, index) => {
        return index !== action.payload;
      });

      return deleteAddress;
    default:
      return state;
  }
};

export default addressReducer;
