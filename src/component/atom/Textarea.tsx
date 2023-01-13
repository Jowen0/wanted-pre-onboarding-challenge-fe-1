import { ChangeEventHandler, FC } from "react";
import styled from "styled-components";

const TextareaAtom = styled.textarea`
    padding: 10px;
    color: gray;
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    line-height: 1.5;
    font-weight: 400;
    border-radius: 10px;
    width: 100%;
    min-height: 100px;
`;

interface TextareaProps {
    name: string,
    value: string,
    placeholder?: string,
    autoComplete?: string,
    disabled?: boolean,
    handleData: (key: string, value: string) => void
};
const Textarea: FC<TextareaProps> = ({
    name,
    value,
    placeholder = '',
    autoComplete = 'off',
    disabled = false,
    handleData,
}) => {

    // 데이터 입력
    const handleInput: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        handleData(key, value);
    };

    return (
        <TextareaAtom
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            onChange={handleInput}
        />
    );
}

export default Textarea;