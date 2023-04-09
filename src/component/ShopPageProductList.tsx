import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;
const ProductListStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const TitleStyle = styled.div`
  font-weight: 700;
  padding: 20px 0;
  font-style: italic;
  font-size: 30px;
  p {
    font-weight: 300;
    font-size: 20px;
  }
`;

const ProductStyle = styled.div`
  padding: 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover {
    opacity: 0.5;
  }
`;

const NameStyle = styled.div`
  font-weight: 700;
  font-style: italic;
  font-size: 18px;
  text-align: center;
`;
const PriceStyle = styled.p`
  font-style: italic;
  font-size: 18px;
  color: gray;
`;

const NotfoundStyle = styled.h3`
  display: flex;
  padding: 100px 0;
  justify-content: center;
`;
//-----------------------COMPONENT-----------------------//

const ShopPageProductList = ({ products }: { products: any }) => {
  const navigate = useNavigate();

  const handleOnClick = (item: any) => {
    navigate(`/detail/${item._id.$oid}`, { replace: true });
  };
  // render item
  const renderItems = (item: any) => {
    return (
      <ProductStyle
        className="col-4"
        onClick={() => {
          handleOnClick(item);
        }}
        key={item?.name}
      >
        <img src={item?.img1} alt={item?.name} width="100%" />
        <NameStyle>{item?.name}</NameStyle>
        <PriceStyle>{item?.price} VND</PriceStyle>
      </ProductStyle>
    );
  };

  return (
    <ContainStyle className="container">
      {products?.length === 0 && <NotfoundStyle>NOT FOUND</NotfoundStyle>}
      <ProductListStyle>
        {products?.map((item: any) => renderItems(item))}
      </ProductListStyle>
    </ContainStyle>
  );
};

export default ShopPageProductList;
