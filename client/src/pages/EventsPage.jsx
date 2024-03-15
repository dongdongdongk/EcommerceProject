import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import Lottie from "lottie-react";
import NoData from "../Lottie/NoData.json";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          {allEvents && allEvents.length > 0 ? (
            <div className="w-full grid grid-col-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-col-12">
              {allEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))}
            </div>
          ) : (
            <h1 className="text-center w-full pb-[100px] pt-[40px] text-[20px] flex flex-col items-center justify-center">
              <Lottie
                animationData={NoData}
                style={{ width: "600px", height: "600px" }}
              />
              이벤트가 없습니다!
            </h1>
          )}
        </div>
      )}
    </>
  );
};

export default EventsPage;
