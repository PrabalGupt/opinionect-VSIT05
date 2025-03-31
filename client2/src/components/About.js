import React from 'react'
import prabal from '../images/prabal.png'

const About = () => {
  return (
    <div>
      <div className='about-us-hero-section'>
        <h2 className='about-us-heading chomsky'>About</h2>
      </div>

      <div className='person-container'>
        <div className='person-image-container'>
          <img src={prabal}></img>
        </div>
        <p className='person-name'>Prabal Gupta</p>
        <p className='person-role'>Full Stack Developer</p>
      </div>
    </div>
  )
}

export default About
