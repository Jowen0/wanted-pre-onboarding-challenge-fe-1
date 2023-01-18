import { ChangeEventHandler, FC, HTMLAttributes } from "react";
import styled from "styled-components";

const InputAtom = styled.input`
    padding: 10px;
    color: gray;
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    border-radius: 10px;
    border-width: thin;
    width: 100%;
`;

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    type?: string,
    name: string,
    value: string,
    placeholder?: string,
    autoComplete?: string,
    disabled?: boolean,
    handleData: (key: string, value: string) => void
};
const Input: FC<InputProps> = ({
    type = 'text',
    name,
    value,
    placeholder = '',
    autoComplete = 'off',
    disabled = false,
    handleData,
}) => {

    // 데이터 입력
    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        handleData(key, value);
    };

    return (
        <InputAtom
            type={type}
            name={name}
            value={value || ""}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            onChange={handleInput}
        />
    );
}

export default Input;