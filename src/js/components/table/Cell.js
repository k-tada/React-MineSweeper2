import React from 'react';
import CSSModules from 'react-css-modules';
import style from './Cell.css';

/**
 * table cell component
 */
class Cell extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor( props ) {
    super( props );
  }

  /**
   * open this cell
   */
  open() {
    this.props.open( this.props.cell );
  }

  /**
   * mark this cell
   * @param {SytheticEvent} e
   */
  mark( e ) {
    e.preventDefault();
    if ( ! this.props.cell.isOpened ) {
      this.props.mark( this.props.cell );
    }
  }

  /**
   * get cell cover class
   * @return {string} coverClass
   */
  getCoverClass() {
    return ( this.props.cell.isOpened ) ? 'opened' : 'cover';
  }

  /**
   * get cell status
   * @return {string} cellStatus
   */
  getCellStatus() {
    if ( this.props.cell.isOpened ) {
      return this.props.cell.hasMine ? 'bomb' : 'open';
    } else if ( this.props.cell.hasFlag ) {
      return 'flag';
    }
    return '';
  }

  /**
   * get cell class
   * @return {string} cellClass
   */
  getCellClass() {
    return !!this.getCellStatus() ? {
      open: 'number' + this.props.cell.count,
      bomb: 'bomb',
      flag: 'flag'
    }[ this.getCellStatus() ] : '';
  }

  /**
   * get cell text
   * @return {string} cellText
   */
  getCellText() {
    return !!this.getCellStatus() ? {
      open: this.props.cell.count,
      bomb: 'b',
      flag: 'f'
    }[ this.getCellStatus() ] : '';
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render(){
    return (
      <td styleName="cell" onClick={ this.open.bind(this) } onContextMenu={ this.mark.bind(this) }>
        <div styleName={ this.getCoverClass() }>
          <span styleName={ this.getCellClass() }>{ this.getCellText() }</span>
        </div>
      </td>
    );
  }
}

export default CSSModules( Cell, style );
