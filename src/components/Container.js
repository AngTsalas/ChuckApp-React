import React from "react";
import $ from "jquery";
import Result from "./Result";
import store from "../state/store";
import { getFromMemory, isInMemory } from "../utils/utils";
import { addQuery, removeQuery } from "../state/dispatchers";

//The root component that contains the searchbar and the results
class Container extends React.Component {
  state = { data: "", noResults: false };

  //Handles user input
  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  //Handles the form submit
  handleSubmit = event => {
    this.getResults();
    event.preventDefault();
  };

  //Gets results from memory or from the API if the query is not in memory, in which case the query and its results are added to memory
  getResults = () => {
    const query = this.state.value;
    if (query !== null && query.trim() !== "") {
      if (!isInMemory(store.getState(), query)) {
        $.getJSON(
          "https://api.chucknorris.io/jokes/search?query=" + query,
          function(data) {
            addQuery(query, data);
            this.setState({ data: data, value: query, noResults: false });
            if (data.total === 0) {
              this.setState({ noResults: true });
            }
          }.bind(this)
        );
      } else {
        const data = getFromMemory(store.getState(), query);
        this.setState({ data: data, value: query, noResults: false });
        if (data.total === 0) {
          this.setState({ noResults: true });
        }
      }
    }
  };

  //Handles clicking the Remove query button
  handleRemove() {
    const query = this.state.value;
    if (query !== null && query.trim() !== "") {
      if (isInMemory(store.getState(), query)) {
        removeQuery(query);
        alert("Query '" + query + "' was removed from memory.");
      } else {
        alert("Query '" + query + "' is not in memory.");
      }
    }
  }

  render() {
    const result = this.state.noResults ? (
      <h4>No results found.</h4>
    ) : (
      <Result results={this.state.data} />
    );
    return (
      <div>
        <form className="Searchbar" onSubmit={this.handleSubmit}>
          <label>Query:</label>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <input type="submit" id="search" value="Search" />
          <button type="button" id="remove" onClick={() => this.handleRemove()}>
            Remove query
          </button>
        </form>
        {result}
      </div>
    );
  }
}

export default Container;
