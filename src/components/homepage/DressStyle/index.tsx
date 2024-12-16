import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import React from "react";
import DressStyleCard from "./DressStyleCard";

const DressStyle = () => {
  return (
    <div className="px-4 xl:px-0">
      <section className="max-w-frame mx-auto bg-[#F0F0F0] px-6 pb-6 pt-10 md:p-[70px] rounded-[40px] text-center">
        <h2
          className={cn([
            integralCF.className,
            "text-[32px] leading-[36px] md:text-5xl mb-8 md:mb-14 capitalize",
          ])}
        >
          BROWSE BY dress STYLE
        </h2>
        <div className="flex flex-col sm:flex-row md:h-[289px] space-y-4 sm:space-y-0 sm:space-x-5 mb-4 sm:mb-5">
          <DressStyleCard
            title="Casual"
            url="/shop#casual"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-1.png')]"
          />
          <DressStyleCard
            title="Formal"
            url="/shop#formal"
            className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-2.png')]"
          />
        </div>
        <div className="flex flex-col sm:flex-row md:h-[289px] space-y-5 sm:space-y-0 sm:space-x-5">
          <DressStyleCard
            title="Party"
            url="/shop#party"
            className="md:max-w-[684px] h-[190px] bg-[url('/images/dress-style-3.png')]"
          />
          <DressStyleCard
            title="Gym"
            url="/shop#gym"
            className="md:max-w-[260px] lg:max-w-[360px] xl:max-w-[407px] h-[190px] bg-[url('/images/dress-style-4.png')]"
          />
        </div>
      </section>
    </div>
  );
};

export default DressStyle;
