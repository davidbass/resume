import React, { Component } from 'react'

export class Highlight extends Component {

  constructor(props) {
    super(props)
    // this.getRandomColor = this.getRandomColor.bind(this);
    this.state = {
      searchFor: '',
      unFilteredSummaries: [],
      filteredSummaries: []
    }
  }

  componentDidMount() {
    let filteredSummaries = this.props.highlights.map((highlight) => {
      let newText = highlight.summary;
      return newText;
    })

    this.setState({
      unFilteredSummaries: filteredSummaries,
      filteredSummaries: filteredSummaries
    })

  }

  componentWillReceiveProps(prevProps, nextProps) {
    // console.log('componentWillReceiveProps', 'this.props.highlightThis', this.props.highlightThis, 'prevProps.highlightThis', prevProps.highlightThis);
    if (prevProps.highlightThis) {
      // console.log('DIFF / this.props.highlightThis.length', this.props.highlightThis.length, 'prevProps.highlightThis.length', prevProps.highlightThis.length);
      let filteredSummaries = [];
      let numUpdates = 0;
      if (prevProps.highlightThis.length > 0) {
        let filteredSummaries = this.state.unFilteredSummaries.map((highlight, highlightIndex) => {
          // console.log('running getHighlightedText');
          let newText = this.getHighlightedText(highlight, prevProps.highlightThis);
          if (newText !== this.state.unFilteredSummaries[highlightIndex]) {
            // console.log('newText is new', 'this.props', this.props, 'prevProps', prevProps);    
          }
          // console.log('newText', newText);
          return newText;
        })

        this.setState({ filteredSummaries: filteredSummaries });
        return filteredSummaries;
      } else {
        // there were no checked items, so let's reset it to the original / unfiltered values;
        this.setState({ filteredSummaries: this.state.unFilteredSummaries });  
      }
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', this.props, prevProps);
  }

  getHighlightedText(text, searchFor) {
    let newText = text;
    if (searchFor.length > 0) {
      let searchForAsString = searchFor.join('|');
      const stringArray = newText.split(/([^A-Za-z]|$)/g); // keep the delimiter; we don't want to remove non-alphanumeric characters from the display; just from the match
      let elements = stringArray.map((string, index) =>
        new RegExp("\\b" + searchForAsString + "\\b", 'gi').test(string) ? <b key={ index } className='highlightbg'>{ string }</b> : string
      )
      return elements;
    }
    return newText;
  }
   

  render() {
    // console.log('highlight:js/render', this.props.highlightThis);
    // console.log('render/this.state.filteredSummaries', this.state.filteredSummaries);
    
    return this.props.highlights.map((highlight, highlightIndex) => (  
      <li key={highlight.id}>
        <a target='_blank' rel='noopener noreferrer' 
          href={highlight.url}> { this.state.filteredSummaries[highlightIndex] }
        </a>
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
