const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];

    case "REMOVE_FROM_CART":
      const deleteItemCart = state.filter((item, index) => {
        return index != action.payload;
      });
      return deleteItemCart;

    case "UPDATE_QUANTITY":

    // case "INCREMENT_QUANTITY":
    //   return {
    //     ...state,
    //     state: state.map((item) =>
    //       item.id === action.payload.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     ),
    //   };

    // case "DECREMENT_QUANTITY":
    //   return {
    //     ...state,
    //     state: state.map((item) =>
    //       item.id === action.payload.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //     ),
    //   };
    default:
      return state;
  }
};

export default cartReducer;
