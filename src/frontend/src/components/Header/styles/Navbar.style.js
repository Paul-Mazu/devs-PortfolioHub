import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "55px")};
  background-color: #0C0910;
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media (min-width: 700px) {
    height: 55px;
  }
`;
export const LeftContainer = styled.div`
  flex: 60%;
  display: flex;
  padding-left: 250px;
`;

export const RightOptions = styled.div`
  // margin-top: 45px;
`

export const RightContainer = styled.div`
  flex: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  // height: 55px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  // margin-top: 30px;
`;

export const NavbarLink = styled(Link)`
  color: #F0F6F6;
  font-size: 1.6rem;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: #F0F6F6;
  font-size: 1.6rem;
  text-decoration: none;
  margin: 10px; 
`;

export const NavbarSearchField = styled.form`
  position: relative;
  right: 50px;
  width: 280px;
  text-decoration: none;
`;

export const NavbarSearchInput = styled.input`
width: 100%;
padding: 7.5px;
border: 1px solid #ccc;
border-radius: 5px;
color: #F0F6F6;
background-color: #453750;
border-color: #F0F6F6;
font-family: Sen, Arial, sans-serif;
`;

export const ImgLogo = styled.img`
  max-height: 25px;
  max-width: 175px;
  margin: 5px;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: #F0F6F6;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
    
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
