import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import usePromise from "utils/usePromise";
import { getMask } from "utils/api";

const List = styled.div`
  height: 35rem;
  width: 15rem;
  overflow: hidden;
  overflow-y: scroll;
`;

const Mask = ({ location }) => {
  const [loading, response, error] = usePromise(() => {
    return getMask(location.lat, location.lng, 3000);
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

  const items = response.data.stores;
  console.log(items);

  return (
    <div>
      마스크 판매처 검색
      <List>
        {items.map((item) => {
          return (
            <li key={item.code}>
              <h3>{item.name}</h3>
              <p>{item.addr}</p>
              <p>{item.created_at}</p>
              <p>{item.stock_at}</p>
              <p>{item.remain_stat}</p>
            </li>
          );
        })}
      </List>
    </div>
  );
};

export default connect(({ position }) => ({
  location: position.location,
}))(Mask);
