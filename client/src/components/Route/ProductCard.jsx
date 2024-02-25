import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/wishList/wishListAction";
import { addToCart } from "../../redux/cart/cartAction";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import ProductDetailsCard from "./ProductDetailCard";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Ratings from "../Products/Ratings";

const ProductCard = ({ data,isEvent }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("상품이 이미 카트에 있습니다!");
    } else {
      if (data.stock < 1) {
        toast.error("상품의 재고를 초과했습니다!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addToCart(cartData));
        toast.success("장바구니에 상품을 추가했습니다!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${data._id}`}>
        {/* <Link
          // to={`${
          //   isEvent === true
          //     ? `/product/${data._id}?isEvent=true`
          //     : `/product/${data._id}`
          // }`}
        > */}
          <img
            // src={data.image_Url[0].url}
            src={`http://localhost:5000/${data.images && data.images[0]}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        {/* <Link to="/"> */}
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/product/${data._id}`}>
        {/* <Link
          // to={`${
          //   isEvent === true
          //     ? `/product/${data._id}?isEvent=true`
          //     : `/product/${data._id}`
          // }`}
        > */}
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.ratings} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {/* {data.price === 0 ? data.price : data.discount_price}$ */}
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                {" "}원
              </h5>
              <h4 className={`${styles.price}`}>
                {/* {data.price ? data.price + " $" : null} */}
                {data.originalPrice ? data.originalPrice + " 원" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {/* {data.total_sell} sold */}
              50 sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishListHandler(data)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
