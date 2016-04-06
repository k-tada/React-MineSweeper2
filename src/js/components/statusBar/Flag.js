import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Flag.css';

/**
 * status bar flag component
 */
class Flag extends React.Component {
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
      <span styleName="flag">{ this.props.num }</span>
    );
  }
}

export default CSSModules( Flag, style );

