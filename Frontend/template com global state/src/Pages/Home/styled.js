import styled from "styled-components";

export const ContainerHome = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ImgHome = styled.img`
  height: 500px;
`;
export const LogoHome = styled.img`
margin-top:80px;
height: 150px;
`;
export const ContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    margin: 0px 60px;
    align-items: center;
    /* background-clip: padding-box; */
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    /* box-sizing: border-box; */
    color: #fff;
    cursor: pointer;
    /* display: inline-flex; */
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    /* justify-content: center; */
    line-height: 1.25;
    /* min-height: 3rem; */
    /* position: relative; */
    transition: all 250ms;
    width: 140px;
    height: 150px;
    margin-top: 100px;
    :hover,
    :focus {
      background-color: #fb8332;
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
    }

    :hover {
      transform: translateY(-1px);
    }

    :active {
      background-color: #c85000;
      box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
      transform: translateY(0);
    }
  }
`;
