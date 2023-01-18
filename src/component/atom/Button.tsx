import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonAtomProps {
    width: string,
    height: string,
    color: string,
    borderColor: string,
    backgroundColor: string,
};

const ButtonAtom = styled.button<ButtonAtomProps>`
    cursor: ${props => props.disabled ? 'normal' : 'pointer'};
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: ${props => props.width};
    height: ${props => props.height};
    color: ${props => props.color};
    background-color: ${props => props.disabled ? 'rgba(239, 239, 239, 0.3)' : props.backgroundColor};
    border-color: ${props => props.borderColor};
    border-radius: 4px;
    border: 1px solid transparent;
    padding: 6px;
    margin-left: 5px;
    &:first-child { margin-left: 0px; }
`

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
    text: string,
    disabled?: boolean,
    width?: string,
    height?: string,
    color?: string,
    borderColor?: string,
    backgroundColor?: string,
};
const Button: FC<ButtonProps> = ({
    text,
    disabled = false,
    onClick,
    width = '70px',
    height = '40px',
    color = '#333',
    borderColor = '#ccc',
    backgroundColor = '',
}) => {
    return (
        <ButtonAtom
            disabled={disabled}
            onClick={onClick}
            width={width}
            height={height}
            color={color}
            borderColor={borderColor}
            backgroundColor={backgroundColor}
        >
            {text}
        </ButtonAtom>
    );
}

export default Button;