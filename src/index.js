import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

class MyApp extends React.Component {
  state = {
    loading: true,
    error: null,
    data: {
      info: {},
      results: []
    },
    nextPage: 1
  };

  componentDidMount() {
    console.log("component did mount");
    this.fetchChar();
  }

  fetchChar = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/?page=${this.state.nextPage}`
      );
      const fetchedData = await response.json();
      console.log(this.state.nextPage);

      this.setState({
        loading: false,
        data: {
          info: fetchedData.info,
          results: [].concat(this.state.data.results, fetchedData.results)
        },
        nextPage: this.state.nextPage + 1
      });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.state.data.results.map(char => {
          return (
            <ul key={char.id}>
              <img src={char.image} alt="char" />
              <li>{char.name}</li>
            </ul>
          );
        })}
        {this.state.loading && console.log("loading...")}
        {!this.state.data.loading && this.state.data.info.next && (
          <button onClick={() => this.fetchChar()}>Load More</button>
        )}
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<MyApp />, rootElement);
