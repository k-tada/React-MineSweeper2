import React from 'react';
import Table from './table/Table';
import CSSModules from 'react-css-modules';
import style from './GameBoard.css';

/**
 * table row component
 */
class GameBoard extends React.Component {
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
      level: 'easy',
      mineNum: 10,
      size: [9, 9],
      openNum: 0,
      flagNum: 0,
      time: 0,
      status: 'playing'
    };
  }

  gameOver() {
    this.setState({ status: 'gameover' });
  }

  addOpenNum() {
    this.setState({ openNum: ++this.state.openNum });
  }

  checkFlagNum(update) {
    this.setState({ flagNum: this.state.flagNum + update });
  }

  render() {
    // return (
    //   <Level levels={ this.levels }
    //          level={ this.state.level }
    //          setLevel={ this.setLevel.bind(this) }
    //   />
    //   <div className={ "MineSweeper " + this.state.level }>
    //     <StatusBar flagNum={ this.state.mineNum - this.state.flagNum }
    //                reset={ this.reset.bind(this) }
    //                status={ this.state.status }
    //                time={ this.state.time }
    //     />
    //     <Table openNum={ this.state.openNum }
    //            mineNum={ this.state.mineNum }
    //            size={ this.state.size }
    //            gameOver={ this.gameOver.bind(this) }
    //            addOpenNum={ this.addOpenNum.bind(this) }
    //            checkFlagNum={ this.checkFlagNum.bind(this) }
    //     />
    //   </div>
    // );
    return (
      <div className={ "MineSweeper " + this.state.level }>
        <Table openNum={ this.state.openNum }
               mineNum={ this.state.mineNum }
               size={ this.state.size }
               gameOver={ this.gameOver.bind(this) }
               addOpenNum={ this.addOpenNum.bind(this) }
               checkFlagNum={ this.checkFlagNum.bind(this) }
        />
      </div>
    );
  }
}

export default CSSModules( GameBoard, style );
