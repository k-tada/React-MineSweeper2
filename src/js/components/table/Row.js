import React from 'react';
import Cell from './Cell';

/**
 * table row component
 */
export
default class Row extends React.Component {
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
    var Cells = this.props.cells.map(( cell, i ) => {
      return (
        <Cell key={ "cell" + i }
             cell={ cell }
             open={ this.props.open }
             mark={ this.props.mark }
        />
      );
    });
    return (
      <tr>{Cells}</tr>
    );
  }
}
