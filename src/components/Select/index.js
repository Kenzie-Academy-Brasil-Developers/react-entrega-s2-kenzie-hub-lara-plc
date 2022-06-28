import {SelectContainer, Container} from './style'

const Select = ({ label, register, name,values,  ...rest}) => {
return(
    <Container>

            <div>{label}</div>

            <SelectContainer>
                <select {...register(name)} {...rest} >
                   { values.map((value) =>  
                   <option value={value.name}>{value.text}</option>)}
                   </select>
            </SelectContainer>

    </Container>
)
}

export default Select;