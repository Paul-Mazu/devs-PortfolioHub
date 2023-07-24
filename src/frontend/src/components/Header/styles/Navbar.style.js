import styled from "styled-components";
import { Link } from "react-router-dom";

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${(props) => (props.extendNavbar ? "100vh" : "80px")};
  background-color: #0C0910;
  display: flex;
  flex-direction: column;
  z-index: 1;

  @media (min-width: 700px) {
    height: 80px;
  }
`;
export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5%;
`;

export const RightOptions = styled.div`
  margin-top: 45px;
`

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 50px;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
  margin-top: 30px;
`;

export const NavbarLink = styled(Link)`
  color: #F0F6F6;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  color: #F0F6F6;
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;

`;

export const ImgLogo = styled.img`
  height: 50px;
  position: relative;
  bottom: 12.5px;
`;

export const TextLogo = styled.img`
  height: 30px;
  position: relative;
  bottom: 20px;
  padding-right: 20px;
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
