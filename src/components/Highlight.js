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
      unFilteredSummaries: filteredSummaries,
      filteredSummaries: filteredSummaries
    })

    // console.log('filteredSummaries', filteredSummaries)
    // this.setState({filteredSummaries});

  }

  componentWillReceiveProps(prevProps, nextProps) {
    // console.log('componentWillReceiveProps', 'this.props.highlightThis', this.props.highlightThis, 'prevProps.highlightThis', prevProps.highlightThis);
    if (this.props.highlightThis !== prevProps.highlightThis) {
      // console.log('this.props.highlightThis.length', this.props.highlightThis.length, 'prevProps.highlightThis.length', prevProps.highlightThis.length);
      let filteredSummaries = [];
      let numUpdates = 0;
      if (prevProps.highlightThis.length > 0) {
        let filteredSummaries = this.state.unFilteredSummaries.map((highlight, highlightIndex) => {
          // console.log('running getHighlightedText');
          let newText = this.getHighlightedText(highlight, prevProps.highlightThis);
          if (newText !== this.state.unFilteredSummaries[highlightIndex]) {
            console.log('newText is new', 'this.props', this.props, 'prevProps', prevProps);    
          }
          console.log('newText', newText);
          return newText;
        })
        console.log('filteredSummaries @ 51', filteredSummaries);

        // https://stackoverflow.com/questions/39941734/how-can-i-insert-into-array-with-setstate-react-js/39943308

        this.setState({ filteredSummaries });
        return filteredSummaries;
      } else {
        // there were no checked items, so let's reset it to the original / unfiltered values;
        this.setState({ filteredSummaries: this.state.unFilteredSummaries });  
      }
    }
  }

  componentDidUpdate(prevProps) {
    console.log('highlight - didUpdate', this.props, prevProps);
    // let currentText = this.state.filteredSummaries;
    // console.log('currentText @ 70', currentText);
    // let newText = currentText.map(string => {
    //   return string.replace(/(<([^>]+)>)/ig,"")
    // });
    // this.setState({ filteredSummaries: newText });

  }

  getHighlightedText(text, searchFor) {

    let newText = text;
    if (searchFor.length > 0) {
      // console.log('text = ', text);

      let searchForAsString = searchFor.join('|');
      const stringArray = newText.split(/([^A-Za-z]|$)/g); // keep the delimiter; we don't want to remove non-alphanumeric characters from the display; just from the match
      let elements = stringArray.map((string, index) =>
        new RegExp(searchForAsString, 'gi').test(string) ? <b key={ index } className='highlightbg'>{ string }</b> : string
      )
      return elements;
      // let newText = text.replace(new RegExp(searchForAsString, 'gi'), function (x, i) {
      //    return ( <div><span key=" + i + " style="background:'yellow', font-weight:'bold'" dangerouslySetInnerHTML={{__html: x }}></span></div> )
      //   });
      // return newText;
      
      /*
      let newText = searchFor.map(searchForWord => {
        console.log('getHighlightedText', searchForWord, text.substring(0,100));
        return formatLabel(text, searchForWord);
      });
      */

    }
    return newText;
  }

   

  render() {
    // console.log('highlight:js/render', this.props.highlightThis);
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
