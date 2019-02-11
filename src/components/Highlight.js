import React, { Component } from 'react'

export class Highlight extends Component {

  constructor(props) {
    super(props)
    // this.getRandomColor = this.getRandomColor.bind(this);
    this.state = {
      searchFor: '',
      filteredSummaries: []
    }
  }

  componentDidMount() {
    // save all of the highlights to state
    // console.log('highligh - didMount');
    // let filteredSummaries = [...this.state.filteredSummaries];   //creating the copy
    // console.log('filteredSummaries1', filteredSummaries)
    // console.log('this.props.highlightThis', this.props.highlightThis);
    let filteredSummaries = this.props.highlights.map((highlight, highlightIndex) => {
      let newText = this.getHighlightedText(highlight.summary, this.props.highlightThis);
      // console.log(newText);      
      return newText;
    })

    this.setState({
      filteredSummaries: filteredSummaries
    })

    // console.log('filteredSummaries', filteredSummaries)
    // this.setState({filteredSummaries});

  }

  componentDidUpdate(prevProps) {
    console.log('highlight - didUpdate', this.props);
    // console.log(this.props.highlightThis, prevProps.highlightThis);
    // if (this.props.highlightThis !== prevProps.highlightThis) {
    // console.log('this.props.highlightThis.length', this.props.highlightThis.length);
    let filteredSummaries = [];
    let numUpdates = 0;
    if (this.props.highlightThis.length > 0) {
      let filteredSummaries = this.state.filteredSummaries.map((highlight, highlightIndex) => {
        let newText = this.getHighlightedText(highlight, this.props.highlightThis);
        if (newText != prevProps.highlights[highlightIndex].summary) {
          console.log('this.props', this.props, 'prevProps', prevProps);    
        }
        return newText;
      })
      console.log('filteredSummaries @ 50', filteredSummaries);
      // filteredSummaries: [ ...this.state.filteredSummaries, filteredSummaries ]

      // https://stackoverflow.com/questions/39941734/how-can-i-insert-into-array-with-setstate-react-js/39943308

      // return filteredSummaries;
    }


    // this.setState({ filteredSummaries });

  }

  getHighlightedText(text, searchFor) {

    /**
     * https://github.com/facebook/react/issues/3386#issuecomment-291152357
     * Find and highlight relevant keywords within a block of text
     * @param  {string} label - The text to parse
     * @param  {string} value - The search keyword to highlight
     * @return {object} A JSX object containing an array of alternating strings and JSX
     */
    // function formatLabel(label, value) {
    //   if (!value) {
    //     return label;
    //   }
    //   return (<span>
    //     { label.split(value).reduce((prev, current, i) => {
    //         if (!i) {
    //           return [current];
    //         }
    //         let newValue = prev + "<b key=" + value + i + ">" + value + "</b>";

    //         console.log('newValue', newValue);
    //         return newValue;
    //       }, [])
    //     }
    //   </span>);
    // };   

    let newText = text;
    // console.log('text = ', text);
    if (searchFor.length > 0) {
      let searchForAsString = searchFor.join('|');
      let newText = text.replace(new RegExp(searchForAsString, 'gi'), function (x, i) {
         return " JJJJJJJJ <span key=" + i + " style=\"background:'yellow', font-weight:'bold'\">" + x + "</span>"
        });
      return newText;

      // let newText = searchFor.map(searchForWord => {
      //   // console.log('getHighlightedText', searchForWord, text.substring(0,100));
      //   return this.formatLabel(text, searchForWord);
      // });
    }
    return newText;
  }

   

  render() {
    // console.log('highlight:js/render', this.props.highlightThis);
    return this.props.highlights.map((highlight, highlightIndex) => (  
      <li key={highlight.id}>
        <a target='_blank' rel='noopener noreferrer' 
          href={highlight.url} 
          dangerouslySetInnerHTML={{__html: this.state.filteredSummaries[highlightIndex]}}>  
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
