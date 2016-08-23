import React, { PropTypes } from 'react';

class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render() {
    return (
      <main>
        {this.props.children}
      </main>
    );
  }
};

export default App;
