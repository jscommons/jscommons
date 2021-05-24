import { Field } from 'formik'
import clsx from 'clsx'
import textField from '../../styles/textField.js'

export default function TextareaControl (props) {
  return (
    <div>

      <label htmlFor={props.id} className="font-meidum">
        {props.label}
      </label>

      <Field
        as="textarea"
        id={props.id}
        name={props.id}
        className={clsx(textField, 'mt-2')}
        rows={props.rows || 4}
      />

    </div>
  )
}
