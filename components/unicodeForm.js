import React, { useState } from 'react'
import axios from 'axios'

import theme from '../styles/theme'

const UnicodeForm = ({inputLabel = 'submit a 5 letter unicode char', unicodeTypes}) => {
  const [inputValue, setInputValue] = useState("")
  const [inputTypeValue, setInputTypeValue] = useState("")
  const [selectedValue, setSelectedValue] = useState("")
  //  console.log('<<have these types', unicodeTypes)

  // handlers
  const clickedButton = e => {
    e.preventDefault()
    // very lame way of validating a unicode
    // it does have 5 chars in the string though
    if(inputValue.length === 5) {
      console.log('<<please just do it', inputValue, `${process.env.API_URL}:${process.env.PORT}/add_unicode`)
      const url = `${process.env.API_URL}:3000/add_unicode`
      const unicodeToSend = `0x${inputValue}`
      const data = { unicode: unicodeToSend }

      axios.post('/add_unicode', data)
        .then(res => console.log(res))
        .catch(e => console.log(e))
    }
    // axios.post
  }

  const onSelectChange = e => {
    e.preventDefault()
    setSelectedValue(e.target.value)
    //    console.log('<<selected value', e.target.value)
  }

  const onFormSubmit = e => {
    e.preventDefault()
    console.log('<<submitedForm', inputValue, inputTypeValue, selectedValue)
  }

  // render helpers
  const selectOptions = () => (
    unicodeTypes.map((type, index) => <option key={type} value={type}>{type}</option>)
  )

  /*
        <div className="select-type">
          <select value="popo" onChange={onSelectChange}>
            <option value="none">None</option>
            {selectOptions()}
          </select>
          <p>Select or give a new type:</p>
          <input type="text" /><br />
        </div>
        <input value={inputValue} placeholder="write an unicode string like 109A1" type="text" onChange={e => setInputValue(e.target.value)} />
        <button type="submit" id="button" className="submit-button">Unicode Submitter</button>
        */
  return (
    <div className="form">
      <p>{inputLabel}</p><br />
      <form onSubmit={onFormSubmit}>
        <div className="select-type">
          <select value={selectedValue} onChange={onSelectChange}>
            <option value="none">None</option>
            {selectOptions()}
          </select>
          <p>Select or give a new type:</p>
          <input value={inputTypeValue} type="text" onChange={e => setInputTypeValue(e.target.value)}/><br />
        </div>
        <input value={inputValue} placeholder="write an unicode string like 109A1" type="text" onChange={e => setInputValue(e.target.value)} />
        <button type="submit" id="button" className="submit-button">Unicode Submitter</button>
      </form>
      <style jsx>{`
        .submit-button {
        background: ${theme.primary};
        border-radius: ${theme.borderRadius};
        margin-left: ${theme.spacing};
        }
        .form {
        margin-left: ${theme.spacing};
        padding: ${theme.spacing};
        display: block;
        }
        .select-type {
        margin-left: ${theme.spacing};
        display: flex;
        max-height: 64px;
        }
        input {
        margin: ${theme.spacing};

        }
        p {
        margin: ${theme.spacing};
        }

        `}</style>
    </div>
  )
}

export default UnicodeForm
