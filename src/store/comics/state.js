import { getStorage } from "../../utils/storage";

export const state = {
  cors_header: "https://any-api.com:8443",
  api_url: `http://xkcd.com/${Math.ceil(Math.random() * 2755)}`,
  api_url_format: "info.0.json",
  loading: true,
  current_comic: null,
  rated_comics: getStorage("rated_comics")
};
