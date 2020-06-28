import React from "react";
import usePromise from "utils/usePromise";
import { getPlace } from "utils/api";
import { connect } from "react-redux";

const Pharmacy = ({ location }) => {
  const [loading, response, error] = usePromise(() => {
    return getPlace("PM9", location.lat, location.lng, 3000, "약국");
  }, [location]);

  if (loading) {
    return <div>로딩중 . . .</div>;
  }
  if (error) {
    console.log(error);
    return <div>error</div>;
  }
  if (!response) {
    return null;
  }

  //   const items = response.data.stores;
  console.log(response);
  return <div>약국 검색</div>;
};

export default connect(({ position }) => ({
  location: position.location,
}))(Pharmacy);
