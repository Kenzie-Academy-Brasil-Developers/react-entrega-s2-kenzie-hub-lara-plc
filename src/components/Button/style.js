import styled from "styled-components";


export const  Container = styled.button`
background: ${props => (props.schemaGrey? '#868E96' : '#FF577F')};
color: var(--grey-0);
height: 40px;
border-radius: 4px;
border: 0;
font-family: 'Inter', sans-serif;
font-size: 13px;
font-weight: 500;
line-height: 21px;
margin-top: 16px;
width: 90vv;
min-width: 70px;


:hover{
background: ${props => (props.schemaGrey? '#343B41' : '#FF427F')};
cursor: pointer;
}
`;