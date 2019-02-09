import React, { Component } from 'react'

export class Highlight extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      filteredSummary: ''
    }
  }

  getHighlightedText(text, searchFor) {
    // Split text on searchFor term, include term itself into parts, ignore case
    // var parts = text.split(new RegExp(`(${searchFor})`, 'gi'));
    if (searchFor) {
      // Split on searchFor term and include term into parts, ignore case
      const parts = text.split(' ');    // convert the string into an array
      return <span> { parts.map((part, i) => 
          <span key={i} style={part.toLowerCase() === searchFor.toLowerCase() ? { fontWeight: 'bold' } : { } }>
            { part + ' ' }
          </span>)
      } </span>;
    }
  }    
      


  render() {
    // console.log('highlight:js:5', this.props.highlightThis);
    return this.props.highlights.map((highlight) => (  
      <li key={highlight.id}>
        <a target='_blank' rel='noopener noreferrer' href={highlight.url}>{ this.getHighlightedText(highlight.summary, this.props.highlightThis.searchFor) }</a>
        <ul>
          { highlight.details && 
              highlight.details.map((detail, index) => (
                <li key={ index }>
                  <span dangerouslySetInnerHTML={{ __html: detail }} />
                </li>
              ))
          }
        </ul>
      </li>
    ));    
  }
}

export default Highlight
