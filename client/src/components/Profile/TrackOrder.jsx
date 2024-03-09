import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/order/orderAction";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {" "}
      <>
        {data && data?.status === "처리 중" ? (
          <h1 className="text-[20px]">주문이 상점에서 처리 중입니다..</h1>
        ) : data?.status === "배송 파트너로 이관됨" ? (
          <h1 className="text-[20px]">
            상품이 배송 파트너에게 이관되었습니다..
          </h1>
        ) : data?.status === "발송 중" ? (
          <h1 className="text-[20px]">
            상품이 배송 배송원과 함께 이동 중입니다..
          </h1>
        ) : data?.status === "수령함" ? (
          <h1 className="text-[20px]">
            상품이 귀하의 도시에 도착했습니다. 곧 배송원이 전달할 것입니다..
          </h1>
        ) : data?.status === "배송 중" ? (
          <h1 className="text-[20px]">
            당사 배송원이 주문을 전달하러 가고 있습니다.
          </h1>
        ) : data?.status === "배송 완료" ? (
          <h1 className="text-[20px]">상품이 배송되었습니다!</h1>
        ) : data?.status === "환불 처리 중" ? (
          <h1 className="text-[20px]">환불 처리 중입니다!</h1>
        ) : data?.status === "환불 완료" ? (
          <h1 className="text-[20px]">환불이 성공했습니다!</h1>
        ) : null}
      </>
    </div>
  );
};

export default TrackOrder;