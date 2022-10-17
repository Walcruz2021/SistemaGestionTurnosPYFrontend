import React from 'react'
import { Link } from 'react-router-dom'
// import "../css/LandingPage.css"
export default function LandingPage () {
  return (
    <>
      <div className='centradoHyV'>
        <h1>Peluqueria Canina</h1>
        {console.log('dsfsd')}
      </div>
      <div className='centradoHyV'>
        <Link to='/home'>
          <button className='button button1'>Ingresar</button>
        </Link>
      </div>
    </>
  )
}
