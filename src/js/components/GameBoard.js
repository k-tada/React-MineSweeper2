import React from 'react';
import Table from './table/Table';
import StatusBar from './statusBar/StatusBar';
import Level from './statusBar/Level';
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

    this.level_default = "easy";
    this.levels = {
      easy   : {level : "easy",   mineNum : 10,  size : [9 , 9]},
      normal : {level : "normal", mineNum : 40,  size : [16, 16]},
      hard   : {level : "hard",   mineNum : 100, size : [16, 30]}
    };

    this.opts = {
      initial: {
        openNum: 0,
        flagNum: 0,
        time: 0,
        status: 'playing'
      }
    };

    /**
     * @type {object}
     * @property {Array} rows
     */
    this.state = Object.assign( this.levels[ this.level_default ], this.opts.initial );
  }

  componentWillMount() {
    this.interval = null;
  }

  setLevel( level ) {
    clearInterval( this.interval );
    this.setState( Object.assign( this.levels[ level ], this.opts.initial ) );
  }

  reset() {
    clearInterval( this.interval );
    this.setState( this.opts.initial );
  }

  gameOver() {
    this.setState({ status: 'gameover' });
  }

  addOpenNum() {
    if ( this.state.openNum == 0 ) {
      this.interval = setInterval( () => {
        if ( this.state.openNum > 0 && this.state.status == 'playing' ) {
          this.setState({ time: this.state.time + 1 });
        }
      }, 1000 );
    }
    this.setState({ openNum: ++this.state.openNum });
  }

  checkFlagNum(update) {
    this.setState({ flagNum: this.state.flagNum + update });
  }

  render() {
    return (
      <div>
        <Level levels={ Object.keys( this.levels ) }
               level={ this.state.level }
               setLevel={ this.setLevel.bind(this) }
        />
        <div styleName={ "board " + this.state.level }>
          <StatusBar flagNum={ this.state.mineNum - this.state.flagNum }
                     reset={ this.reset.bind(this) }
                     status={ this.state.status }
                     time={ this.state.time }
          />
          <Table openNum={ this.state.openNum }
                 mineNum={ this.state.mineNum }
                 size={ this.state.size }
                 gameOver={ this.gameOver.bind(this) }
                 addOpenNum={ this.addOpenNum.bind(this) }
                 checkFlagNum={ this.checkFlagNum.bind(this) }
          />
        </div>
      </div>
    );
  }
}

export default CSSModules( GameBoard, style, { allowMultiple: true } );
