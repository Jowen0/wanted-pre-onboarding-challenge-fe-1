import { FC, ReactNode } from "react";
import styled from "styled-components";

interface divProps {
    width: string,
    minHeight: string,
    display: 'block' | 'flex',
    alignItems: 'normal' | 'center' | 'end',
    justifyContent: 'normal' | 'center' | 'end',
    padding: string,
    margin: string,
    borderRight: string,
};
const DivAtom = styled.div<divProps>`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: ${props => props.width};
    min-height: ${props => props.minHeight};
    display: ${props => props.display};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    border-right: ${props => props.borderRight};
`

interface DivProps {
    children: ReactNode,
    width?: string,
    minHeight?: string,
    display?: 'block' | 'flex',
    alignItems?: 'normal' | 'center' | 'end',
    justifyContent?: 'normal' | 'center' | 'end',
    padding?: string,
    margin?: string,
    borderRight?: string,
};
const Div: FC<DivProps> = ({
    children,
    width = '100%',
    minHeight = '',
    display = 'block',
    alignItems = 'center',
    justifyContent = 'normal',
    padding = '5px',
    margin = '5px',
    borderRight = '',
}) => {
    return (
        <DivAtom
            width={width}
            minHeight={minHeight}
            display={display}
            alignItems={alignItems}
            justifyContent={justifyContent}
            padding={padding}
            margin={margin}
            borderRight={borderRight}
        >
            {children}
        </DivAtom>
    );
}

export default Div;