import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CategoryList from "./CategoryList";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product";

//-----------------------STYLE-----------------------//

const ContainStyle = styled.div`
  display: flex;
`;

const BottomContainStyle = styled.div`
  padding: 20px 0;
`;

const BannerStyle = styled.div`
  display: flex;
  flex: 1;
`;
const DescriptionStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;
  span {
    font-style: italic;
    font-size: 25px;
    color: gray;
  }
  p {
    font-size: 20px;
    color: gray;
  }
`;

const SliderStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
`;

const ImageStyle = styled.div`
  display: flex;
  flex: 1;
  img {
    height: auto;
    width: 100%;
  }
`;
const CategoryStyle = styled.div`
  display: flex;
  align-items: end;
  p {
    font-style: italic;
    font-size: 20px;
    font-weight: 700;
    color: black;
    margin: 0;
  }
`;
const FormStyle = styled.div`
  display: flex;
`;

const SearchInputStyle = styled.input`
  width: 300px;
  padding: 10px;
`;
const ButtonStyle = styled.button`
  background: black;
  gap: 10px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0;
  padding: 10px 25px;
`;

const RelatedProductStyle = styled.div`
  display: flex;
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
//-----------------------COMPONENT-----------------------//

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const [product, setProduct] = useState<any>();
  const { products } = useSelector((state: any) => state.product);

  const [total, setTotal] = useState(1);

  useEffect(() => {
    const data = products?.find((item: any) => item?._id?.$oid === id);
    if (data) {
      setProduct(data);
    } else {
      navigate("/home", { replace: true });
    }
  }, [id]);

  // render item
  const renderItems = (item: any) => {
    if (item.category !== product?.category) {
      return;
    }
    return (
      <ProductStyle
        className="col-3"
        onClick={() => {
          navigate(`/detail/${item._id.$oid}`, { replace: true });
        }}
        key={item?.name}
      >
        <img src={item?.img1} alt={item?.name} width="100%" />
        <NameStyle>{item?.name}</NameStyle>
        <PriceStyle>{item?.price} VND</PriceStyle>
      </ProductStyle>
    );
  };

  const handleAddToCardClick = () => {
    dispatch(productActions.addToCard({ ...product, quantity: total }));
  };

  return (
    <div className="container">
      <ContainStyle>
        <BannerStyle>
          <SliderStyle>
            <img src={product?.img1} alt={product?.name} width="100%" />
            <img src={product?.img2} alt={product?.name} width="100%" />
            <img src={product?.img3} alt={product?.name} width="100%" />
            <img src={product?.img4} alt={product?.name} width="100%" />
          </SliderStyle>
          <ImageStyle>
            <img src={product?.img1} alt={product?.name} />
          </ImageStyle>
        </BannerStyle>
        <DescriptionStyle>
          <h2>{product?.name}</h2>
          <span>{product?.price} VND</span>
          <p>{product?.short_desc}</p>
          <CategoryStyle>
            <p>CATEGORY : </p> {product?.category}
          </CategoryStyle>
          <FormStyle>
            <SearchInputStyle
              type="number"
              id="staticEmail"
              placeholder="Quality"
              min={1}
              onChange={(e) => setTotal(+e.target.value)}
              value={total}
            />
            <ButtonStyle
              type="button"
              className="btn btn-danger"
              onClick={() => handleAddToCardClick()}
            >
              Add to card
            </ButtonStyle>
          </FormStyle>
        </DescriptionStyle>
      </ContainStyle>
      <BottomContainStyle>
        <ButtonStyle type="button" className="btn btn-danger">
          DESCRIPTION
        </ButtonStyle>
        <br />
        <br />
        <h3>PRODUCT DESCRIPTION</h3>
        <br />
        <span
          dangerouslySetInnerHTML={{
            __html: product?.long_desc.replaceAll("\n", "<br />"),
          }}
        ></span>
        <br />
        <h4>Related Product</h4>

        <RelatedProductStyle>
          {products?.map((item: any) => renderItems(item))}
        </RelatedProductStyle>
      </BottomContainStyle>
    </div>
  );
};

export default Detail;
