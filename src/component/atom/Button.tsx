import { FC } from "react";
import styled from "styled-components";

interface ButtonAtomProps {
    color: string,
    backgroundColor: string,
};
const ButtonAtom = styled.button<ButtonAtomProps>`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    border-radius: 4px;
    border: 1px solid transparent;
    border-color: #ccc;
    padding: 6px;
    margin-left: 5px;
    &:first-child { margin-left: 0px; }
`

interface ButtonProps {
    text: string,
    disalbed?: boolean,
    onClick: () => void,
    color?: string,
    backgroundColor?: string,
};
const Button: FC<ButtonProps> = ({
    text,
    disalbed = false,
    onClick,
    color = '#333',
    backgroundColor = '#fff',
}) => {
    return (
        <ButtonAtom
            disabled={disalbed}
            onClick={onClick}
            color={color}
            backgroundColor={backgroundColor}
        >
            {text}
        </ButtonAtom>
    );
}

export default Button;