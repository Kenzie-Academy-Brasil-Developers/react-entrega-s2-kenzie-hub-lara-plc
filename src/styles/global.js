import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
* {
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline: 0;
}

:root {
    --primary: #FF577F;
    --primary-focus:#FF427F;
    --primary-negative:#59323F;
    --grey-4:#121214;
    --grey-3:#212529;
    --grey-2:#343B41;
    --grey-1:#868E96;
    --grey-0:#F8F9FA;
    --sucess:#3FE864;
    --error:#E83F5B;
}

body{
    background: var(--grey-4);
    color: var(--grey-0);
}

body, input, button {
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
}

h1,h2,h3,h4,h5,h6{
    font-family: 'Inter', sans-serif;
    font-weight: 700;
}

button{
    cursor: poiter;
}

a{
    text-decoration: none;
}

` ;