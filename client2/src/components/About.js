import React from 'react'
import jaskirat from '../images/jaskirat.png'

const About = () => {
  return (
    <div>
      <div className='about-us-hero-section'>
        <h2 className='about-us-heading chomsky'>About</h2>
      </div>

      <div className='person-container'>
        <div className='person-image-container'>
          <img src={jaskirat}></img>
        </div>
        <p className='person-name'>Jaskirat Singh</p>
        <p className='person-role'>Full Stack Developer</p>
      </div>
    </div>
  )
}

export default About
