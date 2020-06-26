import React from "react";
import axios from "axios";
import styled from "styled-components";

import usePromise from "utils/usePromise";
import { getMaskURL } from "utils/url";
import SearchAddress from "../SearchAddress/SearchAddress";

// const MaskBlock = styled.div`
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: center;
// `;

const Mask = () => {
  //   const [loading, response, error] = usePromise(() => {
  //     return axios.get(getMaskURL(33.450701, 126.570667, 5000));
  //   }, []);

  //   if (loading) {
  //     return <div>로딩중 . . .</div>;
  //   }
  //   if (error) {
  //     console.log(error);
  //     return <div>error</div>;
  //   }
  //   if (!response) {
  //     return null;
  //   }
  //   console.log(response);

  return (
    <div>
      마스크 판매처 검색
      <SearchAddress />
    </div>
  );
};

export default Mask;
