import React, { Component } from 'react'

export class Highlight extends Component {

  constructor(props) {
    super(props)
    // this.getRandomColor = this.getRandomColor.bind(this);
    this.state = {
      searchFor: '',
      unFilteredHighlights: [],
      filteredHighlights: [],
    }
  }

  componentDidMount() {
    this.setState({
      unFilteredHighlights: this.props.highlights,
      filteredHighlights: this.props.highlights,
      experienceDetailLevel: this.props.experienceDetailLevel,
    })
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps.highlightThis) {
      let filteredHighlights = [];
      if (prevProps.highlightThis.length > 0) {
        let filteredHighlights = this.state.unFilteredHighlights.map((highlight, highlightIndex) => {
          let summary = this.getHighlightedText(highlight.summary, prevProps.highlightThis);
          let url = highlight.url;
          let details = highlight.details;
          let newDetails = [];
          if (details && details.length > 0) {
            let newDetails = highlight.details.map(detail => {
              console.log('Highlight.js:34', 'look for "' +  prevProps.highlightThis + '" in ' + detail);
              let newDetail = this.getHighlightedText(detail, prevProps.highlightThis);
              let newDetailAsString = newDetail.join('');
              if (newDetailAsString !== detail) {
                console.log('found "' + prevProps.highlightThis + '" in "' + detail + '"');
              }
              return newDetail;
            })
            // console.log('newDetails@42', newDetails);
            return { "summary": summary, "url": url, "details": newDetails };
            console.log('@43', summary, url, newDetails );
          }
          return { "summary": summary, "url": url, "details": newDetails };
        })

        this.setState({ 
          filteredHighlights: filteredHighlights, 
        });

        console.log('@46/filteredHighlights', filteredHighlights);

        // return newFilteredHighlights;
      } else {
        // there were no checked items, so let's reset it to the original / unfiltered values;
        this.setState({ filteredHighlights: this.state.unFilteredHighlights });  
      }
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('Highlight.js/componentDidUpdate', this.props, prevProps);
  }

  getHighlightedText(text, searchFor) {
    let newText = text;
    if (searchFor.length > 0 && newText && newText.length > 0) {
      console.log('text @ 72', newText);
      let searchForAsString = searchFor.join('|');
      const stringArray = newText.split(/([^A-Za-z0-9]|$)/g); // keep the delimiter; we don't want to remove non-alphanumeric characters from the display; just from the match
      let elements = stringArray.map((string, index) =>
        new RegExp("\\b" + searchForAsString + "\\b", 'gi').test(string) ? <b key={ index } className='highlightbg'>{ string }</b> : string
      )
      console.log('@75', elements);
      return elements;
    }
    console.log('@77', newText);
    return newText;
  }
   

  render() {
    console.log('highlight:js/render', this.props.highlightThis);
    // console.log('this.state.experienceDetailLevel', this.state.experienceDetailLevel);
    console.log('render/this.state.filteredHighlights', this.state.filteredHighlights);

    return this.state.filteredHighlights.map((highlight, highlightIndex) => (  
      <li key={highlightIndex}>
        <a target='_blank' rel='noopener noreferrer' 
          href={highlight.url}> { highlight.summary }
        </a>
        <ul className={'experienceDetails' + this.props.experienceDetailLevel}>

          { highlight.details && highlight.details.map((detail, detailIndex) => (
            <li key={ detailIndex }> { detail } </li>
            ))
          }
        </ul>
      </li>
    ));    
  }
}

export default Highlight
