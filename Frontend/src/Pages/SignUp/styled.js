import styled from "styled-components";

export const ContainerSignup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  h1 {
    color: white;
    font-weight: lighter;
    font-size: 40px;
    background-color: #fa6400;
    border-radius:24px;
    padding: 12px;
    width:22%;
    text-align: center;
  }
`;
export const ContainerForm = styled.form`
  input {
    width: 140px;
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid gray;
    outline: 0;
    font-size: 1.1rem;
    padding: 6px 0;
    background: transparent;
  }
  p {
    color: #fa6400;
    font-size: 18px;
  }
`;
export const ContainerButton = styled.div`
  display: flex;
  justify-content: space-around;
  button {
    margin: 0px 20px;
    align-items: center;
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: 24px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: inherit;
    font-size: 16px;
    line-height: 1.25;
    transition: all 250ms;
    width: 80px;
    height: 80px;
    margin-top: 60px;
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
