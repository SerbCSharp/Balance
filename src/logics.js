let countFarmer, countBakery, countShop, countHouse;

export const Logics = (sector) => {
  if (sector == "farmer") {
    const lackOfSuppliers = 1;
    const lackOfBuyers = countFarmer / (countBakery * 2);
    const lackOfPeople =
      countHouse / (countShop + countBakery + countFarmer * 2);
    return Math.min(
      lackOfSuppliers == Infinity ? 0 : lackOfSuppliers,
      lackOfBuyers == Infinity ? 0 : lackOfBuyers,
      lackOfPeople == Infinity ? 0 : lackOfPeople,
    );
  }
  if (sector == "bakery") {
    const lackOfSuppliers = countFarmer / (countBakery * 2);
    const lackOfBuyers = countBakery / countShop;
    const lackOfPeople =
      countHouse / (countShop + countBakery + countFarmer * 2);
    return Math.min(
      lackOfSuppliers == Infinity ? 0 : lackOfSuppliers,
      lackOfBuyers == Infinity ? 0 : lackOfBuyers,
      lackOfPeople == Infinity ? 0 : lackOfPeople,
    );
  }
  if (sector == "shop") {
    const lackOfSuppliers = countBakery / countShop;
    const lackOfBuyers = countShop / (countHouse / 6);
    const lackOfPeople =
      countHouse / (countShop + countBakery + countFarmer * 2);
    return Math.min(
      lackOfSuppliers == Infinity ? 0 : lackOfSuppliers,
      lackOfBuyers == Infinity ? 0 : lackOfBuyers,
      lackOfPeople == Infinity ? 0 : lackOfPeople,
    );
  }
  if (sector == "house") {
    const lackOfPeople =
      countHouse / (countShop + countBakery + countFarmer * 2);
    return lackOfPeople == Infinity ? 0 : lackOfPeople;
  }
};

export const CountBuilding = (groupOnPlane) => {
  countFarmer = countBakery = countShop = countHouse = 0;
  for (const child of groupOnPlane.children) {
    if (child.name == "farmer") countFarmer++;
    if (child.name == "bakery") countBakery++;
    if (child.name == "shop") countShop++;
    if (child.name == "house") countHouse++;
  }
};
