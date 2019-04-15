import axios from 'axios'
// import { Button } from 'antd'
import theme from '../styles/theme'

const UnicodeList = ({ unicodes, title = 'Unicode XTraVaGanZa' }) => {
   const convertUnicode = input => {
     return input.replace(/\\u(\w\w\w\w)/g, function(a, b) {
       const charCode = parseInt(b,16)
       return String.fromCharCode(charCode)
     }) 
   }
   console.log('<<<unicodes', convertUnicode('\u1084'))
  // "\u110A"
  // JSON.parse('"\u108E0"')
  const clickedButtoa = e => {
		console.log('<<clicked the fucking button')
  }
  const unicodeItems = () => {

    return unicodes.map((un, ind) => {
      let unicodeParsed = String.raw `${un.unicode}`
      let fuckingShit = String.raw `\${unicodeParsed}`
      let popo = '0x10845'//unicodes[0].unicode
      //      popo = JSON.stringify(popo)

      //      console.log('<<parsed', JSON.stringify(popo))
      return ( 
          <li key={ind}>
            <p>{un.type}</p>
            <p className="unicode">{String.fromCodePoint(un.unicode)}</p>
          </li>
      )
    })
  }

  let omd = `\u{108E0} \u{108F0} \u{1110A}`
  omd = JSON.stringify(omd)
  return (
    <div>
      <style jsx>
        {`
          .submit-button {
            background: ${theme.primary};
            border-radius: ${theme.borderRadius};
          }
          .unicode {
            font-size: 64px;
            margin: ${theme.spacing};
          }
          .list {
            list-style-type: none;
          }
        `}
      </style>
      <h1>{JSON.parse(omd)}</h1>
      <h2> :B ^^ Awesome Music With Animated Typography</h2>
      <h4> this server is running at :B ---> {process.env.API_URL}</h4>
      <input type="text" onChange={e => {console.log(e.target.value)}} />
      <button id="button" className="submit-button" onClick={clickedButtoa}>Form submitter</button>
      <ul className="list">
        {unicodeItems()}
      </ul>
    </div>
  )
}

UnicodeList.getInitialProps = async () => {
  const url = `${process.env.API_URL}:${process.env.PORT}/unicodes`
  const response = await axios.get(url)
  const data = await response.data
  // console.log('<<response', data)

  return { unicodes: data }
}
export default UnicodeList
