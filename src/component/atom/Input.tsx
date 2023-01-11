import { ChangeEventHandler, FC } from "react";

interface InputProps {
    type?: string,
    name: string,
    value: string,
    placeholder?: string,
    autoComplete?: string,
    disable?: boolean,
    handleData: (key: string, value: string) => void
};
const Input: FC<InputProps> = ({
    type = 'text',
    name,
    value,
    placeholder = '',
    autoComplete = 'off',
    disable = false,
    handleData,
}) => {

    // 데이터 입력
    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        handleData(key, value);
    };

    return (
        <input
            type={type}
            name={name}
            value={value}
            placeholder={placeholder}
            autoComplete={autoComplete}
            disabled={disable}
            onChange={handleInput}
        />
    );
}

export default Input;