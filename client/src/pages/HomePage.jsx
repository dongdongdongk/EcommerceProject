import React from "react";
import Header from "../components/Layout/Header"
import Hero from "../components/Route/Hero";
import Categories from "../components/Route/Categories";
import BestDeals from "../components/Route/BestDeals";
import FeaturedProduct from "../components/Route/FeatureProduct";

const HomePage = () => {

    return (
        <div>
            <Header activeHeading={1} />
            <Hero />
            <Categories />
            <BestDeals />
            <FeaturedProduct />
        </div>
    )
}

export default HomePage;