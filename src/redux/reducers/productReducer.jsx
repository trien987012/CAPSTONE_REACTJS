import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toastService from "../../util/toast.service";
import { http } from "../../util/tools";

const initialState = {
  arrProduct: [],
  productDetail: {
    quantityBuy: 1,
  },
  arrCart: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      const arrProduct = action.payload;
      state.arrProduct = arrProduct;
    },
    getProductDetailAction: (state, action) => {
      const productDetail = action.payload;
      state.productDetail = { ...productDetail, quantityBuy: 1 };
    },
    changeQuantityBuy: (state, action) => {
      const quantityBuy = state.productDetail.quantityBuy;
      if (action.payload) {
        state.productDetail.quantityBuy = quantityBuy + 1;
      } else {
        if (quantityBuy > 1) {
          state.productDetail.quantityBuy = quantityBuy - 1;
        }
      }
    },
    addCart: (state, action) => {
      const newProduct = action.payload;
      let index = state.arrCart.findIndex((sp) => sp.id === newProduct.id);
      if (index < 0) {
        state.arrCart.push(newProduct);
      } else {
        state.arrCart[index].quantityBuy =
          state.arrCart[index].quantityBuy + newProduct.quantityBuy;
      }
    },
    // changeQuantityCart: (state, action) => {
    //   const { soLuong, rowObj } = action.payload;
    //   const cartUpdate = state.arrCart.find((cart) => cart.id == rowObj.id);
    //   if (cartUpdate) {
    //     if (soLuong) {
    //       cartUpdate.quantityBuy += 1;
    //     } else {
    //       cartUpdate.quantityBuy -= 1;
    //       if (cartUpdate.quantityBuy < 1) cartUpdate.quantityBuy = 1;
    //     }
    //   }
    // },
    changeQuantityCart: (state, action) => {
      const { soLuong, rowObj } = action.payload;
      const index = state.arrCart.findIndex((pro) => pro.id == rowObj.id);
      if (soLuong) {
        state.arrCart[index].quantityBuy += 1;
      } else {
        if (state.arrCart[index].quantityBuy > 1) {
          state.arrCart[index].quantityBuy -= 1;
        } else {
          toastService.showToast(
            "warning",
            "Delete",
            "Bạn đã xoá sản phẩm ra khỏi giỏ hàng !"
          );
          state.arrCart.splice(index, 1);
        }
      }
    },
    handleToggleProductCart: (state, action) => {
      const row = action.payload;
      const arrCartUpdate = state.arrCart.find(
        (checkCart) => checkCart.id == row.id
      );
      if (arrCartUpdate) {
        arrCartUpdate.isSelected = !arrCartUpdate.isSelected;
      }
    },
    handleCheckAllToggleProductCart: (state, action) => {
      const isCheckAll = action.payload;
      state.arrCart.forEach((element) => {
        element.isSelected = isCheckAll;
      });
    },
    clearArrCartSelected: (state, action) => {
      state.arrCart = state.arrCart.filter((x) => !x.isSelected);
    },
    detleProduct: (state, action) => {
      const rowObj = action.payload;
      const index = state.arrCart.findIndex((pro) => pro.id == rowObj);
      if (window.confirm("Bạn có muốn xoá phản phẩm không ?")) {
        state.arrCart.splice(index, 1);
      }
      toastService.showToast(
        "warning",
        "Delete",
        "Bạn đã xoá sản phẩm ra khỏi giỏ hàng !"
      );
    },
  },
});

export const {
  getProductAction,
  getProductDetailAction,
  changeQuantityBuy,
  addCart,
  changeQuantityCart,
  handleToggleProductCart,
  handleCheckAllToggleProductCart,
  clearArrCartSelected,
  detleProduct,
} = productReducer.actions;

export default productReducer.reducer;

// -------------------------- call api ----------------------------//
export const getProductApi = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: "https://shop.cyberlearn.vn/api/Product",
        method: "GET",
      });
      // const result = await http.get("/product");
      dispatch(getProductAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getDetailApi = (id) => {
  return async (disptach) => {
    try {
      const result = await http.get(`/Product/getbyid?id=${id}`);
      disptach(getProductDetailAction(result.data.content));
    } catch (err) {
      console.log(err);
    }
  };
};
