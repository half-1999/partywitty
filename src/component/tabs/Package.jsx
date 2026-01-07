import React, { useState } from "react";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { packageMenuData } from "../../data/cateringHeaderData";

export default function Package() {
  const [activeTab, setActiveTab] = useState("food");

  const [openSection, setOpenSection] = useState("starters"); // default open

  const [selected, setSelected] = useState({
    veg: [],
    nonveg: [],
  });

  const toggleAccordion = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const toggleSelect = (type, item) => {
    const list = selected[type];

    if (list.some((i) => i.id === item.id)) {
      setSelected({
        ...selected,
        [type]: list.filter((i) => i.id !== item.id),
      });
    } else {
      if (list.length >= 3) {
        alert("You can select only 3 items");
        return;
      }
      setSelected({
        ...selected,
        [type]: [...list, item],
      });
    }
  };

  const FoodCard = ({ item, type }) => {
    const isSelected = selected[type]?.some((i) => i.id === item.id);

    return (
      <div
        onClick={() => toggleSelect(type, item)}
        className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition ${
          isSelected
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:border-violet-400"
        }`}
      >
        <img
          src={item.img}
          alt=""
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 font-semibold">
            <BiFoodTag
              className={type === "veg" ? "text-green-600" : "text-red-600"}
            />
            {item.name}
            {isSelected && <FaCheckCircle className="text-green-500" />}
          </div>
          <p className="text-sm text-gray-500">{item.desc}</p>
          <p className="text-sm font-medium text-violet-600 mt-1">View More</p>
        </div>
      </div>
    );
  };

  const Section = ({ title, dataKey }) => (
    <div className="shadow-2xl border border-gray-300 rounded-xl mb-4 overflow-hidden">
      <div
        onClick={() => toggleAccordion(dataKey)}
        className="flex justify-between items-center p-4 cursor-pointer font-semibold"
      >
        {title}
        <FaChevronDown
          className={`${
            openSection === dataKey ? "rotate-180" : ""
          } transition`}
        />
      </div>

      {openSection === dataKey && (
        <div className="p-4 bg-gray-50 grid md:grid-cols-2 gap-6">
          {/* Veg */}
          {packageMenuData.food[dataKey]?.veg && (
            <div className="bg-white rounded-2xl p-4">
              <div className="flex justify-between font-semibold mb-4">
                Veg {title}{" "}
                <span className="text-violet-600">(Select Any 3)</span>
              </div>
              <div className="space-y-3">
                {packageMenuData.food[dataKey].veg.map((item) => (
                  <FoodCard key={item.id} item={item} type="veg" />
                ))}
              </div>
            </div>
          )}

          {/* Non Veg */}
          {packageMenuData.food[dataKey]?.nonveg && (
            <div className="bg-white rounded-2xl p-4">
              <div className="flex justify-between font-semibold mb-4">
                Non-Veg {title}{" "}
                <span className="text-violet-600">(Select Any 3)</span>
              </div>
              <div className="space-y-3">
                {packageMenuData.food[dataKey].nonveg.map((item) => (
                  <FoodCard key={item.id} item={item} type="nonveg" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="mx-auto">
      {/* Tabs */}
      <div className="bg-white rounded-full p-2 flex gap-2 mb-4 shadow-xl">
        {["food", "nonAlcoholic", "alcoholic"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 py-2 rounded-full text-xs md:text-sm shadow-xl capitalize transition ${
              activeTab === t ? "bg-violet-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {t === "nonAlcoholic" ? "Non-Alcoholic" : t}
          </button>
        ))}
      </div>

      {/* FOOD TAB */}
      {activeTab === "food" && (
        <div className="bg-white rounded-3xl p-4 shadow-xl">
          <Section title="Starters" dataKey="starters" />
          <Section title="Mains" dataKey="mains" />
          <Section title="Desserts" dataKey="desserts" />
        </div>
      )}

      {/* NON ALCOHOLIC */}
      {activeTab === "nonAlcoholic" && (
        <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
          {packageMenuData.nonAlcoholic.drinks.veg.map((item) => (
            <FoodCard key={item.id} item={item} type="veg" />
          ))}
        </div>
      )}

      {/* ALCOHOLIC */}
      {activeTab === "alcoholic" && (
        <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
          {packageMenuData.alcoholic.drinks.veg.map((item) => (
            <FoodCard key={item.id} item={item} type="veg" />
          ))}
        </div>
      )}
    </div>
  );
}
