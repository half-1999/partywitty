import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { IMAGE_BASE, API_BASE } from "../baseURL";

export default function Package({ packageData }) {
  const [activeTab, setActiveTab] = useState("Food Menu");
  const [openSection, setOpenSection] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [selected, setSelected] = useState({ veg: [], nonveg: [] });

  useEffect(() => {
    if (!packageData?.id) return;

    const fetchMenu = async () => {
      const formData = new FormData();
      formData.append("package_id", packageData.id);

      const res = await axios.post(
        `${API_BASE}/ClubPackage/getPackageMenu1`,
        formData
      );

      if (res.data?.status) {
        setMenuData(res.data.data[0].category);
      }
    };

    fetchMenu();
  }, [packageData]);

  const toggleAccordion = (key) => {
    setOpenSection((prev) => (prev === key ? null : key));
  };

  const toggleSelect = (type, item, limit) => {
    const list = selected[type];
    if (list.some((i) => i.id === item.id)) {
      setSelected({
        ...selected,
        [type]: list.filter((i) => i.id !== item.id),
      });
    } else {
      if (limit !== "All" && list.length >= Number(limit)) {
        alert(`You can select only ${limit} items`);
        return;
      }
      setSelected({ ...selected, [type]: [...list, item] });
    }
  };

  const FoodCard = ({ item, type, limit }) => {
    const isSelected = selected[type]?.some((i) => i.id === item.id);

    return (
      <div
        onClick={() => toggleSelect(type, item, limit)}
        className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition ${
          isSelected
            ? "border-green-500 bg-green-50"
            : "border-gray-200 hover:border-violet-400"
        }`}
      >
        <img
          src={item.img ? `${IMAGE_BASE}${item.img}` : ""}
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
        </div>
      </div>
    );
  };

  const buildItems = (arr, key) =>
    arr
      ?.filter((i) => i && i.trim() !== "")
      .map((name, idx) => ({
        id: `${key}-${idx}`,
        name,
      })) || [];

  const nonAlcoholicKeys = ["juice", "soft_drinks", "mocktails"];
  const alcoholicKeys = [
    "beer",
    "whiskey",
    "vodka",
    "gin",
    "rum",
    "tequila",
    "cocktails",
    "red_wine",
    "white_wine",
    "rose_wine",
    "sparkling_wine",
    "champagne",
  ];

  const buildDrinkItems = (keys) =>
    keys.flatMap((key) => buildItems(menuData[key]?.veg || [], key));

  if (!menuData) return null;

  return (
    <div className="mx-auto">
      {/* Tabs */}
      <div className="bg-white rounded-full p-2 flex gap-2 mb-4 shadow-xl">
        {["Food Menu", "nonAlcoholic", "alcoholic"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-6 cursor-pointer py-2 rounded-full text-sm capitalize ${
              activeTab === t ? "bg-violet-600 text-white" : "hover:bg-gray-100"
            }`}
          >
            {t === "nonAlcoholic" ? "Non-Alcoholic" : t}
          </button>
        ))}
      </div>

      {/* FOOD MENU */}
      {activeTab === "Food Menu" && (
        <div className="bg-white rounded-3xl p-4 shadow-xl">
          {["starter", "maincourse", "rice", "breads", "desserts"].map(
            (section) =>
              menuData[section] && (
                <div
                  key={section}
                  className="border rounded-xl mb-4 overflow-hidden"
                >
                  <div
                    onClick={() => toggleAccordion(section)}
                    className="flex justify-between p-4 font-semibold cursor-pointer"
                  >
                    {section.toUpperCase()}
                    <FaChevronDown
                      className={`transition ${
                        openSection === section ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {openSection === section && (
                    <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50">
                      {menuData[section].veg?.length > 0 && (
                        <div className="bg-white rounded-xl p-4">
                          <div className="font-semibold mb-3">
                            Veg (Select {menuData[section].veg_choice})
                          </div>
                          {buildItems(menuData[section].veg, section).map(
                            (item) => (
                              <FoodCard
                                key={item.id}
                                item={item}
                                type="veg"
                                limit={menuData[section].veg_choice}
                              />
                            )
                          )}
                        </div>
                      )}

                      {menuData[section].nonveg?.length > 0 && (
                        <div className="bg-white rounded-xl p-4">
                          <div className="font-semibold mb-3">
                            Non-Veg (Select {menuData[section].nonveg_choice})
                          </div>
                          {buildItems(menuData[section].nonveg, section).map(
                            (item) => (
                              <FoodCard
                                key={item.id}
                                item={item}
                                type="nonveg"
                                limit={menuData[section].nonveg_choice}
                              />
                            )
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {activeTab === "nonAlcoholic" && (
        <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
          {buildDrinkItems(nonAlcoholicKeys).length > 0 ? (
            buildDrinkItems(nonAlcoholicKeys).map((item) => (
              <FoodCard key={item.id} item={item} type="veg" limit="All" />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No non-alcoholic drinks available
            </p>
          )}
        </div>
      )}

      {activeTab === "alcoholic" && (
        <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
          {buildDrinkItems(alcoholicKeys).length > 0 ? (
            buildDrinkItems(alcoholicKeys).map((item) => (
              <FoodCard key={item.id} item={item} type="veg" limit="All" />
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No alcoholic drinks available
            </p>
          )}
        </div>
      )}
    </div>
  );
}
