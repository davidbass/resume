import React, { Component } from 'react'
import numeratorImg from '../images/596979_gradient.gif';
import denominatorImg from '../images/596979_gradient_empty.gif';
import { Sparklines, SparklinesCurve } from 'react-sparklines';
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSquare } from '@fortawesome/free-solid-svg-icons'

// library.add(faSquare)

function getRemainder(numerator) {
  const denominator = (100 - numerator) / 2;
  return denominator;
}

export class Skills extends Component {  

  constructor(props) {
    super(props);
    this.toggleHighlight = this.toggleHighlight.bind(this);    
    // this.isChecked = React.createRef();
    this.state = {
      searchFor: []
    }
  }

  // TODO: assign a unique background color to each checked skill, and pass it to Experience.js for matches
    // function getRandomColor() {
    //   var letters = '3456789ABCDEF';
    //   var color = '#';
    //   for (var i = 0; i < 6; i++) {
    //     color += letters[Math.floor(Math.random() * 16)];
    //   }
    //   return color;
    // }
    // let bgColor = getRandomColor();


  toggleHighlight(event) {
    // console.log(event);
    const isChecked = event.target.checked;
    let searchFor = this.state.searchFor;

    if (isChecked) {
      // add it to the array
      searchFor.push(event.target.value);  // add the new value to the array
      this.setState({ searchFor: searchFor });
    } else {
      // remove it from the array if it exists
      searchFor = searchFor.filter(item => item !== event.target.value)      
      this.setState({ searchFor: searchFor });
    }

    // console.log('this.state.searchFor', this.state.searchFor);

    // console.log("toggleHighlight " + text);
    // this.setState({ searchFor: text });
    this.props.selectedTextFromComponent(searchFor);
  }

  render() {
    function showGraphOrText(skill) {
      let sum = skill.usage.reduce((acc, val) => {
        return acc + val;
      });
      // console.log('sum = ' + sum, skill);
      if (sum === 1 && skill.usage[skill.usage.length - 1] === 1) {
        return (
          <span className='tinyText'>Learning</span>
        )
      } else if (sum > 0) {
        return (
          <Sparklines data={skill.usage} svgHeight={15} svgWidth={100} margin={5}>
            <SparklinesCurve color="#596979" />
          </Sparklines>  
        )
      } else {
        return (
          <span className='tinyText'>Up Next</span>
        )
      }
    }

    return this.props.skills.map((skill, index) => (
      <div className='row title' key={ index }>
        <div className="column nowrap">
          <input type='checkbox' 
            value={ skill.name }
            onChange={this.toggleHighlight} 
            /> { skill.name }
        </div>
        <div className="column">
          <div className="nowrap"><img alt="numerator" border="1" src={ numeratorImg } width={ skill.confidence/2 } height="7" /><img alt="denominator" border="1" src={ denominatorImg } width={ getRemainder(skill.confidence) } height="7" /></div>
        </div>
        <div className="column center">
          { 
            showGraphOrText(skill) 
          }
       </div>
      </div>
    ));    

  }
}

export default Skills
