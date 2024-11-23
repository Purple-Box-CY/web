export enum CollectionCategory {
  Paper = "Paper (brown)",
  Glass = "Glass (blue)",
  Plastic = "Cloth (purple)",
  Cloth = "Cloth (purple)",
  Electronic = "Electronic devices (white)",
  Battery = "Batteries (white)",
  GreenPoint = "Green Point",
  Multibox = "Multibox",
}

export interface IMapItem {
  type: CollectionCategory;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}

export const mapItems: IMapItem[] = [
  {
    type: CollectionCategory.GreenPoint,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.79006094745252,
      lng: 32.418863693095325,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Cloth,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.69151792256484,
      lng: 33.050757456679,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Plastic,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.690597084832795,
      lng: 33.04725500080777,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Multibox,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.67854955390529,
      lng: 33.04540692724845,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Paper,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.6874587707067,
      lng: 33.03883206136138,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Glass,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.67713651788428,
      lng: 33.03569413638736,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Electronic,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.68198922419246,
      lng: 33.0217216960928,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
  {
    type: CollectionCategory.Battery,
    description:
      "Recycling Batteries Clothing Electronics Ink cartridges Light bulbs Metal cans Plastic bags",
    location: {
      lat: 34.69434024865488,
      lng: 33.04070026107773,
    },
    name: "Chloraka Green Point Recycling Centre",
  },
];
