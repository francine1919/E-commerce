import styled from "styled-components";
export const Total = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #fa6400;
  margin: 18px;
`;

export const ContainerCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;

  h3 {
    text-align: center;
    font-size: 30px;
    margin: 16px;
color: #fa6400;
}
  p {
    text-align: center;
    font-weight: lighter;
    font-size: 18px;
  }
  button {
    margin-bottom: 20px;
    background-color: #fa6400;
    border: 1px inset white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.25;
    transition: all 250ms;
    width: 160px;
    height: 60px;

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
export const ContainerCartItem = styled.div`
  display: flex;
  flex-direction: column;
  margin: 14px;
  background-color: #fa6400;
   box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;  
  height: 160px;
  width: 500px;
  border-radius: 40px;
`;

//container cart items

export const ContainerCartItemQtd = styled.div`
  display: flex;
  justify-content: space-evenly;

  button {
    margin-bottom: 0;
    background-color: #fa6400;
    border: 1px inset white;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: #fff;
    cursor: pointer;
    font-family: system-ui, -apple-system, system-ui, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.25;
    transition: all 250ms;
    width: 30px;
    height: 30px;

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
