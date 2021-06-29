import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { InfoOutlined, StarBorderOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { selectRoomId } from "../../features/appSlice";
import ChatInput from "./chatInput/ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import Message from "./message/Message";
const Chat = () => {
  const roomId = useSelector(selectRoomId);
  const chatRef = useRef(null);
  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );
  const [roomMessages] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("message")
        .orderBy("timestemp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, roomMessages]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                {roomDetails ? (
                  <strong>#{roomDetails?.data().name}</strong>
                ) : (
                  <strong>#roomname</strong>
                )}
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>

            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              console.log(doc);
              const { message, timestemp, user, userImage } = doc.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestemp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
          </ChatMessages>
          <ChatBottom ref={chatRef} />
          <ChatInput
            chatRef
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
`;

const Header = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }

  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 5px;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;
const ChatBottom = styled.div`
  padding: 40px;
`;
