import { publicApi } from "./api";

export const service = {
  getArticleItem: async (alias: string) => {
    return await publicApi.get(`/articles/${alias}`);
  },

  getBoxItem: async (alias: string) => {
    return await publicApi.get(`/articles/${alias}`);
  },
};

export const camera = {
  getRecognitionItem: async (imageBase64: string) => {
    const base64ToBlob = (base64: string) => {
      const byteString = atob(base64.split(",")[1]);
      const mimeString = base64.split(",")[0].split(":")[1].split(";")[0]; // Определяем MIME тип
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const intArray = new Uint8Array(arrayBuffer);

      for (let i = 0; i < byteString.length; i++) {
        intArray[i] = byteString.charCodeAt(i);
      }

      return new Blob([intArray], { type: mimeString });
    };

    const imageBlob = base64ToBlob(imageBase64);

    const formData = new FormData();
    formData.append("file", imageBlob, "image.jpg");

    return await publicApi.post("/camera/box", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
