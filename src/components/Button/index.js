import {Container} from './style'

const Button = ({children, schemaGrey = false, ...rest}) => {
return(
    <Container schemaGrey ={schemaGrey} type='submit' {...rest}>
        {children}
    </Container>
)
}

export default Button;