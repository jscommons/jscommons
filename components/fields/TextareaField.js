import { StyledInput, StyledLabel } from '@generates/swag'

export default function TextareaField (props) {
  return (
    <div>

      <StyledLabel htmlFor={props.id}>
        {props.label}
      </StyledLabel>

      <StyledInput
        {...props.register && props.register(props.id, props.required)}
        as="textarea"
        id={props.id}
        name={props.id}
        rows={props.rows || 4}
      />

    </div>
  )
}
