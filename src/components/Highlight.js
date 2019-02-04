import React, { Component } from 'react'

export class Highlight extends Component {
  render() {

    console.log(this.props.highlights);
    return this.props.highlights.map((highlight) => (
      <li key={highlight.id}>
        <a target='_blank' rel='noopener noreferrer' href={highlight.url}>{ highlight.summary }</a>
        <ul>
          { highlight.details && 
              highlight.details.map((detail, index) => (
                <li key={ index }>
                  { detail }
                </li>
              ))
          } 
        </ul>
      </li>
    ));    
  }
}

export default Highlight
