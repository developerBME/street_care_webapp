import React from "react";
import one from "../../images/rectangle-1.png";

import two from "../../images/rectangle-2.png";
import three from "../../images/rectangle-3.png";
import four from "../../images/rectangle-4.png";
import five from "../../images/rectangle-5.png";
import six from "../../images/rectangle-6.png";
import seven from "../../images/rectangle-7.png";
import eight from "../../images/rectangle-8.png";
import nine from "../../images/rectangle-9.png";
import ten from "../../images/rectangle-10.png";
import eleven from "../../images/rectangle-11.png";
import twelve from "../../images/rectangle-12.png";
import thirteen from "../../images/rectangle-13.png";
import fourteen from "../../images/rectangle-14.png";
import fifteen from "../../images/rectangle-15.png";
import sixteen from "../../images/rectangle-16.png";
import seventeen from "../../images/rectangle-17.png";
import eighteen from "../../images/rectangle-18.png";
import nineteen from "../../images/rectangle-19.png";
import twenty from "../../images/rectangle-20.png";
import twenty1 from "../../images/rectangle-21.png";
import twenty2 from "../../images/rectangle-22.png";
import twenty3 from "../../images/rectangle-23.png";
import twenty4 from "../../images/rectangle-24.png";
import icon_howtoprep from "../../images/icon_howtoprep.png";

