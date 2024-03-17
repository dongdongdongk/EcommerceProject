import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { endEvent, getAllEvents } from "../../redux/event/eventAction";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const { allEvents, isLoading } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(data);

    // 이벤트 상태가 "end"가 아닌 경우에만 타이머 실행
    if (data.status !== "end") {
      const timer = setTimeout(() => {
        const updatedTimeLeft = calculateTimeLeft();
        setTimeLeft(updatedTimeLeft);

        // 이벤트 종료 시간이 지났다면 상태를 "end"로 변경
        if (Object.keys(updatedTimeLeft).length === 0) {
          dispatch(endEvent(data._id));
          dispatch(getAllEvents())
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  console.log("모든 이벤트", data);

  function calculateTimeLeft() {
    // const difference = +new Date("2024-05-10") - +new Date();
    const difference = +new Date(data?.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        일: Math.floor(difference / (1000 * 60 * 60 * 24)),
        시간: Math.floor((difference / (1000 * 60 * 60)) % 24),
        분: Math.floor((difference / 1000 / 60) % 60),
        초: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <span className="text-[25px] text-[#475ad2]">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">이벤트 종료</span>
      )}
    </div>
  );
};

export default CountDown;
