import React, { useEffect } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);
  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents &&
              allEvents.map((event, index) => (
                <EventCard key={index} data={event} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