function CarePackage({ label, name }) {
  const skipItems = [
    {
      image: one,
      content: "A ton of anything",
    },
    {
      image: two,
      content: "Alcohol",
    },
    {
      image: three,
      content: "Drug",
    },
    {
      image: four,
      content: "Religious Material",
    },
    {
      image: five,
      content: "Political Mateiral",
    },
  ];

  const personalCareItems = [
    {
      image: six,
      content: "Toothbrush",
    },
    {
      image: seven,
      content: "Tooth paste",
    },
    {
      image: eight,
      content: "Soap",
    },
    {
      image: nine,
      content: "Hand sanitizer",
    },
    {
      image: ten,
      content: "Bandages",
    },
    {
      image: eleven,
      content: "Nail Clip",
    },
    {
      image: twelve,
      content: "Water",
    },
    {
      image: thirteen,
      content: "Wipes",
    },
    {
      image: fourteen,
      content: "Moon cup",
    },
    {
      image: fifteen,
      content: "Tampons",
    },
  ];

  const clothesItems = [
    {
      image: sixteen,
      content: "Socks",
    },
    {
      image: seventeen,
      content: "Gloves",
    },
    {
      image: eighteen,
      content: "Beanies",
    },
    {
      image: nineteen,
      content: "T-shirt",
    },
    {
      image: twenty,
      content: "Coats",
    },
  ];

  const foodItems = [
    {
      image: twenty1,
      content: "Fruit",
    },
    {
      image: twenty2,
      content: "Nuts",
    },
    {
      image: twenty3,
      content: "Dry Fruits",
    },
    {
      image: twenty4,
      content: "Jam",
    },
  ];

  return (
    <>
      <div className="lg:bg-none bg-gradient-to-tr from-[#D3F2CE] to-[#E7E7E7] to-90% bg-fixed items-center justify-center px-4 py-8 lg:pt-24 lg:pb-0 lg:px-36 h-full w-full lg:rounded-t-2xl lg:rounded-b-none rounded-2xl bg-[#F7F7F7] lg:m-0 mb-[10px]">
        <p className="text-[24px] lg:block hidden">Upcoming outreach events</p>
        <img src={icon_howtoprep} className="block lg:hidden" />
        <h2 className="text-neutral-800 lg:text-[57px] text-[36px] font-medium font-bricolage lg:leading-[64px] leading-[44px] lg:py-[64px] pt-[24px]">
          How to prepare the Care Package?
        </h2>
      </div>
      <div className="items-center justify-center px-4 py-8 lg:pb-[25px] lg:pt-0 lg:px-36 h-full w-full lg:rounded-none rounded-2xl bg-[#F7F7F7] lg:m-0 mb-[10px]">
        <p className="text-[24px] mb-[18px]">
          Items to Skip in Your Homeless Care Kits
        </p>
        <div className="overflow-x-scroll lg:overflow-none">
          <div className="w-fit flex lg:flex-wrap">
            {skipItems.map((item, index) => (
              <div
                key={index}
                className="image-container px-[8px] lg:max-w-[90px] lg:min-w-[90px] w-[120px] mb-[25px]"
              >
                <img src={item.image} alt={`Image ${index}`} />
                <p className="text-[12px] pt-[10px]">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="items-center justify-center px-4 py-8 lg:pb-[25px] lg:px-36 h-full w-full lg:rounded-none rounded-2xl bg-[#F7F7F7] lg:m-0 mb-[10px]">
        <p className="text-[24px] mb-[18px]">Personal Care</p>
        <ul className="list-disc ml-[20px] mb-[30px] text-[#616161]">
          <li className="text-[15px]">
            Strong Fragrances: Avoid strongly scented products as some
            individuals may have sensitivities or allergies.
          </li>
          <li className="text-[15px]">
            It's best to provide new and unused personal care products for
            hygiene reasons.
          </li>
        </ul>
        <div className="overflow-x-scroll">
          <div className="w-fit flex lg:flex-wrap">
            {personalCareItems.map((item, index) => (
              <div
                key={index}
                className="image-container px-[8px] lg:max-w-[90px] lg:min-w-[90px] w-[120px] mb-[25px]"
              >
                <img src={item.image} alt={`Image ${index}`} />
                <p className="text-[12px] pt-[10px]">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="items-center justify-center px-4 py-8 lg:pb-[25px] lg:px-36 h-full w-full lg:rounded-none rounded-2xl bg-[#F7F7F7] lg:m-0 mb-[10px]">
        <p className="text-[24px] mb-[18px]">Clothes</p>
        <ul className="list-disc ml-[20px] mb-[30px] text-[#616161]">
          <li className="text-[15px]">
            Clothing in Poor Condition: While donating clothing is a great idea,
            make sure it's clean and in good condition.
          </li>
        </ul>
        <div className="overflow-x-scroll">
          <div className="w-fit flex lg:flex-wrap">
            {clothesItems.map((item, index) => (
              <div
                key={index}
                className="image-container px-[8px] lg:max-w-[90px] lg:min-w-[90px] w-[120px] mb-[25px]"
              >
                <img src={item.image} alt={`Image ${index}`} />
                <p className="text-[12px] pt-[10px]">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="items-center justify-center px-4 py-8 lg:pb-24 lg:px-36 h-full w-full lg:rounded-b-2xl lg:rounded-t-none rounded-2xl bg-[#F7F7F7] ">
        <p className="text-[24px] mb-[18px]">Food</p>
        <ul className="list-disc ml-[20px] mb-[30px] text-[#616161]">
          <li className="text-[15px]">
            Perishable Foods: Avoid giving items that can spoil quickly, such as
            fresh fruits or prepared meals, unless you're able to distribute
            them immediately.
          </li>
          <li className="text-[15px]">
            Remember to read labels for allergen information and encourage
            recipients to do the same. Sensitivity to dietary restrictions is
            essential for safe and helpful assistance. [Nuts, Gluten, Diary,
            Seed, Fruits (Apples, oranges, bannas, ) Protein (Beef Jerky)]
          </li>
        </ul>
        <div className="overflow-x-scroll">
          <div className="w-fit flex lg:flex-wrap">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="image-container px-[8px] lg:max-w-[90px] lg:min-w-[90px] w-[120px] mb-[25px]"
              >
                <img src={item.image} alt={`Image ${index}`} />
                <p className="text-[12px] pt-[10px]">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CarePackage;
