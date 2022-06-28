import {InputContainer, Container} from './style'

const Input = ({ label, register, name, error,  ...rest}) => {
return(
    <Container>

            <div>{label}      {!!error  && <span>{error}</span>}</div>

            <InputContainer>
                <input {...register(name)} {...rest} />
            </InputContainer>


    </Container>
)
}

export default Input;