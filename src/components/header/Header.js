import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { AccessTime, Search, HelpOutline } from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
const Header = () => {
  const [user] = useAuthState(auth);
  console.log(user);
  return (
    <HeaderContainer>
      {/* Header Left */}
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => {
            auth.signOut();
          }}
        >
          <img src={user.photoURL} alt={user.displayName} />
        </HeaderAvatar>
        <AccessTime />
      </HeaderLeft>

      {/* Header Search */}
      <HeaderSearch>
        <Search />
        <input type="text" placeholder="Search.." />
      </HeaderSearch>
      {/* Header Right */}
      <HeaderRight>
        <HelpOutline />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  opacity: 1;
  background-color: #421f44;
  border-radius: 6px;
  text-align: center;
  padding: 0 50px;
  color: gray;
  border: 1px solid gray;

  > input {
    background-color: transparent;
    text-align: center;
    border: none;
    color: white;
    min-width: 30vw;
    :focus {
      outline: none;
    }
  }
`;
const HeaderContainer = styled.div`
  /* position: fixed; */
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px 0;
  color: white;
  justify-content: space-between;
  background-color: var(--slack-color);
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 30px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }
`;
