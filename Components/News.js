import React, {Component} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import FilmList from './FilmList';
import {getLatestMoviesFromApi} from '../API/TMDBApi';

class News extends Component {
  constructor(props) {
    super(props);
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      movies: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    if (this.state.movies.length === 0) {
      this._get_movies();
    }
  }

  //arrow fx for binding
  _get_movies = () => {
    this.setState({isLoading: true});
    getLatestMoviesFromApi(this.page + 1).then(data => {
      this.page = data.page;
      this.totalPages = data.total_pages;
      this.setState({
        isLoading: false,
        movies: [...this.state.movies, ...data.results],
      });
    });
  };

  _display_loading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

  _display_movies() {
    return (
      <FilmList
        movies={this.state.movies}
        loadFilms={this._get_movies}
        navigation={this.props.navigation}
        page={this.page}
        totalPages={this.totalPages}
        favoriteList={false}
      />
    );
  }

  render() {
    return (
      <View style={styles.main_container}>
        {this._display_loading()}
        {this._display_movies()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
  },
  loading_container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default News;
