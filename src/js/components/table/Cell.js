import React from 'react';

/**
 * table cell component
 */
export
default class Cell extends React.Component {
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
    var coverClasses = [ 'Cell__cover' ];

    if ( this.props.cell.isOpened ) {
      coverClasses.push( 'Cell__cover--opened' );
    }

    return coverClasses.length > 0 ? coverClasses.join(' ') : '';
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
      open: 'Cell__number' + this.props.cell.count,
      bomb: 'Cell__bomb',
      flag: 'Cell__flag'
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
      <td className="Cell" onClick={ this.open.bind(this) } onContextMenu={ this.mark.bind(this) }>
        <div className={ this.getCoverClass() }>
          <span className={ this.getCellClass() }>{ this.getCellText() }</span>
        </div>
      </td>
    );
  }
}
