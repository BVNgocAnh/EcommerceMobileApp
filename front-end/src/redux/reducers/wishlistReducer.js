const wishlistReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST": {
      return [...state, action.payload];
    }

    case "REMOVE_FROM_WISHLIST": {
      const deleteItemWishlist = state.filter((item, index) => {
        return index != action.payload;
      });
      return deleteItemWishlist;
    }

    default:
      return state;
  }
};
export default wishlistReducer;
