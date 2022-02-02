import styled from "styled-components";
import IFlexWrapper from "../../interfaces/IFlexWrapper";



export const FlexWrapper = styled.div<IFlexWrapper>`
    display:flex;
    justify-content:flex-start;
    align-items-center;
    width:100%;
    gap:20px;
    flex-direction:${(props) => (props.direction)}
    `;
