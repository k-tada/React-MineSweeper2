import React from 'react';
import Row from './Row.js';
import update from 'react-addons-update';
import CSSModules from 'react-css-modules';
import style from './Table.css';

/**
 * table row component
 */

class Table extends React.Component {
  /**
   * constructor
   * @param {object} props
   */
  constructor( props ) {
    super( props );

    /**
     * @type {object}
     * @property {Array} rows
     */
    this.state = {
      rows: this.createTable( props )
    };
    this._state = {}
  }

  /**
   * componentWillReceiveProps
   * @param {props} nextProps
   */
  componentWillReceiveProps( nextProps ) {
    if ( this.props.openNum > nextProps.openNum || this.props.size[1] !== nextProps.size[1] ) {
      this.setState({
        rows: this.createTable( nextProps )
      });
    }
  }

  /**
   * create table
   * @param {props} props
   */
  createTable( props ) {
    var table = [];
    for ( var r = 0; r < props.size[0]; r++ ) {
      table.push([]);
      for ( var c = 0; c < props.size[1]; c++ ) {
        table[r].push({
          x: c, y: r,
          count: 0,
          isOpened: false,
          hasMine: false,
          hasFlag: false
        });
      }
    }

    for( var i = 0; i < props.mineNum; i++ ) {
      var cell = table[ this.rand( props.size[0] ) ][ this.rand( props.size[1] ) ];
      if ( cell.hasMine ) {
        i--;
      } else {
        cell.hasMine = true;
      }
    }
    return table;
  }

  /**
   * get random num
   * @param {int} max
   * @return {int} random num (0..max)
   */
  rand( max ) {
    return Math.floor( Math.random() * max );
  }

  /**
   * open cell
   * @param {object} cell
   */
  open( cell ) {
    this._state.rows = update(this.state.rows, {[cell.y]: {[cell.x]: {isOpened: {$set: false}}}});
    this._open( cell );
    this.setState({ rows: this._state.rows });
  }

  /**
   * open cell
   * @param {object} cell
   */
  _open( cell ) {
    var x = cell.x, y = cell.y;
    if ( this._state.rows[y][x].isOpened ) {
      return;
    }

    var num = this.countMines( cell );
    this.props.addOpenNum();
    this._state.rows[y][x].isOpened = true;
    this._state.rows[y][x].count    = num;
    this._state.rows[y][x].hasFlag  = false;

    if ( cell.hasMine ) {
      this._state.rows[y][x].count = 'b';
      this.props.gameOver();
    }

    if ( this._state.rows[y][x].hasFlag ) {
      this.props.checkFlagNum( -1 );
    }

    if ( ! cell.hasMine && num == 0 ) {
      this.openAround( cell );
    }

  }

  /**
   * count around mine num
   * @param {object} cell
   * @return {int} mine num
   */
  countMines( cell ) {
    var ret = 0;
    this.arround( cell, (r, c) => {
      this._state.rows[r][c].hasMine && ret++;
    });
    return ret;
  }

  /**
   * open arround cell (has no mines arround self)
   * @param {object} cell
   */
  openAround( cell ) {
    var _rows = this._state.rows;
    this.arround( cell, (r, c) => {
      if (
        ! this._state.rows[r][c].hasMine &&
        ! this._state.rows[r][c].isOpened
      ) {
        this._open( _rows[r][c] );
      }
    });
  }

  /**
   * do proc for arround cell
   * @param {object} cell
   * @param {function} proc
   */
  arround( cell, proc ) {
    for ( var r = -1; r <= 1; r++ ) {
      for ( var c = -1; c <= 1; c++ ) {
        var a = { row: cell.y + r, col: cell.x + c };
        if (
          ! ( r == 0 && c == 0 ) &&
          this.in(a.row, 0, this.props.size[0] - 1) &&
          this.in(a.col, 0, this.props.size[1] - 1)
        ) {
          proc( a.row, a.col );
        }
      }
    }
  }

  /**
   * check num is in range (min, max)
   * @param {int} num
   * @param {int} min
   * @param {int} max
   * @return {boolean} is in range
   */
  in( num, min, max ) {
    return min <= num && num <= max;
  }

  /**
   * mark cell
   * @param {object} cell
   */
  mark ( cell ) {
    var x = cell.x, y = cell.y;
    var marked = this.state.rows[ y ][ x ].hasFlag;

    this._state.rows = update( this.state.rows, {
      [ y ]: {
        [ x ]: {
          hasFlag: { $set: ! marked }
        }
      }
    });
    this.setState({ rows: this._state.rows });
    this.props.checkFlagNum( this._state.rows[ y ][ x ].hasFlag ? 1 : -1 );
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render() {
    var Rows = this.state.rows.map(( row, i ) => {
      return (
        <Row key={"row" + i}
           cells={ row }
            open={ this.open.bind(this) }
            mark={ this.mark.bind(this) }
        />
      );
    });

    return (
      <table styleName="table">
        <tbody>{ Rows }</tbody>
      </table>
    );
  }

}

export default CSSModules( Table, style );
