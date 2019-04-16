import React, { useState } from 'react'
import axios from 'axios'
// import { Button } from 'antd'
import UnicodeForm from '../components/unicodeForm'
import theme from '../styles/theme'

const UnicodeList = ({ unicodes, unicodeTypes, title = 'Unicode XTraVaGanZa' }) => {
  //  console.log('<<list has unicodes and types', unicodes, unicodeTypes)
  const unicodeItems = () => {

    return unicodes.map((un, ind) => {
      //      console.log('<<parsed', JSON.stringify(popo))
      return ( 
              <div key={ind} className="row">
                <p style={{letterSpacing: 3}}> Im a type: &#9; <b>{un.type}</b></p>
                <p className="unicode">{String.fromCodePoint(un.unicode)}</p>
                <style jsx>{`
                  .unicode {
                  font-size: 64px;
                  margin: ${theme.spacing};
                  }
                  .row {
                  max-width: 880px;
                  margin: 80px auto 40px;
                  display: flex;
                  flex-direction: row;
                  justify-content: space-around;
                  }
                  `}</style>
              </div>
      )
    })
  }

  let welcomeTitle = `\u{108E0} \u{108F0} \u{1110A}`
  welcomeTitle = JSON.stringify(welcomeTitle)
  return (
    <div style={{padding: 8}}>
      <style jsx>
        {`
          .list {
            list-style-type: none;
          }
          .header {
            margin-left: ${theme.spacing};
          }
        `}
      </style>
      <div className="header">
        <h1>{JSON.parse(welcomeTitle)}</h1>
        <h2> :B ^^ Awesome Music With Animated Typography</h2>
        <h4> 
          The whole idea works around the forms a character may have<br />
          trees, animals, clouds. A lot of languages are unicoded so<br />
          this project takes its material from this huge dictionary <br />
          -----> I could be an animal&#9;{'\u{109DD}'}
        </h4>
      </div>
      <UnicodeForm unicodeTypes={unicodeTypes} />
      <div>
        {unicodeItems()}
      </div>
    </div>
  )
}

UnicodeList.getInitialProps = async () => {
  const unicodeUrl = `${process.env.API_URL}:${process.env.PORT}/unicodes`
  const unicodeTypesUrl = `${process.env.API_URL}:${process.env.PORT}/types`

  const unicodeResponse = await axios.get(unicodeUrl)
  const unicodeData = await unicodeResponse.data

  const typesResponse = await axios.get(unicodeTypesUrl)
  const typesData = await typesResponse.data
  // console.log('<<response', data)

  return { unicodes: unicodeData, unicodeTypes: typesData }
}
export default UnicodeList
