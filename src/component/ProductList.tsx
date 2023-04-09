import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const ItemContainsStyle = styled.div`
  display: flex;
`;

const InfoStyle = styled.div`
  padding: 0 50px;
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
const HeaderStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;
//-----------------------COMPONENT-----------------------//

const ProductList = () => {
  const navigate = useNavigate();
  const { products } = useSelector((state: any) => state.product);
  const [selectItem, setSelectItem] = useState<any>();


  // render item
  const renderItems = (item: any) => {
    return (
      <ProductStyle
        className="col-3"
        onClick={() => {
          setSelectItem(item);
        }}
        key={item?.name}
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        <img src={item?.img1} alt={item?.name} width="100%" />
        <NameStyle>{item?.name}</NameStyle>
        <PriceStyle>{item?.price} VND</PriceStyle>
      </ProductStyle>
    );
  };

  return (
    <ContainStyle className="container">
      <TitleStyle>
        <p>MADE THE HARD WAY</p>
        TOP TRENDING PRODUCTS
      </TitleStyle>
      <ProductListStyle>
        {products?.map((item: any) => renderItems(item))}
      </ProductListStyle>

      <div className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <HeaderStyle>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </HeaderStyle>

            <ItemContainsStyle className="modal-body">
              <img
                src={selectItem?.img1}
                alt={selectItem?.name}
                width="50%"
                height={"auto"}
              />
              <InfoStyle>
                <h4>{selectItem?.name}</h4>
                <p>{selectItem?.short_desc}</p>

                <ButtonStyle
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    navigate(`/detail/${selectItem._id.$oid}`, {
                      replace: true,
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  View Detail
                </ButtonStyle>
              </InfoStyle>
            </ItemContainsStyle>
          </div>
        </div>
      </div>
    </ContainStyle>
  );
};

export default ProductList;
