import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cart/cartAction";
import { getAllProductsShop } from "../../redux/product/productAction";
import { toast } from "react-toastify";
import {
  addToWishList,
  removeFromWishList,
} from "../../redux/wishList/wishListAction";
import Ratings from "../Products/Ratings";
import axios from "axios";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishList && wishList.find((i) => i._id === data?._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [data, wishList]);

  const incrementCount = () => {
    setCount(count + 1);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const removeFromWishListHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishList(data));
  };

  const addToWishListHandler = (data) => {
    setClick(!click);
    dispatch(addToWishList(data));
  };

  const addToCartHandler = (id) => {
    console.log(cart);
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("상품이 카트에 이미 있습니다!");
    } else {
      if (data.stock < count) {
        toast.error("상품 재고가 부족합니다!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(cartData));
        toast.success("상품이 카트에 추가되었습니다!");
      }
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const averageRating = totalRatings / totalReviewsLength || 0;

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            `/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        )
        .then((res) => {
          navigate(`/inbox?${res.data.conversation._id}`);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("메세지를 보내시려면 로그인하세요.");
    }
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-10">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                {/* <img src={data.image_Url[0].url} alt="" /> */}
                <img
                  src={
                    process.env.REACT_APP_BACKEND +
                    `/${data.images && data.images[0]}`
                  }
                  alt=""
                />
                <div className="w-full flex">
                  {data &&
                    data.images.map((i, index) => (
                      
                        <img
                          src={process.env.REACT_APP_BACKEND +`/${i}`}
                          alt=""
                          className="h-[200px] overflow-hidden mr-3 mt-3"
                        />
                      
                    ))}
                  
                </div>
                
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[10px] pr-[10px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>

                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {/* {data.discount_price}$ */}
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {/* {data.price ? data.price + "$" : null} */}
                    {data.originalPrice ? data.originalPrice + " 원" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-[#efbb82] -to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[10px] shadow-lg">
                      {count}
                    </span>
                    <button
                      className="bg-[#efbb82] -to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishListHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Wishlist에서 제거"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishListHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Wishlist에 추가"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-5">
                  <div>
                    <div
                      className={`${styles.button} mt-6 rounded-[4px] h-11`}
                      onClick={() => addToCartHandler(data._id)}
                    >
                      <span className="text-[#fff] flex items-center">
                        장바구니 추가 <AiOutlineShoppingCart className="ml-1" />
                      </span>
                    </div>
                  </div>
                  <div>
                    <div
                      className={`${styles.button} mt-6 rounded-[4px] h-11`}
                      onClick={handleMessageSubmit}
                    >
                      <span className="text-[#fff] flex items-center">
                        메세지 보내기 <AiOutlineMessage className="ml-1" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={
                        process.env.REACT_APP_BACKEND + `/${data?.shop?.avatar}`
                      }
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px]">
                        ({averageRating}/5) 점
                      </h5>
                      <Ratings rating={data?.ratings} />
                    </div>
                  </Link>
                  <h5 className="text-[16px] text-[#3eac4d] mt-5">{data?.sold_out} 판매</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
