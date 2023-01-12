import { FC, ReactNode } from "react";
import styled from "styled-components"
import Button from "./atom/Button";

const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
`;

const InnerWrapper = styled.div`
    font-size: 16px;
    font-family: 'Noto Sans KR',sans-serif;
    width: 30%;
    height: 30%;
    margin: 5px;
    padding: 5% 5% 5% 0%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #ffa3a3;
    border: 5px solid #ffa3a3;
    border-radius: 10px;
`

const ModalHeader = styled.div`
    width: 100%;
    padding: 10px 35px 10px 25px;
    margin: 5px 5px -20px 5px;
    display: flex;
    justify-content: end;
`;

const ModalContent = styled.div`
    width: 100%;
    padding: 25px 35px 25px 25px;
    margin: 5px;
    display: flex;
    justify-content: center;
    flex-direction: column;
`;


interface ModalProps {
    header?: ReactNode,
    content?: ReactNode,
    handleIsPop: (isPop: boolean) => void,
};
const Modal:FC<ModalProps> = ({header, content, handleIsPop}) => {

    return ( 
        <ModalWrapper>
            <InnerWrapper>
                <ModalHeader>
                    {header}
                    <Button text="X" onClick={() => handleIsPop(false)} width={''} backgroundColor={'#ffa3a3'} />
                </ModalHeader>
                <ModalContent>
                    {content}
                </ModalContent>
            </InnerWrapper>
        </ModalWrapper>
     );
}
 
export default Modal;