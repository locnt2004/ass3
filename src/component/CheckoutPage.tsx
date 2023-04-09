import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
  form {
    flex: 1;
  }
`;
const TableStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-style: italic;
  flex: 1 1 0%;
  gap: 10px;
  padding: 20px 0;
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
  width: 100%;
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

//-----------------------COMPONENT-----------------------//

const CheckoutPage = () => {
  const navigate = useNavigate();

  const { listCart } = useSelector((state: any) => state.product);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if ((listCart as []).length) {
      let count = 0;
      listCart?.map(
        (item: any) => (count = count + item?.price * item?.quantity)
      );

      setTotal(count);
    } else {
      navigate("/shop", { replace: true });
    }
  }, [listCart]);

  const renderItem = (item: any) => {
    return (
      <>
        {" "}
        <ItemText key={item?.name}>
          <p> {item?.name}</p>
          <span>
            {item?.price} VND x {item?.quantity}
          </span>
        </ItemText>
        <hr />
      </>
    );
  };

  return (
    <ContainStyle className="container">
      <BannerStyle>
        <p>CHECKOUT</p>
        <span>HOME / CART / CHECKOUT</span>
      </BannerStyle>

      <br />
      <br />
      <h3>BILLING DETAILS</h3>
      <br />

      <BodyStyle>
        <form onSubmit={() => {}}>
          <TableStyle>
            <label>FULL NAME: </label>
            <InputStyle type="text" placeholder="Enter Your Full Name Here!" />
            <label>EMAIL: </label>

            <InputStyle type="text" placeholder="Enter Your Email Here!" />
            <label>PHONE NUMBER: </label>

            <InputStyle
              type="text"
              placeholder="Enter Your Phone Number Here"
            />
            <label>ADDRESS: </label>

            <InputStyle type="text" placeholder="Enter Your Address Here!" />

            <ButtonStyle
              type="submit"
              className="btn btn-danger"
              style={{ width: "150px" }}
            >
              Place order
            </ButtonStyle>
          </TableStyle>
        </form>
        <CardStyle>
          <h3>YOUR ODER</h3>
          {listCart.map((item: any) => renderItem(item))}
          <ItemText>
            <p> TOTAL</p> <span>{total} VND</span>
          </ItemText>
        </CardStyle>
      </BodyStyle>
    </ContainStyle>
  );
};

export default CheckoutPage;
