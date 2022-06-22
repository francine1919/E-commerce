import styled from "styled-components";

//shop page

export const ContainerTopShopPage = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  background-color: white;
  padding: 6px;
  width: 28%;
  height: 40px;
  border-radius: 30px;
  button {
    margin-right: 90px;
    align-items: center;
    background-color: #fa6400;
    border: 1px solid transparent;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.25;
    transition: all 250ms;
    width: 140px;
    height: 40px;
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
  p {
    color: #fa6400;
    font-size: 20px;
    font-weight: 600;
  }
`;
export const Spinner = styled.img`
  margin-top: 100px;
  margin-left: 600px;
`;

// shopping card

export const ContainerShoppingCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  margin-top: 60px;
`;

export const ContainerCard = styled.div`
  background-color: #fa6400;
  border: 0;
  border-radius: 30px;
  width: 90%;
  height: 80%;
  img {
    border-radius: 30px;
    width: 100%;
    height: 66%;
  }
`;
export const ContainerCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: white;
    font-weight: 400;
    text-align: center;
    height: 28px;
  }
  button {
    background-color: #fa6400;
    border: 1px inset white;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.25;
    transition: all 250ms;
    width: 140px;
    height: 40px;

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
