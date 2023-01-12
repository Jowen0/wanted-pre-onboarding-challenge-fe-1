import { FC } from "react";
import styled from "styled-components";

const LabalAtom = styled.label`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: 10%;
    margin: 5px;
`

interface LableProps {
    text: string,
};
const Labal: FC<LableProps> = ({ text }) => {
    return (
        <LabalAtom>
            {text}
        </LabalAtom>
    );
}

export default Labal;