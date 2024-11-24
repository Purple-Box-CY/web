export enum CollectionCategory {
  Paper = "paper",
  Glass = "glass",
  Plastic = "plastic",
  Cloth = "cloth",
  Electronic = "electronic",
  Battery = "battery",
  GreenPoint = "green_point",
  Multibox = "multibox",
}

export interface IMapItem {
  uid: string;
  type: CollectionCategory;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
}
