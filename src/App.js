import React, { Component } from 'react';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import resumeData from './resume.json';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      searchFor: ''
    }
  }
 
  myCallback = (dataFromChild) => {
    // console.log('myCallback...', dataFromChild);
    this.setState({ searchFor: dataFromChild });
    this.setState((searchFor) => ({
      searchFor: searchFor
    }));
    // console.log('this.state.searchFor', this.state.searchFor);
  }

  render() {
    // console.log(resumeData);
    return (
      <div className="App">
        <div className="row">
          <div className="double-column">
            <h1 className="section">{ resumeData.name }</h1>
            <div>{ resumeData.overview }</div>
          </div>
        </div>
        <div className="row">
          <div className="double-column">
            <h2 className="section">Experience</h2>
            <Experience experience={ resumeData.experience } highlightThis={ this.state.searchFor } />
          </div>
          <div className="column">
            <h2 className="section">Skills</h2>
            <div className="card" id="skills">
              <div className="row gradient">
                <div className='column'> Skill</div>
                <div className='column'>Confidence</div>
                <div className='column'>Career Usage  </div>
              </div>
              <Skills skills={resumeData.skills} selectedTextFromComponent={this.myCallback} />            
            </div>
            <div className="">
              <h2 className="section">Education</h2>
              <Education education={resumeData.education} />
            </div>  
            <div className="">
              <h2 className="section">Contact</h2>
              <div className="card">
                <h3 className="title">David Bass</h3>
                <br></br>
                <br></br>
                <div>{ resumeData.email }</div>
                <div>{ resumeData.linkedIn }</div>
                <div>{ resumeData.website }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
