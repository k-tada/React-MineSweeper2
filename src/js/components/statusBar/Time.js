import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Time.css';

/**
 * status bar flag component
 */
class Time extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor( props ) {
    super( props );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    return (
      <span styleName="time">{ this.props.time }</span>
    );
  }
}

export default CSSModules( Time, style );

