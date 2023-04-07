export const addItemToCart = (data) => {
  return {
    type: "ADD_TO_CART",
    payload: data,
  };
};

export const removeFromCart = (index) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: index,
  };
};

export const updateQuantity = (id) => {
  return {
    type: "UPDATE_QUANTITY",
    payload: id,
  };
};
// export const incrementQuantity = (id) => ({
//   type: "INCREMENT_QUANTITY",
//   payload: id,
// });

// export const decrementQuantity = (id) => ({
//   type: "DECREMENT_QUANTITY",
//   payload: id,
// });

export const addToWishlist = (data) => {
  return {
    type: "ADD_TO_WISHLIST",
    payload: data,
  };
};

export const removeFromWishlist = (index) => {
  return {
    type: "REMOVE_FROM_WISHLIST",
    payload: index,
  };
};

export const addAddress = (data) => {
  return {
    type: "ADD_ADDRESS",
    payload: data,
  };
};

export const deleteAddress = (index) => {
  return {
    type: "DELETE_ADDRESS",
    payload: index,
  };
};
