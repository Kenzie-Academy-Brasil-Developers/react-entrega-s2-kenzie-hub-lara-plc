import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
text-align: center;
height:62vh;
width: 95vv;
background: var(--grey-3);

h1{
margin-bottom: 10%;
font-size: 14px;
font-weight:700;
font-family: 'Inter', sans-serif;
}

h4{
    font-size: 10px;
    font-weight:400;
    font-family: 'Inter', sans-serif;
}

form{
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content: center;
    text-align: center;
}


label{
    align-self: start;
    font-size: 10px;
    font-weight:400;
    font-family: 'Inter', sans-serif;
    margin-bottom: 1%
}


button{
    width:90%;
    margin-bottom: 5%;
}

button+ h4{
    margin-bottom: 7%;
}

`;


export const Page = styled.div`
display: flex;
flex-direction: column;
align-items:center;
justify-content: center;
text-align: center;
height:100vh;
width: 100vv;
background: var(--grey-4);

img{
    margin-bottom:10%;
}
`;