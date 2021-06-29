import React from "react";
import styled from "styled-components";
import {
  FiberManualRecord,
  Create,
  InsertComment,
  Inbox,
  Drafts,
  BookmarkBorder,
  FileCopy,
  PeopleAlt,
  Apps,
  ExpandLess,
  ExpandMore,
  Add,
} from "@material-ui/icons";
import SidebarOption from "../sidebarOptions/SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [channels] = useCollection(db.collection("rooms"));
  const [user] = useAuthState(auth);
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>Test Channel</h2>
          <h3>
            <FiberManualRecord />
            {user.displayName}
          </h3>
        </SidebarInfo>
        <Create />
      </SidebarHeader>

      <SidebarOption Icon={InsertComment} title={"Threads"} />
      <SidebarOption Icon={Inbox} title={"Mention & reactions"} />
      <SidebarOption Icon={Drafts} title={"Saved items"} />
      <SidebarOption Icon={BookmarkBorder} title={"Channel browser"} />
      <SidebarOption Icon={PeopleAlt} title={"People & User groups"} />
      <SidebarOption Icon={Apps} title={"Apps"} />
      <SidebarOption Icon={FileCopy} title={"File Browser"} />
      <SidebarOption Icon={ExpandLess} title={"ShowLess"} />
      <hr />
      <SidebarOption Icon={ExpandMore} title={"Channels"} />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title={"Add Channel"} />

      {channels?.docs.map((doc) => {
        return (
          <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
        );
      })}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  flex: 0.3;
  background-color: var(--slack-color);
  border-top: 1px solid #49274b;
  max-width: 268px;

  > hr {
    margin: 10px 0;
    border: 1px solid #49274b;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  padding: 13px;
  border-bottom: 1px solid #49274b;

  > .MuiSvgIcon-root {
    background-color: white;
    color: #49274b;
    border-radius: 99%;
    padding: 5px;
    font-size: 18px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;
  }

  > h3 > .MuiSvgIcon-root {
    font-size: 14px;
    margin-top: 1px;
    margin-right: 2px;
    color: green;
  }
`;
