import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Face.css';

/**
 * status bar flag component
 */
class Face extends React.Component {
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
      <span styleName="face" onClick={ this.props.reset.bind(this) }>
        <span styleName={ "button " + this.props.status }></span>
      </span>
    );
  }
}

export default CSSModules( Face, style, { allowMultiple: true } );

