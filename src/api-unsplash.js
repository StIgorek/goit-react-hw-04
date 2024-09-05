import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
//const ACCESS_KEY = `q60Ogmk6GV6fPHDstq1jN_lJ301eC11JD0k3YWbeDyM`;

const instance = axios.create({
  baseURL: "https://api.unsplash.com/",
  headers: {
    "Accept-Version": "v1",
    Authorization: "Client-ID q60Ogmk6GV6fPHDstq1jN_lJ301eC11JD0k3YWbeDyM",
  },
});

export const fetchImages = async (searchRequest) => {
  const response = await instance.get(`/search/photos`, {
    params: {
      query: searchRequest,
      //orientation: "landscape",
      //page,
      //per_page: 20,
    },
  });

  return response.data

};