export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const deleteProduct = (prodId) => {
  return { type: DELETE_PRODUCT, id: prodId };
};

export const createProduct = (id, title, imageUrl, description, price) => {
  return {
    type: CREATE_PRODUCT,
    prodId: id,
    prodData: { title, imageUrl, description, price },
  };
};

export const updateProduct = (id, title, imageUrl, description) => {
  return {
    type: UPDATE_PRODUCT,
    prodId: id,
    prodData: { title, imageUrl, description },
  };
};
