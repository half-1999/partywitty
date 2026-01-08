// import React, { useState } from "react";
// import { FaChevronDown, FaCheckCircle } from "react-icons/fa";
// import { BiFoodTag } from "react-icons/bi";
// import { IMAGE_BASE } from "../baseURL";

// export default function Package({ packageData }) {
//   console.log(packageData);
//   const [activeTab, setActiveTab] = useState("Food Menu");
//   const [openSection, setOpenSection] = useState("starters"); // default open
//   const [selected, setSelected] = useState({ veg: [], nonveg: [] });

//   if (!packageData) return null; // handle empty data

//   const toggleAccordion = (key) => {
//     setOpenSection((prev) => (prev === key ? null : key));
//   };

//   const toggleSelect = (type, item) => {
//     const list = selected[type];
//     if (list.some((i) => i.id === item.id)) {
//       setSelected({
//         ...selected,
//         [type]: list.filter((i) => i.id !== item.id),
//       });
//     } else {
//       if (list.length >= 3) {
//         alert("You can select only 3 items");
//         return;
//       }
//       setSelected({ ...selected, [type]: [...list, item] });
//     }
//   };

//   const FoodCard = ({ item, type }) => {
//     const isSelected = selected[type]?.some((i) => i.id === item.id);
//     return (
//       <div
//         onClick={() => toggleSelect(type, item)}
//         className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition ${
//           isSelected
//             ? "border-green-500 bg-green-50"
//             : "border-gray-200 hover:border-violet-400"
//         }`}
//       >
//         <img
//           src={item?.img ? `${IMAGE_BASE}${item.img}` : ""}
//           alt="No Image"
//           className="w-16 h-16 rounded-lg object-cover"
//         />

//         <div className="flex-1">
//           <div className="flex items-center gap-2 font-semibold">
//             <BiFoodTag
//               className={type === "veg" ? "text-green-600" : "text-red-600"}
//             />
//             {item.name}
//             {isSelected && <FaCheckCircle className="text-green-500" />}
//           </div>
//           {item.desc ? (
//             <p className="text-sm text-gray-500">{item.desc}</p>
//           ) : (
//             <p>No Description</p>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Helper to transform "###" strings into objects
//   const parseItems = (str, type, keyPrefix) =>
//     str
//       ? str.split("###").map((name, idx) => ({
//           id: `${keyPrefix}-${type}-${idx}`,
//           name,
//           desc: "",
//           img: "",
//         }))
//       : [];

//   // Transform API data
//   const sections = {
//     starters: {
//       veg: parseItems(packageData.starter, "veg", "starter"),
//       nonveg: parseItems(packageData.nonveg_starter, "nonveg", "starter"),
//     },
//     mains: {
//       veg: parseItems(packageData.maincourse, "veg", "main"),
//       nonveg: parseItems(packageData.nonveg_maincourse, "nonveg", "main"),
//     },
//     rice: {
//       veg: parseItems(packageData.rice, "veg", "rice"),
//       nonveg: parseItems(packageData.nonveg_rice, "nonveg", "rice"),
//     },
//     breads: {
//       veg: parseItems(packageData.breads, "veg", "breads"),
//       nonveg: parseItems(packageData.nonveg_breads, "nonveg", "breads"),
//     },
//     desserts: {
//       veg: parseItems(packageData.desserts, "veg", "dessert"),
//       nonveg: parseItems(packageData.nonveg_desserts, "nonveg", "dessert"),
//     },
//   };

//   const drinks = {
//     nonAlcoholic: [
//       ...parseItems(packageData.juice, "veg", "juice"),
//       ...parseItems(packageData.soft_drinks, "veg", "softdrink"),
//       ...parseItems(packageData.mocktails, "veg", "mocktail"),
//     ],
//     alcoholic: [
//       ...parseItems(packageData.beer, "veg", "beer"),
//       ...parseItems(packageData.whiskey, "veg", "whiskey"),
//       ...parseItems(packageData.vodka, "veg", "vodka"),
//       ...parseItems(packageData.gin, "veg", "gin"),
//       ...parseItems(packageData.rum, "veg", "rum"),
//       ...parseItems(packageData.tequila, "veg", "tequila"),
//       ...parseItems(packageData.cocktails, "veg", "cocktails"),
//       ...parseItems(packageData.red_wine, "veg", "red_wine"),
//       ...parseItems(packageData.white_wine, "veg", "white_wine"),
//       ...parseItems(packageData.rose_wine, "veg", "rose_wine"),
//       ...parseItems(packageData.sparkling_wine, "veg", "sparkling_wine"),
//       ...parseItems(packageData.champagne, "veg", "champagne"),
//     ],
//   };

