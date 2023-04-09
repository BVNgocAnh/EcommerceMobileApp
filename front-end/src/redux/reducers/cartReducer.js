const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      const deleteItemCart = state.filter((item, index) => {
        return index != action.payload;
      });
      return deleteItemCart;

    default:
      return state;
  }
};

export default cartReducer;
