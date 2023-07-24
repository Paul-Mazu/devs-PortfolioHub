import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  NavbarContainer,
  LeftContainer,
  RightContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLinkContainer,
  NavbarLink,
  ImgLogo,
  TextLogo,
  OpenLinksButton,
  NavbarLinkExtended,
  RightOptions,
  NavbarSearchField,
  NavbarSearchInput
} from "./styles/Navbar.style";
// import LogoImg from "./logo4.png";
import LogoText from "../../images/text-gradient.png";
import LogoImg from "../../images/logo-gradpurple.png";
import { getCurrentUser } from "../../api/users.api";
import { getToken, destroyToken } from "../../helpers/helpers.js";

function Navbar() {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const [activeUser, setActiveUser] = useState(false);
  const [query, setQuery] = useState('');

  const path = useLocation().pathname;
  const location = path.split("/")[1];

  const userToken = getToken();

  useEffect(() => {
    getCurrentUser(userToken)
      .then((response) => setActiveUser(response.data))
      .catch(e => setActiveUser(false));
  }, []);

  const searchDevelopers = (e) => {
    e.preventDefault();
  }

  const queryEntered = (e) => {
    setQuery(e.target.value);
    // buttonEnabled(username, password)
}

  return (
    <NavbarContainer extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            <NavbarLink to="/">
              <ImgLogo src={LogoImg}></ImgLogo>
              <TextLogo src={LogoText}></TextLogo>
            </NavbarLink>
            {/* <RightOptions> */}
              <NavbarLink to="/developers"> Developers</NavbarLink>
              <NavbarLink to="/projects"> Projects</NavbarLink>
            {/* </RightOptions> */}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          <NavbarSearchField onSubmit={searchDevelopers}>
            { location !== "projects" ? (
              <NavbarSearchInput type="text" placeholder="Search by developer name or skill" value={query} onChange={e => queryEntered(e)}/>
              ) : (
              <NavbarSearchInput type="text" placeholder="Search by project name or author" value={query} onChange={e => queryEntered(e)}/>
              )
              }
          </NavbarSearchField>
          {!activeUser &&
            <NavbarLink to="/register"> Create profile</NavbarLink>
          }
          {!activeUser &&
            <NavbarLink to="/login"> Sign in</NavbarLink>
          }
          {activeUser &&
            <NavbarLink to="/profile"> Profile</NavbarLink>
          }
          {activeUser &&
            <NavbarLink onClick={() => {
              destroyToken();
              window.location = "/";
            }}> Sign out</NavbarLink>
          }
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          <NavbarLinkExtended to="/developers"> Developers</NavbarLinkExtended>
          <NavbarLinkExtended to="/projects"> Projects</NavbarLinkExtended>
          <NavbarLinkExtended to="/my-profile">
            {" "}
            Create profile
          </NavbarLinkExtended>
          <NavbarLinkExtended to="/sign-in"> Sign in</NavbarLinkExtended>
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
}

export default Navbar;
