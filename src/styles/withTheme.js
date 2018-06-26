import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from './themeContext';

// This function takes a component...
const withTheme = WrappedComponent => {
  // ...and returns another component...
  class ThemedComponent extends React.PureComponent {
    render() {
      return (
        <ThemeContext.Consumer>
          {theme => <WrappedComponent {...this.props} theme={theme} />}
        </ThemeContext.Consumer>
      );
    }
  }

  hoistNonReactStatics(ThemedComponent, WrappedComponent);

  return ThemedComponent;
};

export default withTheme;
