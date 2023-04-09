import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ShopPageProductList from "./ShopPageProductList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product";
import { log } from "console";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0;
  flex-direction: column;
`;

const BannerStyle = styled.div`
  display: flex;
  background: rgb(244, 245, 249);
  height: 200px;
  width: 100%;
  font-style: italic;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  p {
    font-size: 40px;
    font-weight: 600;
  }
  span {
    font-size: 20px;
    opacity: 0.5;
  }
`;

const BodyStyle = styled.div`
  display: flex;
`;
const NavbarStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-style: italic;
  width: 200px;
  h4 {
    padding: 20px 0;
  }
`;
const HeaderText = styled.div`
  display: flex;
  font-weight: 700;
  padding: 5px 20px;
  background: #f4f5f9;
`;
const ItemText = styled.div`
  display: flex;
  cursor: pointer;
  padding: 5px 20px;
  &:hover {
    color: orange;
  }
`;
const ProductsStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const SearchInputStyle = styled.input`
  width: 300px;
  padding: 10px;
  margin: 20px;
`;

//-----------------------COMPONENT-----------------------//

const ShopPage = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state: any) => state.product);

  const [searchText, setSearchText] = useState("");
  const [selectCategory, setSelectCategory] = useState("");

  const [productFilter, setProductFilter] = useState([]);

  const CategoryList = [
    {
      text: "APPLE",
      item: [
        {
          text: "All",
        },
      ],
    },
    {
      text: "IPHONE & MAC",
      item: [
        {
          text: "iPhone",
        },
        {
          text: "ipad",
        },
        {
          text: "MacBook",
        },
      ],
    },
    {
      text: "WIRELESS",
      item: [
        {
          text: "AirPod",
        },
        {
          text: "Watch",
        },
      ],
    },
    {
      text: "ORDER",
      item: [
        {
          text: "Mouse",
        },
        {
          text: "Keyboard",
        },
        {
          text: "Order",
        },
      ],
    },
  ];

  useEffect(() => {
    getProducts();

    setSelectCategory(type ? type : "All");
  }, []);

  useEffect(() => {
    if (selectCategory && selectCategory !== "All") {
      const searchData = products.filter(
        (item: any) =>
          item?.category.toLocaleLowerCase() ===
          selectCategory.toLocaleLowerCase()
      );
      setProductFilter(searchData);
    } else {
      setProductFilter(products);
    }
  }, [selectCategory, products]);

  useEffect(() => {
    // logic detect input search change
    const searchData = products.filter((item: any) =>
      item?.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setProductFilter(searchData);
  }, [searchText]);

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
    <ContainStyle className="container">
      <BannerStyle>
        <p>SHOP</p>
        <span>SHOP</span>
      </BannerStyle>
      <BodyStyle>
        <NavbarStyle>
          <h4>CATEGORY</h4>

          {CategoryList.map((item, index) => (
            <Fragment key={item.text}>
              <HeaderText
                style={
                  index === 0
                    ? { color: "white", backgroundColor: "black" }
                    : {}
                }
              >
                {item.text}
              </HeaderText>
              {item.item.map((i) => (
                <ItemText
                  key={i.text}
                  style={
                    selectCategory.toLocaleLowerCase() ===
                    i.text.toLocaleLowerCase()
                      ? { color: "orange" }
                      : {}
                  }
                  onClick={() => setSelectCategory(i.text)}
                >
                  {i.text}
                </ItemText>
              ))}
            </Fragment>
          ))}
        </NavbarStyle>

        <ProductsStyle>
          <SearchInputStyle
            type="text"
            id="staticEmail"
            placeholder="Enter search here"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ShopPageProductList products={productFilter} />
        </ProductsStyle>
      </BodyStyle>
    </ContainStyle>
  );
};

export default ShopPage;
