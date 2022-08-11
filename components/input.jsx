import React, { useEffect} from 'react'

const Input = ({setText, text, placeholder, validation, setValidation, error, setError, validForm, setValidForm}) => {

  useEffect(() => {
    if (error.email || error.name || error.todo) {
      setValidForm(false)
    } else {
      setValidForm(true)
    }
  }, [error.email, error.name, error.todo])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'name':
        setValidation({...validation, [placeholder]: true})
        break
      case 'email':
        setValidation({...validation, [placeholder]: true})
        break
      case 'todo':
        setValidation({...validation, [placeholder]: true})
        break
      default:
    }
  }

  const handler = (e) => {
    switch (e.target.name) {
      case 'name':
        setText({...text, [placeholder]: e.target.value})
        if (e.target.value.length < 3 || !e.target.value) {
          setError({...error, [placeholder]: 'Name must contain over 3 symbol'})
        } else {
          setError({...error, [placeholder]: ''})
        }
        break
      case 'email':
        setText({...text, [placeholder]: e.target.value})
        const mailValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if (!mailValidator.test(String(e.target.value).toLowerCase())) {
          setError({...error, [placeholder]: 'Incorrect email'})
        } else {
          setError({...error, [placeholder]: ''})
        }
        break
      case 'todo':
        setText({...text, [placeholder]: e.target.value})
        if (e.target.value.length < 3 || !e.target.value) {
          setError({...error, [placeholder]: 'Todo must contain over 3 symbol'})
        } else {
          setError({...error, [placeholder]: ''})
        }
         break
      default:
    }
  }

  return (
    <>
      <input
        type="text"
        name={placeholder}
        onChange={e => handler(e)}
        value={text[placeholder]}
        placeholder={placeholder}
        onBlur={e => blurHandler(e)}
      />
      {(validation[placeholder] && error[placeholder]) && <div className="errorAlert">{error[placeholder]}</div> }
    </>
  )
}

export default Input