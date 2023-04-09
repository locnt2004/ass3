import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import ShopPageProductList from "./ShopPageProductList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/product";
import { log } from "console";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faGift,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { cloneDeep } from "lodash";

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
  gap: 20px;
`;
const TableStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-style: italic;
  flex: 1;
`;

const ButtonsStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  background: rgb(244, 245, 249);
  button {
    border: none;
    padding: 10px;
    background: rgb(244, 245, 249);
    svg {
      padding: 0 10px;
    }
    &:hover {
      border: 1px solid;
    }
  }
`;

const ItemText = styled.div`
  display: flex;
  cursor: pointer;
  font-style: italic;
  justify-content: space-between;
  p {
    font-size: 20px;
    font-weight: 600;
  }
  span {
    color: gray;
  }
`;
const CardStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 20px;
  background: rgb(244, 245, 249);
`;
const InputStyle = styled.input`
  width: 100px;
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
  justify-content: center;
`;
const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
`;
//-----------------------COMPONENT-----------------------//

const ShopPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { listCart } = useSelector((state: any) => state.product);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let count = 0;
    listCart?.map(
      (item: any) => (count = count + item?.price * item?.quantity)
    );

    setTotal(count);
  }, [listCart]);

  const onChangeCart = (data: any, input: number) => {
    let newList = cloneDeep(listCart);

    newList.map((item: any) => {
      if (item?._id?.$oid === data?._id?.$oid) {
        item.quantity = input;
      }
    });

    dispatch(productActions.updateCard(newList));
  };
  const renderItem = (item: any) => {
    return (
      <tr key={item?.name}>
        <th scope="row">
          <img src={item?.img1} alt={item?.name} width="100px" height="auto" />
        </th>
        <td>
          <h3>{item?.name}</h3>
        </td>
        <td>{item?.price}</td>
        <td>
          <InputStyle
            type="number"
            id="staticEmail"
            placeholder="Quality"
            min={1}
            onChange={(e) => onChangeCart(item, +e.target.value)}
            value={item?.quantity}
          />
        </td>
        <td>
          {item?.price * item?.quantity} <br />
          VND
        </td>
        <td>
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() =>
              dispatch(productActions.deleteFromCard(item?._id?.$oid))
            }
          />
        </td>
      </tr>
    );
  };
  return (
    <ContainStyle className="container">
      <BannerStyle>
        <p>CARD</p>
        <span>CARD</span>
      </BannerStyle>

      {}
      <br />
      <br />
      <h3>SHOPPING CARD</h3>
      <br />

      <BodyStyle>
        <TableStyle>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">IMAGE</th>
                <th scope="col">PRODUCT</th>
                <th scope="col">PRICE</th>
                <th scope="col">QUANTITY</th>
                <th scope="col">TOTAL</th>
                <th scope="col">REMOVE</th>
              </tr>
            </thead>
            <tbody>{listCart.map((item: any) => renderItem(item))}</tbody>
          </table>
          <ButtonsStyle>
            <button onClick={() => navigate("/shop", { replace: true })}>
              <FontAwesomeIcon icon={faArrowLeft} />
              Continuate shopping
            </button>
            <button onClick={() => navigate("/checkout", { replace: true })}>
              Proceed to checkout <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </ButtonsStyle>
        </TableStyle>
        <CardStyle>
          <h3>CARD TOTAL</h3>
          <ItemText>
            <p> SUBTOTAL</p> <span>{total} VND</span>
          </ItemText>
          <ItemText>
            <p> TOTAL</p> <span>{total} VND</span>
          </ItemText>
          <FormStyle>
            <InputStyle
              type="text"
              placeholder="Enter your coupon"
              style={{ width: "100%" }}
            />
            <ButtonStyle
              type="button"
              className="btn btn-danger"
              onClick={() => {}}
            >
              <FontAwesomeIcon icon={faGift} />
              Apply coupon
            </ButtonStyle>
          </FormStyle>
        </CardStyle>
      </BodyStyle>
    </ContainStyle>
  );
};

export default ShopPage;
