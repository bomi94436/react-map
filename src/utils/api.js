import axios from "axios";
import { KAKAO_MAP_REST_API_KEY } from "config";
const mask = process.env.MASK_URL;

export const getMaskURL = (lat, lng, m) => {
  return `${mask}?lat=${lat}&lng=${lng}&m=${m}`;
};

export const getLatLng = (si, gu, dong) =>
  axios
    .get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${si} ${gu} ${dong}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_REST_API_KEY}`,
        },
      }
    )
    .then((res) => ({
      lat: Number(res.data.documents[0].y),
      lng: Number(res.data.documents[0].x),
    }));
