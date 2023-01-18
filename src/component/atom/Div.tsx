import { FC, HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

interface DivAtomProps {
    width: string,
    minHeight: string,
    display: 'block' | 'flex',
    alignItems: 'normal' | 'center' | 'end',
    justifyContent: 'normal' | 'center' | 'end',
    flexDirection: 'row' | 'column',
    padding: string,
    margin: string,
    borderLeft: string,
    zIndex: string,
};
const DivAtom = styled.div<DivAtomProps>`
    font-size: 16px;
    font-family: 'Noto Sans KR', sans-serif;
    width: ${props => props.width};
    min-height: ${props => props.minHeight};
    display: ${props => props.display};
    align-items: ${props => props.alignItems};
    justify-content: ${props => props.justifyContent};
    flex-direction: ${props => props.flexDirection};
    padding: ${props => props.padding};
    margin: ${props => props.margin};
    border-left: ${props => props.borderLeft};
    z-index: ${props => props.zIndex};
`

interface DivProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    width?: string,
    minHeight?: string,
    display?: 'block' | 'flex',
    alignItems?: 'normal' | 'center' | 'end',
    justifyContent?: 'normal' | 'center' | 'end',
    flexDirection?: 'row' | 'column',
    padding?: string,
    margin?: string,
    borderLeft?: string,
    zIndex?: string,
};
const Div: FC<DivProps> = ({
    children,
    width = '100%',
    minHeight = '',
    display = 'block',
    alignItems = 'center',
    justifyContent = 'normal',
    flexDirection = 'row',
    padding = '5px',
    margin = '5px',
    borderLeft = '',
    zIndex = '0',
}) => {
    return (
        <DivAtom
            width={width}
            minHeight={minHeight}
            display={display}
            alignItems={alignItems}
            justifyContent={justifyContent}
            flexDirection={flexDirection}
            padding={padding}
            margin={margin}
            borderLeft={borderLeft}
            zIndex={zIndex}
        >
            {children}
        </DivAtom>
    );
}

export default Div;