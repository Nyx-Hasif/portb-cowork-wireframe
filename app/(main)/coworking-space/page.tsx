import React, { Suspense } from "react";
import PricingTable from "./components/PricingTable";
import FoodMenu from "./components/FoodMenu";

const CoworkingPage = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <PricingTable />
      </Suspense>
      <FoodMenu />
    </div>
  );
};

export default CoworkingPage;
