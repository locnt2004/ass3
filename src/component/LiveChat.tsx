import {
  faComments,
  faFaceSmile,
  faPaperclip,
  faUserNinja
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

//-----------------------STYLE-----------------------//

const FormStyle = styled.div`
  position: fixed;
  right: 100px;
  bottom: 100px;
  border-radius: 20px;
  border: 1px solid;
  width: 400px;
  gap: 10px;
  padding: 10px;
  background: white;
  max-height: 600px;
  overflow-y: auto;
`;
const IconStyle = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: white;
  border: 5px solid;
  svg {
    height: 100%;
    width: 100%;
    padding: 7px;
    box-sizing: border-box !important;
  }
`;

const TitleStyle = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 10px 10px 0 10px;
`;

const TextStyle = styled.div`
  font-size: 18px;
  font-weight: 600;
  display: flex;
  font-style: italic;
  p {
    padding: 5px 10px;
    border-radius: 10px;
  }
  svg {
    height: 30px;
  }
`;
const InputStyle = styled.input`
  width: 300px;
  padding: 10px;
`;
const ChatInputStyle = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  svg {
    height: 20px;
  }
`;

//-----------------------COMPONENT-----------------------//

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState([
    {
      admin: false,
      message: "Xin chào",
    },
    {
      admin: false,
      message: "Làm thế nào để xem các sản phẩm",
    },
    {
      admin: true,
      message: "Chào bạn",
    },
    {
      admin: true,
      message: "Bạn có thể vào mục Shop để xem các sản phẩm",
    },
  ]);
  const [inputChat, setInputChat] = useState("");
  const renderItem = (item: any) => {
    return (
      <TextStyle
        style={
          item.admin ? { justifyContent: "start" } : { justifyContent: "end" }
        }
      >
        {item.admin && <FontAwesomeIcon icon={faUserNinja} />}
        <p
          style={
            item.admin ? { background: "#f5f6f7" } : { background: "#48b0f7" }
          }
        >
          {item?.message}
        </p>
      </TextStyle>
    );
  };

  const handleEnter = (event: any) => {
    if (event.key === "Enter") {
      setChatMessage([
        ...chatMessage,
        {
          admin: false,
          message: inputChat,
        },
      ]);
      setInputChat("");
    }
  };
  return (
    <>
      <IconStyle>
        <FontAwesomeIcon icon={faComments} onClick={() => setIsOpen(!isOpen)} />
      </IconStyle>
      {isOpen && (
        <FormStyle>
          <TitleStyle>Customer support</TitleStyle>
          <hr />
          {chatMessage.map((item) => renderItem(item))}
          <hr />
          <ChatInputStyle>
            <InputStyle
              type="text"
              required
              placeholder="Enter Message!"
              onKeyUp={(e) => handleEnter(e)}
              value={inputChat}
              onChange={(e) => setInputChat(e.target.value)}
            />
            <FontAwesomeIcon icon={faPaperclip} />
            <FontAwesomeIcon icon={faFaceSmile} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M446.7 98.6l-67.6 318.8c-5.1 22.5-18.4 28.1-37.3 17.5l-103-75.9-49.7 47.8c-5.5 5.5-10.1 10.1-20.7 10.1l7.4-104.9 190.9-172.5c8.3-7.4-1.8-11.5-12.9-4.1L117.8 284 16.2 252.2c-22.1-6.9-22.5-22.1 4.6-32.7L418.2 66.4c18.4-6.9 34.5 4.1 28.5 32.2z" />
            </svg>
          </ChatInputStyle>
        </FormStyle>
      )}
    </>
  );
};

export default LiveChat;
