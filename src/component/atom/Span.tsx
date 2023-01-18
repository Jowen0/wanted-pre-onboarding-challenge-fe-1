import { FC, HTMLAttributes } from "react";
import styled from "styled-components";

interface SpanAtomProps {
    fontSize: string,
    fontWeight: 'normal' | 'bold',
    width: string,
    color: string,
    textAlign: 'left' | 'center' | 'right',
    padding: string,
    margin: string,
};
const SpanAtom = styled.span<SpanAtomProps>`
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: ${props => props.fontWeight};
    font-size: ${props => props.fontSize};
    color: ${props => props.color};
    text-align: ${props => props.textAlign};
    width: ${props => props.width};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
`

interface SpanProps extends HTMLAttributes<HTMLSpanElement> {
    text: string,
    fontSize?: string,
    fontWeight?: 'normal' | 'bold',
    width?: string,
    color?: string,
    textAlign?: 'left' | 'center' | 'right',
    padding?: string,
    margin?: string,
};
const Span: FC<SpanProps> = ({
    text,
    fontSize = '16px',
    fontWeight = 'normal',
    width = '100%',
    color = '',
    textAlign = 'left',
    padding = '',
    margin = '',
}) => {

    return ( 
        <SpanAtom
            fontSize={fontSize}
            fontWeight={fontWeight}
            width={width}
            color={color}
            textAlign={textAlign}
            padding={padding}
            margin={margin}
        >
            {text}
        </SpanAtom>
    );
}
 
export default Span;