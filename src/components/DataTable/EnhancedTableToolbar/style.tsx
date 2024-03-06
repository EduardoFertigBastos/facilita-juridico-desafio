import { Form } from "@unform/web";
import styled from "styled-components";

export const FormContainer = styled(Form)`
  width: 100%;
  padding: 6px 10px;
`;

export const ContainerButtonFilter = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  padding: 6px 0 12px 10px;
  border-bottom: 1px solid #e0e0e0;

  button {
    width: 200px;
  }
`;