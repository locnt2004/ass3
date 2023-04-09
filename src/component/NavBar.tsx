//-----------------------STYLE-----------------------//

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActions } from "../store/auth";
import {
  faCartShopping,
  faRightToBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ContainStyle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  font-weight: 700;
`;

const PagesStyle = styled.div`
  display: flex;
  gap: 20px;
  font-weight: 700;
  span {
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
`;
const LogoStyle = styled.div`
  color: gray;
`;
const MenuBarStyle = styled.div`
  display: flex;
  gap: 20px;
  span {
    cursor: pointer;
    &:hover {
      color: orange;
    }
  }
`;
//-----------------------COMPONENT-----------------------//
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state: any) => state.auth);

  const onAuthClick = () => {
    if (isAuthenticated) {
      dispatch(authActions.logout());
    } else {
      navigate("/sign-in", { replace: true });
    }
  };

  return (
    <ContainStyle className="container">
      {/* page contains */}

      <PagesStyle>
        <span onClick={() => navigate("/", { replace: true })}>Home</span>
        <span onClick={() => navigate("/shop", { replace: true })}>Shop</span>
      </PagesStyle>
      <LogoStyle>BOUTIQUE</LogoStyle>
      <MenuBarStyle>
        <span onClick={() => navigate("/card", { replace: true })}>
          <FontAwesomeIcon icon={faCartShopping} /> Cart
        </span>
        {isAuthenticated && user?.name && (
          <span>
            <FontAwesomeIcon icon={faUser} /> {user.name}
          </span>
        )}
        <span onClick={() => onAuthClick()}>
          <FontAwesomeIcon icon={faRightToBracket} />{" "}
          {isAuthenticated ? "Logout" : "Login"}
        </span>
      </MenuBarStyle>
    </ContainStyle>
  );
};

export default NavBar;
