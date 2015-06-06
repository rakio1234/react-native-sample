/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  NavigatorIOS,
  TouchableWithoutFeedback,
  WebView
} = React;

var APIURL = "http://www.hokkaidolikers.com/api/v1/articles";

var AwesomeProject = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.navigator}
        barTintColor='#03ABAD'
        initialRoute={{
          component: LikersArticleList,
          title: '北海道Likers',
      }}/>
    );
  }
})

// 記事一覧リスト
var LikersArticleList = React.createClass({
  getInitialState: function() {
    return {
      articles: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentDidMount: function() {
    this.fetchData();
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.articles}
        renderRow={this.renderItem}
        style={styles.listView}/>
    );
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Loading ・・・
        </Text>
      </View>
    );
  },

  renderItem: function(item, sectionID, rowID) {
    return (
      <TouchableWithoutFeedback  onPress={() => this.onPressed(item)}>
      <View style={styles.container}>
        <Image
          source={{uri: "http:" + item.image}}
          style={styles.thumbnail}/>
        <View style={styles.rightContainer}>
        <Text style={styles.namara}>{item.namara}なまらいいね！</Text>
        <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  },

  fetchData: function() {
    fetch(APIURL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          articles: this.state.articles.cloneWithRows(responseData.articles),
          loaded: true,
        });
      })
      .done();
  },

  onPressed: function(item) {
    this.props.navigator.push({
      title: item.title,
      component: LikersItemView,
      passProps: { url: item.url }
    })
  },
});

var LikersItemView = React.createClass({
  render: function() {
    return (
      <WebView
        url={"http://www.hokkaidolikers.com/api/v1" + this.props.url + ".html"}/>
    )
  }
});

var styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  rightContainer: {
    flex: 1,
  },
  namara: {
    fontSize: 11,
    marginLeft: 8,
    textAlign: 'left',
  },
  title: {
    fontSize: 15,
    margin: 8,
    textAlign: 'left',
  },
  name: {
    fontSize: 12,
    margin: 8,
    textAlign: 'left',
  },
  thumbnail: {
    width: 80,
    height: 80,
    margin: 2,
  },
  listView: {
    backgroundColor: '#FFFFFF',
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject)
