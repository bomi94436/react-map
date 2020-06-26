const mask =
  "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json";

export const getMaskURL = (lat, lng, m) => {
  return `${mask}?lat=${lat}&lng=${lng}&m=${m}`;
};
