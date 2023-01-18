import { FC, HTMLAttributes, ReactNode, useEffect, useRef } from "react";

import styled from "styled-components";

interface FormAtomProps {
    width: string,
    minHeight: string,
    display: 'block' | 'flex',
    alignItems: 'normal' | 'center' | 'end',
    justifyContent: 'normal' | 'center' | 'end',
    flexDirection: 'row' | 'column',
    padding: string,
    margin: string,
};

const FormAtom = styled.form<FormAtomProps>`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: ${props => props.width};
    min-height: ${props => props.minHeight};
    display: ${props => props.display};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    flex-direction: ${props => props.flexDirection};
`;

interface FormProps extends HTMLAttributes<HTMLFormElement> {
    children: ReactNode,
    method?: 'get' | 'post',
    width?: string,
    minHeight?: string,
    display?: 'block' | 'flex',
    alignItems?: 'normal' | 'center' | 'end',
    justifyContent?: 'normal' | 'center' | 'end',
    flexDirection?: 'row' | 'column',
    padding?: string,
    margin?: string,
};
const Form: FC<FormProps> = ({
    children,
    onSubmit,
    method = 'get',
    width = '100%',
    minHeight = '',
    display = 'block',
    alignItems = 'normal',
    justifyContent = 'normal',
    flexDirection = 'row',
    padding = '5px',
    margin = '5px',
}) => {

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {

        const form = formRef.current;
        const preventEnter = (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                e.preventDefault();
            };
        };

        form?.addEventListener("keydown", preventEnter);

        return () => form?.removeEventListener("keydown", preventEnter);
    }, []);

    return (
        <FormAtom
            ref={formRef}
            width={width}
            minHeight={minHeight}
            display={display}
            alignItems={alignItems}
            justifyContent={justifyContent}
            flexDirection={flexDirection}
            padding={padding}
            margin={margin}
            method={method}
            onSubmit={onSubmit}
        >
            {children}
        </FormAtom>
    );
}

export default Form;