import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Level.css';

/**
 * status bar level component
 */
class Level extends React.Component {
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
    var levels = this.props.levels.map(( l, i ) => {
      return (
        <label key={ 'level' + i } styleName="label">
          <input type='radio'
                 name='level'
                 styleName="radio"
                 checked={ this.props.level == l }
                 onChange={ this.props.setLevel.bind(this, l) } />
          { l }
        </label>
      );
    });
    return (
      <div styleName="level">{ levels }</div>
    );
  }
}

export default CSSModules( Level, style );
