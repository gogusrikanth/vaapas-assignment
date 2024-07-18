import {Component} from 'react'
import './App.css'
import MovieCard from './MovieCard'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      movies: [],
      loading: false,
      error: '',
    }
  }

  handleInputChange = e => {
    this.setState({query: e.target.value})
  }

  handleSearch = async e => {
    e.preventDefault()
    const {query} = this.state
    if (query.trim() === '') {
      this.setState({error: 'Please enter a movie name.'})
      return
    }
    this.setState({loading: true, error: ''})
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}`,
      )
      const data = await response.json()
      console.log(data) // Log the response
      this.setState({movies: data.docs, loading: false})
    } catch (err) {
      this.setState({
        error: 'Failed to fetch movies. Please try again later.',
        loading: false,
      })
    }
  }

  render() {
    const {query, movies, loading, error} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <h1>Movie Search</h1>
          <form onSubmit={this.handleSearch}>
            <input
              type="text"
              value={query}
              onChange={this.handleInputChange}
              placeholder="Enter movie name"
            />
            <button type="submit">Search</button>
          </form>
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="movie-list">
              {movies.map(movie => (
                <MovieCard key={movie.key} movie={movie} />
              ))}
            </div>
          )}
        </header>
      </div>
    )
  }
}

export default App
