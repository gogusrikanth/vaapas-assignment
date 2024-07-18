import {Component} from 'react'
import MovieCard from './MovieCard'

class MovieList extends Component {
  render() {
    const {movies} = this.props
    return (
      <div className="movie-list">
        {movies.map(movie => (
          <MovieCard key={movie.key} movie={movie} />
        ))}
      </div>
    )
  }
}

export default MovieList
