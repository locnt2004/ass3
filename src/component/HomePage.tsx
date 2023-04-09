import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { useEffect } from "react";
import { productActions } from "../store/product";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

const BannerStyle = styled.div`
  position: relative;

  img {
    height: auto;
    width: 100%;
  }
`;
const BannerContain = styled.div`
  position: absolute;
  top: 50%;
  font-style: italic;
  padding: 0 50px;
  transform: translateY(-50%);
  p {
    font-size: 20px;
  }
`;

const TextStyle = styled.div`
  font-size: 35px;
  font-weight: 600;
`;

const ButtonStyle = styled.button`
  margin-top: 20px;
  padding: 15px 25px;
  font-size: 20px;
  background: black;
  color: white;
  font-style: italic;
  font-weight: 100;
  border: none;
  cursor: pointer;
`;
//-----------------------COMPONENT-----------------------//

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickButton = () => {
    navigate("/shop", { replace: true });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get(
        `https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74`
      )
      .then((res) => {
        // get max 8 items
        const productArray = (res.data as []).filter(
          (item, index) => index < 8
        );
        dispatch(productActions.updateProduct(productArray));
      });
  };
  return (
    <ContainStyle>
      <BannerStyle>
        <img src={`${process.env.PUBLIC_URL}/images/banner1.jpg`} />
        <BannerContain>
          <p>NEW INSPIRATION 2020</p>

          <TextStyle>
            20% OFF ON NEW <br />
            SEASON
          </TextStyle>
          <ButtonStyle onClick={onClickButton}>Browse collections</ButtonStyle>
        </BannerContain>
      </BannerStyle>
      <CategoryList />
      <ProductList />
    </ContainStyle>
  );
};

export default HomePage;
