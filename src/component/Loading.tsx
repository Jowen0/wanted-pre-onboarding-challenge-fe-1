import { FC } from "react";
import styled, { keyframes } from "styled-components";
import Div from "./atom/Div";

const rotation = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }

`;

interface SpinnerProps {
    width:number, 
    height:number,
    marginTop: string,
};
const Spinner = styled.div<SpinnerProps>`
	height: ${({width}) => width}px;
	width: ${({height}) => height}px;
	border: 3px solid #66c2ff;
	border-radius: 50%;
	border-top: none;
	border-right: none;
	margin: 16px auto;
	animation: ${rotation} 2s linear infinite;
    margin-top: ${({marginTop}) => marginTop};
`;

interface LoadingProps {
    width?: number, 
    height?: number,
    marginTop?: string,
    isTable?: boolean,
};
const Loading: FC<LoadingProps> = ({ width = 150, height = 150, marginTop = '' }) => {

    return (
        <Div minHeight="100%" display="flex">
            <Spinner width={width} height={height} marginTop={marginTop} />
        </Div>
    );
}

export default Loading;