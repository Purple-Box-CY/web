import { CollectionCategory } from "./data/map";

export interface IArticle {
  alias: string;
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
}

export interface IBox {
  description: string;
  imageUrl: string;
  location: { lat: number; lng: number };
  name: string;
  type: CollectionCategory;
  uid: string;
}
