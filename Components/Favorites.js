import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import FilmList from './FilmList';
import {connect} from 'react-redux';
import Avatar from './Avatar';

class Favorites extends Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.avatar_container}>
          <Avatar />
        </View>
        <FilmList
          movies={this.props.favoritesFilm}
          navigation={this.props.navigation}
          favoriteList={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  avatar_container: {
    alignItems: 'center',
  },
});

const mapStateToProps = state => {
  return {favoritesFilm: state.toggleFavorite.favoritesFilm};
};
export default connect(mapStateToProps)(Favorites);
