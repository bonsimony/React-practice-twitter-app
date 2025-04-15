import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 100vh;                          /* 화면 전체 높이를 기준으로 중앙 정렬 */ 
  display: flex;
  justify-content: center;                /* 수평 중앙 */
  align-items: center;                    /* 수직 중앙 */
  flex-direction: column;
  width: 420px;
  margin: 0 auto;                         /* 화면 가운데로 */
  padding: 50px 0px;

`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
   a{
    color : #1d9bf0;
  }
`;