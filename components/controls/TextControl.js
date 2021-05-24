import { Field } from 'formik'
import clsx from 'clsx'
import textField from '../../styles/textField.js'

export default function TextControl (props) {
  return (
    <div>

      <label htmlFor={props.id} className="font-meidum">
        {props.label}
      </label>

      <Field
        name={props.id}
        className={clsx(textField, 'mt-2')}
        {...props}
      />

    </div>
  )
}
