import React, { Component } from 'react'

export class Education extends Component {
  render() {
    return this.props.education.map((institution, index) => (
      <div className="card" key={index}>
        <h3 className="title gradient"> 
          { institution.name }
          <span>{ institution.started } - { institution.finished }</span>
        </h3>
        <br></br>
        <br></br>
        <div>{ institution.degree }</div>
      </div>
    ));    
  }
}

export default Education;