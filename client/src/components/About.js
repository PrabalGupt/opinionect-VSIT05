import React from 'react'
import jaskirat from '../images/jaskirat.png'
import prabal from '../images/prabal.png'
import pratham from '../images/pratham.png'
import prabhjot from '../images/prabhjot.png'

const About = () => {
  return (
    <div>
      <div className='about-us-hero-section'>
        <h2 className='about-us-heading'>About Us</h2>
      </div>

      <div className='persons-container'>
        <div className='person-container'>
          <div className='person-image-container'>
            <img src={jaskirat}></img>
          </div>
          <p className='person-name'>Jaskirat Singh</p>
          <p className='person-role'>Blockchain Developer</p>
        </div>

        <div className='person-container'>
          <div className='person-image-container'>
            <img src={prabal}></img>
          </div>
          <p className='person-name'>Prabal Gupta</p>
          <p className='person-role'>Backend Developer</p>
        </div>

        <div className='person-container'>
          <div className='person-image-container'>
            <img src={pratham}></img>
          </div>
          <p className='person-name'>Pratham Chudasama</p>
          <p className='person-role'>Frontend Developer</p>
        </div>

        <div className='person-container'>
          <div className='person-image-container'>
            <img src={prabhjot}></img>
          </div>
          <p className='person-name'>Prabhjot Singh</p>
          <p className='person-role'>UI/UX and Web Designer</p>
        </div>
      </div>
    </div>
  )
}

export default About
