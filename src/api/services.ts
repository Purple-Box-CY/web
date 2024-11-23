import { publicApi } from "./api";

export const service = {
  getArticleItem: async (alias: string) => {
    return await publicApi.get(`/articles/${alias}`);
  },
};
