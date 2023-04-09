import styled from "styled-components";
import React from "react";
import { useNavigate } from "react-router-dom";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
`;

const RowStyle = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  div:hover {
    opacity: 0.5;
  }
`;
//-----------------------COMPONENT-----------------------//

const CategoryList = () => {
  const navigate = useNavigate();

  const handleOnClick = (type: string) => {
    navigate(`/shop/${type}`, { replace: true });
  };
  return (
    <ContainStyle className="container">
      <RowStyle>
        <div className="card border-0" onClick={() => handleOnClick("iphone")}>
          <img src={`./images/product_1.png`} />
        </div>
        <div className="card border-0" onClick={() => handleOnClick("mac")}>
          <img src={`./images/product_2.png`} />
        </div>
      </RowStyle>
      <RowStyle>
        <div className="card border-0" onClick={() => handleOnClick("ipad")}>
          <img src={`./images/product_3.png`} />
        </div>
        <div className="card border-0" onClick={() => handleOnClick("watch")}>
          <img src={`./images/product_4.png`} />
        </div>
        <div
          className="card border-0 0"
          onClick={() => handleOnClick("airPod")}
        >
          <img src={`./images/product_5.png`} />
        </div>
      </RowStyle>
    </ContainStyle>
  );
};

export default CategoryList;
