import React from 'react';
import Flag from './Flag';
import Face from './Face';
import Time from './Time';

/**
 * status bar component
 */
export default class StatusBar extends React.Component {
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
      <div className="status-bar">
        <Flag num={ this.props.flagNum }/>
        <Face reset={ this.props.reset }
              status={ this.props.status }
        />
        <Time time={ this.props.time } />
      </div>
    );
  }
}
