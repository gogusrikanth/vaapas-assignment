import {Component} from 'react'

class MovieCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dogImage: '',
    }
  }

  componentDidMount() {
    this.fetchDogImage()
  }

  async fetchDogImage() {
    const response = await fetch('https://dog.ceo/api/breeds/image/random')
    const data = await response.json()
    this.setState({dogImage: data.message})
  }

  render() {
    const {movie} = this.props
    const {dogImage} = this.state

    return (
      <div className="movie-card">
        <h2>{movie.title}</h2>
        {dogImage && <img src={dogImage} alt="Random dog" />}
        <p>
          {movie.author_name ? movie.author_name.join(', ') : 'Unknown Author'}
        </p>
        <p>{movie.first_publish_year}</p>
      </div>
    )
  }
}

export default MovieCard
