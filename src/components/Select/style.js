import styled from "styled-components";


export const  SelectContainer = styled.div`
background: var(--grey-2);
color: var(--grey-1);
height: 40px;
border-radius: 4px;
border: 1px solid var(--grey-2);
font-family: 'Inter', sans-serif;
font-size: 17px;
font-weight: 400;
line-height: 21px;
margin-top: 16px;
width: 90vv;
min-width: 70px;
margin-bottom: 5%;


:focus{
border: 1px solid var(--grey-0);
color: var(--grey-0);
}

select{
    background: transparent;
    border:none;
    width:100%;
}
`;

export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: start;
`;