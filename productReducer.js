import { createSlice } from "@reduxjs/toolkit";

export const productReducer = createSlice({
  name: "product",

  initialState: {
    product: [],
  },
  
  reducers: {

    getProducts: (state, action) => {
      //burada ...action ile başlatma old durumda sorun oluyor boş dizi ya da aşağıda olduğu gibi yazdığımda problem yok.
      state.product.push({...action.payload}); //payload nedir?
    },

    incrementQuantity: (state, action) => {
      const incrementQty = state.product.find(
        (item) => item.id == action.payload.id
      );
      incrementQty.quantity++;
    },

    decrementQuantity: (state, action) => {
      const decrementQty = state.product.find(
        (item) => item.id == action.payload.id
      );
      if (decrementQty == 1) {
        decrementQty = 0;
        const removePresent = state.product.filter(
          (item) => item.id !== action.payload.id
        );
        state.product = removePresent;
      }
      else {
        decrementQty.quantity--;
      }
    },

  },
});

//Düz eylem yaratıcılarını yıkın ve dışa aktarın
export const { getProducts, incrementQuantity, decrementQuantity } =
  productReducer.actions;

export default productReducer.reducer;
