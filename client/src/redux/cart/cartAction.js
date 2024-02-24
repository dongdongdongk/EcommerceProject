import { createAsyncThunk } from "@reduxjs/toolkit";

// 수정된 코드
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (newForm, { getState }) => {
    try {
      const currentState = getState(); // 현재 상태 가져오기
      console.log("현재 상태", currentState);

      const existingCart = currentState.cart.cart;
    //   console.log("카트 내용", existingCart);

      const item = newForm;
      //   console.log("새로 추가할 아이템", newForm);
      const isItemExist = existingCart.find((i) => i._id === item._id);

      if (isItemExist) {
        // 이미 카트에 존재하는 경우 해당 아이템 정보를 업데이트
        const updatedCart = existingCart.map((i) =>
          i._id === isItemExist._id ? item : i
        );

        return {
            cart : updatedCart
        };
      } else {
        // 카트에 없는 경우 새로운 아이템 추가
        const updatedCart = [...existingCart, item];
        // console.log("업데이트된 카트", updatedCart);
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return {
          cart : updatedCart , // 카트 형태로 반환을 해줘야 한다 그대로 updateCart로 반환하면 오류 발생 
        };
      }
    } catch (error) {
      throw error; // 에러 발생 시 에러 처리
    }
  }
);

// 카트에서 상품 제거하는 액션 생성자
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (data, { getState }) => {
    // getState 함수를 사용하여 현재 상태 가져오기
    try {
      const filteredCart = getState().cart.cart.filter(
        (item) => item._id !== data._id
      ); // 지정된 상품 제거
      console.log("제거하고 남은 상품", filteredCart)
      localStorage.setItem("cartItems", JSON.stringify(filteredCart)); // 로컬 스토리지에 업데이트된 카트 정보 저장
      return {
        cart : filteredCart, // 제거된 상품 반환     
    }
    } catch (error) {
      throw error; // 에러 발생 시 에러 처리
    }
  }
);
