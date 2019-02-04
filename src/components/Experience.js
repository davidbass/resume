import React, { Component } from 'react'
import Highlight from './Highlight';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt)

export class Experience extends Component {
  render() {
    return this.props.experience.map((job, index) => (
      <div className="card" key={job.id}>
        <h3 className="title"> 
          { job.title } @ <a target='_blank' rel='noopener noreferrer' href={job.url}>{ job.organization }</a>
          <span>{ job.startDate } - { job.endDate }</span>
        </h3>
        <div className="location">
          <FontAwesomeIcon icon="map-marker-alt" color="#aaa" title="map icon" /> &nbsp;{ job.location }
        </div>
        <ul>
          <Highlight highlights ={ job.highlights } />
        </ul>
      </div>
    ));    
  }
}

export default Experience
