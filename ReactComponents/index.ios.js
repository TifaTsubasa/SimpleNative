'use strict';

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  ListView,
  Image,
} from 'react-native'

var BASE_URL = 'https://api.github.com/search/repositories?q='

export default class SimpleNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          placeholder='Search for a projext...'
          style={styles.searchBarInput}
          onEndEditing={e=>this.handleSearchChange(e)}>
        </TextInput>
        {this.renderListView()}
      </View>
    );
  }

  renderListView() {
    var content
    if (this.state.dataSource.getRowCount() === 0) {
      content = (
        <Text style={styles.blankText}>Please enter a search term to see results.</Text>
      )
    } else {
      content = (
        <ListView
          style={styles.listView}
          ref='listView'
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}></ListView>
      )
    }
    return content
  }
  renderRow(repo) {
    return (
      <View>
        <View style={styles.row}>
          <Image
            source={{uri: repo.owner.avatar_url}}
            style={styles.profpic}></Image>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{repo.name}</Text>
            <Text style={styles.subTile}>{repo.owner.login}</Text>
          </View>
        </View>
        <View style={styles.cellBorder} />
      </View>
    )
  }

  // action
  handleSearchChange(e) {
    var searchTerm = e.nativeEvent.text.toLowerCase()
    var queryURL = BASE_URL + encodeURIComponent(searchTerm)
    fetch(queryURL)
      .then((response) => response.json())
      .then((responseData) => {
        if (responseData.items) {
          console.log(responseData)
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(responseData.items),
          })
        }
    })
    .done()
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listView: {
    // flex: 1,
  },
  searchBarInput: {
    marginTop: 30,
    padding: 10,
    fontSize: 12,
    height: 30,
    backgroundColor: '#EAEAEA',
  },
  row: {
    width: 200,
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 5,
  },
  // cell
  profpic: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subTile: {
    fontSize: 16,
    marginBottom: 8,
  },
  textContainer: {
    paddingLeft: 10,
  },
  cellBorder: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 4,
  },
  blankText: {
    padding: 10,
    fontSize: 20,
  },
})

React.AppRegistry.registerComponent('SimpleNative', () => SimpleNative);