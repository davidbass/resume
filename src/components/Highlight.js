import React, { Component } from 'react'

export class Highlight extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchFor: '',
      filteredSummary: ''
    }
  }

  componentDidUpdate() {
    // console.log('highlight - did update', this.props.highlightThis);
  }

  getHighlightedText(text, searchFor) {
    // thanks to https://stackoverflow.com/a/43235785 
    // var parts = text.split(new RegExp(`(${searchFor})`, 'gi'));
    let thisClassName = '';
    let newText = text;
    if (searchFor.length > 0) {
      // console.log('getmatches', searchFor, text.substring(0,30));
      // TODO: if a skill is checked, make #skills fixed, so it is always visible as the user scrolls up and down;

      searchFor.forEach(function(element) {
        const parts = text.split(/[^A-Za-z]/);    // convert the string into an array - thanks https://stackoverflow.com/a/9842524

        if (text.includes(element)) {
          thisClassName = 'highlightbg';
          console.log('found "' + element + '" in "' + text.substring(0,30) + '..."');
          // Split on searchFor term and include term into parts, ignore case
          console.log('parts', parts);
          newText = <span> { parts.map((part, i) => 
            <span key={i} className={ thisClassName } style={part.toLowerCase() === element.toLowerCase() ? { fontWeight: 'bold' } : { } }>
              { part + ' ' }
            </span>)
          } </span>;
        } else {
          // console.log('did NOT find "' + element + '" in "' + text.substring(0,30) + '..."');
        }
      });
    }
    return newText;
  }

  render() {
    // console.log('highlight:js:5', this.props.highlightThis);
    return this.props.highlights.map((highlight) => (  
      <li key={highlight.id}>
        <a target='_blank' rel='noopener noreferrer' href={highlight.url}>{ this.getHighlightedText(highlight.summary, this.props.highlightThis) }</a>
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
