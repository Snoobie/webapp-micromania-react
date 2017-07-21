import React, {PropTypes, Component} from 'react';

import {hintStyle, hintStyleHover, markerStyle, markerStyleHover} from '../../common/shops/markerStyle.js';

class Marker extends Component {
  static propTypes = {
    $hover: PropTypes.bool,
    text: PropTypes.number,
    title: PropTypes.string,
    address: PropTypes.string
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
  }

  render() {
    const styleMarker = this.props.$hover ? markerStyleHover : markerStyle;
    const styleHint = this.props.$hover ? hintStyleHover : hintStyle;

    return (
      <div style={styleMarker}>
         <div>{this.props.text}</div>
         <div style={styleHint} >
          <span>{this.props.text + ". Micromania " + this.props.title}</span><br/>
          <span style={{fontWeight: 100}} >{this.props.address}</span>
         </div>
      </div>
    );
  }
}

export default Marker;
