'use strict';

import React, {
  Text,
  View
} from 'react-native';

var styles = React.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  }
});

class SimpleNative extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>This is a simple application.</Text>
      </View>
    )
  }
}

React.AppRegistry.registerComponent('SimpleNative', () => SimpleNative);