import styled from 'styled-components';

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 80px auto;

  h1 {
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  svg {
    margin-right: 10px;
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: block;
  flex-direction: row;

  input {
    border: 1px solid #eee;
    margin-right: 5px;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
  }
`;
export const SubmitButton = styled.button.attrs({
  type: 'submit',
})`
  display: block;
  background: #00ee00;
  margin-top: 30px;
  border: 0;
  padding: 0 15px;
  border-radius: 4px;
  width: 100px;
  height: 50px;
  margin: 20px auto;
  margin-left: auto;
  margin-right: auto;
`;
