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
    // let filteredHighlights = this.props.highlights.map((highlight) => {
    //   let summary = highlight.summary;
    //   let url = highlight.url;
    //   let details = highlight.details;
    //   return { "summary": summary, "url": url, "details" : details };
    // })

    // console.log('didMount/filteredHighlights', filteredHighlights);

    this.setState({
      unFilteredHighlights: this.props.highlights,
      filteredHighlights: this.props.highlights
    })
  }

  componentWillReceiveProps(prevProps, nextProps) {
    if (prevProps.highlightThis) {
      let filteredHighlights = [];
      if (prevProps.highlightThis.length > 0) {
        let filteredHighlights = this.state.unFilteredHighlights.map((highlight, highlightIndex) => {
          let summary = this.getHighlightedText(highlight.summary, prevProps.highlightThis);
          let url = highlight.url;
          let filteredDetails = highlight.details;
          if (highlight.details && highlight.details.length > 0) {
            let filteredDetails = highlight.details.map((detail, detailIndex) => {
              // console.log('@55', detailIndex, detail);
              if (detail && typeof detail !== "undefined" && detail.length > 0) {
                let newDetail = this.getHighlightedText(detail, prevProps.highlightThis);
                console.log('@44-newDetail', newDetail);
                return newDetail;
              }
            })
          }
          console.log('@49-filteredDetails', filteredDetails);
          return { "summary": summary, "url": url, "details": filteredDetails };
        })
        console.log('@53', filteredHighlights);

        this.setState({ 
          filteredHighlights: filteredHighlights, 
        });
        return filteredHighlights;
      } else {
        // there were no checked items, so let's reset it to the original / unfiltered values;
        this.setState({ filteredHighlights: this.state.unFilteredHighlights });  
      }
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('componentDidUpdate', this.props, prevProps);
  }

  getHighlightedText(text, searchFor) {
    let newText = text;
    if (searchFor.length > 0 && newText && newText.length > 0) {
      // console.log('newText', newText);
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
    console.log('render/this.state.filteredHighlights', this.state.filteredHighlights);

    return this.state.filteredHighlights.map((highlight, highlightIndex) => (  
      <li key={highlightIndex}>
        <a target='_blank' rel='noopener noreferrer' 
          href={highlight.url}> { highlight.summary }
        </a>
        <ul>
          { highlight.details && highlight.details.map((detail, detailIndex) => (
            <li key={ detailIndex }>
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