//   const Section = ({ title, items }) => (
//     <div className="shadow-2xl border border-gray-300 rounded-xl mb-4 overflow-hidden">
//       <div
//         onClick={() => toggleAccordion(title)}
//         className="flex justify-between items-center p-4 cursor-pointer font-semibold"
//       >
//         {title}
//         <FaChevronDown
//           className={`${openSection === title ? "rotate-180" : ""} transition`}
//         />
//       </div>

//       {openSection === title && (
//         <div className="p-4 bg-gray-50 grid md:grid-cols-2 gap-6">
//           {items.veg.length > 0 && (
//             <div className="bg-white rounded-2xl p-4">
//               <div className="flex justify-between font-semibold mb-4">
//                 Veg {title}{" "}
//                 <span className="text-violet-600">(Select Any 3)</span>
//               </div>
//               <div className="space-y-3">
//                 {items?.veg.map((item) => (
//                   <FoodCard key={item.id} item={item} type="veg" />
//                 ))}
//               </div>
//             </div>
//           )}
//           {items?.nonveg.length > 0 && (
//             <div className="bg-white rounded-2xl p-4">
//               <div className="flex justify-between font-semibold mb-4">
//                 Non-Veg {title}{" "}
//                 <span className="text-violet-600">(Select Any 3)</span>
//               </div>
//               <div className="space-y-3">
//                 {items.nonveg.map((item) => (
//                   <FoodCard key={item.id} item={item} type="nonveg" />
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="mx-auto">
//       {/* Tabs */}
//       <div className="bg-white rounded-full p-2 flex gap-2 mb-4 shadow-xl">
//         {["Food Menu", "nonAlcoholic", "alcoholic"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setActiveTab(t)}
//             className={`px-6 py-2 rounded-full text-xs md:text-sm shadow-xl capitalize transition ${
//               activeTab === t ? "bg-violet-600 text-white" : "hover:bg-gray-100"
//             }`}
//           >
//             {t === "nonAlcoholic" ? "Non-Alcoholic" : t}
//           </button>
//         ))}
//       </div>

//       {/* Food Tab */}
//       {activeTab === "Food Menu" && (
//         <div className="bg-white rounded-3xl p-4 shadow-xl">
//           {Object.keys(sections).map((key) => (
//             <Section
//               key={key}
//               title={key.charAt(0).toUpperCase() + key.slice(1)}
//               items={sections[key]}
//             />
//           ))}
//         </div>
//       )}

//       {/* Non-Alcoholic */}
//       {activeTab === "nonAlcoholic" && (
//         <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
//           {drinks.nonAlcoholic.map((item) => (
//             <FoodCard key={item.id} item={item} type="veg" />
//           ))}
//         </div>
//       )}

//       {/* Alcoholic */}
//       {activeTab === "alcoholic" && (
//         <div className="bg-white rounded-3xl p-6 shadow grid md:grid-cols-3 gap-4">
//           {drinks.alcoholic.map((item) => (
//             <FoodCard key={item.id} item={item} type="veg" />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown, FaCheckCircle } from "react-icons/fa";
import { BiFoodTag } from "react-icons/bi";
import { IMAGE_BASE } from "../baseURL";

export default function Package({ packageData }) {
  const [activeTab, setActiveTab] = useState("Food Menu");
  const [openSection, setOpenSection] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [selected, setSelected] = useState({ veg: [], nonveg: [] });

  console.log(packageData);

  useEffect(() => {
    if (!packageData?.id) return;

    const fetchMenu = async () => {
      const formData = new FormData();
      formData.append("package_id", packageData.id);

      const res = await axios.post(
        "https://admin.partywitty.com/master/APIs/ClubPackage/getPackageMenu1",
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
            className={`px-6 py-2 rounded-full text-sm capitalize ${
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
