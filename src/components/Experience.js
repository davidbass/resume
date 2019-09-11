import React, { Component } from 'react'
import Highlight from './Highlight';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMapMarkerAlt)

export class Experience extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFor: []
    }
  }

  componentDidUpdate() {
    console.log('experience - did update', this.props);
    if (this.props.experienceDetailLevel === 0) {

    }
    // this.setState({
    //   searchFor: this.props.highlightThis
    // });

    // let filteredSummary = this.props.highlights.reduce((highlight) => (
    //   let searchFor = this.state.searchFor;
    //   let searchIn = highlight.summary;
    //   let filteredSummary = (searchFor, searchIn) => searchIn.replace(new RegExp(searchFor, 'gi'), str => `<strong>${str}</strong>`);
    //   vm.setState({
    //     filteredSummary: filteredSummary
    //   });  
    // ))

  }

  render() {
    console.log('Experience / this.props.highlightThis', this.props.highlightThis);
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
          <Highlight highlights={ job.highlights } highlightThis={ this.props.highlightThis } experienceDetailLevel={this.props.experienceDetailLevel} />
        </ul>
      </div>
    ));    
  }
}

export default Experience
