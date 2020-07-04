import axios from "axios";
import { KAKAO_MAP_REST_API_KEY, MASK_URL } from "config";

// 마스크 판매처 검색
export const getMask = (lat, lng, m) =>
  axios.get(`${MASK_URL}?lat=${lat}&lng=${lng}&m=${m}`);

// 주소 -> 좌표 검색
export const getLatLng = (si, gu, dong) =>
  axios.get(
    `https://dapi.kakao.com/v2/local/search/address.json?query=${si} ${gu} ${dong}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_MAP_REST_API_KEY}`,
      },
    }
  );

// 병원(HP8), 약국(PM9) 검색
export const getPlace = (lat, lng, code) => {
  let query = null;
  switch (code) {
    case "PM9":
      query = "약국";
      break;
    case "HP8":
      query = "병원";
      break;
    default:
      break;
  }
  return axios.get(
    `https://dapi.kakao.com/v2/local/search/keyword.json?category_group_code=${code}&y=${lat}&x=${lng}&radius=2000&query=${query}`,
    {
      headers: {
        Authorization: `KakaoAK ${KAKAO_MAP_REST_API_KEY}`,
      },
    }
  );
};
