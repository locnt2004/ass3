import { log } from "console";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authActions } from "../store/auth";

//------------------------------------------------

const ContainStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const FormStyle = styled.section`
  position: absolute;
  gap: 10px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0;
  padding: 50px;
  flex-direction: column;
  box-shadow: 2px 5px 10px 0px #888888;
  border-radius: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #494949;
  background: white;
  h1 {
    padding-bottom: 30px;
    font-style: italic;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;
const InputStyle = styled.input`
  width: 400px;
  padding: 20px;
`;

const BannerStyle = styled.div`
  position: relative;
  height: 100%;

  img {
    height: 100%;
    width: 100%;
  }
`;

const ButtonStyle = styled.button`
  background: #494949;
  gap: 10px;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 0;
  padding: 15px 25px;
  justify-content: center;
  margin-top: 50px;
`;

const TextStyle = styled.div`
  color: #494949;
  a {
    color: blue !important;
    cursor: pointer;
  }
`;
const SignInPage = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    setErrorMessage("");
  }, [isLogin]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (isLogin) {
      const emailInput = event.target[0].value;
      const passwordInput = event.target[1].value;
      const data = {
        email: emailInput,
        password: passwordInput,
      };
      handleLogin(data);
    } else {
      const nameInput = event.target[0].value;
      const emailInput = event.target[1].value;
      const passwordInput = event.target[2].value;
      const phoneInput = event.target[3].value;
      const data = {
        name: nameInput,
        email: emailInput,
        password: passwordInput,
        phone: phoneInput,
      };
      handleSingUp(data);
    }
  };

  const handleLogin = (user: { email: string; password: string }) => {
    const ass3_userArr = localStorage.getItem("ass3_userArr");
    if (ass3_userArr) {
      const userList = JSON.parse(ass3_userArr);
      const indexFined = (userList as []).find(
        (item: any) =>
          item.email === user.email && item.password === user.password
      );
      if (indexFined) {
        dispatch(authActions.login(indexFined));
        navigate("/home", { replace: true });
      } else {
        setErrorMessage("Email or password is not correct");
      }
    }
  };
  const handleSingUp = (user: {
    name: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const ass3_userArr = localStorage.getItem("ass3_userArr");
    if (ass3_userArr) {
      const userList = JSON.parse(ass3_userArr);
      const indexFined = (userList as []).findIndex(
        (item: any) => item.email === user.email
      );
      if (indexFined === -1) {
        const newList = [...userList, user];
        localStorage.setItem("ass3_userArr", JSON.stringify(newList));
        setIsLogin(true);
        setErrorMessage("");
      } else {
        // already have email in system
        setErrorMessage("already have email in system");
      }
    } else {
      localStorage.setItem("ass3_userArr", JSON.stringify([user]));
      setIsLogin(true);
      setErrorMessage("");
    }
  };

  return (
    <ContainStyle>
      <BannerStyle>
        <img src={`${process.env.PUBLIC_URL}/images/banner1.jpg`} />
      </BannerStyle>
      <FormStyle>
        <h1>{isLogin ? "Sign In" : "Sign Up"}</h1>
        <form onSubmit={handleSubmit}>
          {isLogin ? (
            <>
              <InputStyle
                key={1}
                type="email"
                id="email"
                required
                placeholder="Email"
              />
              <InputStyle
                key={2}
                type="password"
                id="password"
                required
                placeholder="Password"
              />
            </>
          ) : (
            <>
              <InputStyle
                key={3}
                type="text"
                required
                placeholder="Full Name"
              />
              <InputStyle
                key={4}
                type="email"
                id="email"
                required
                placeholder="Email"
              />
              <InputStyle
                key={5}
                type="password"
                id="password"
                required
                placeholder="Password"
              />
              <InputStyle key={6} type="text" required placeholder="Phone" />
            </>
          )}
          <p style={{ color: "red" }}>{errorMessage}</p>
          <ButtonStyle type="submit" className="btn btn-danger">
            {isLogin ? "Sign In" : "Sign Up"}
          </ButtonStyle>
        </form>

        {isLogin ? (
          <TextStyle>
            Create an account? <a onClick={() => setIsLogin(false)}>Sign up</a>
          </TextStyle>
        ) : (
          <TextStyle>
            Login? <a onClick={() => setIsLogin(true)}>Click</a>
          </TextStyle>
        )}
      </FormStyle>
    </ContainStyle>
  );
};

export default SignInPage;
