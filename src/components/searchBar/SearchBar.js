import React, { Component } from "react";
import Detail from "./../detail/Detail";
import { Route } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import Search from "@material-ui/icons/Search";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      showFilters: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({ searchQuery: inputValue });

    if (!inputValue) return "";
  };
  handleSubmit = event => {
    const { searchQuery } = this.state;
    event.preventDefault();
    const value = this.state.searchQuery;
    this.setState({ searchQuery: "" });
    if (value) {
      return this.props.history.push(`/detail/${searchQuery}`);
    }
  };
  handleFilter = () => {
    this.setState({ showFilters: false });
  };

  render() {
    const { searchQuery, showFilters } = this.state;
    return (
      <div className="input-group mb-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Pokemon"
              value={searchQuery}
              onChange={this.handleChange}
              aria-label="Search Pokemon"
              aria-describedby="basic-addon2"
            />
            <button className="submitButton btn btn-outline-success my-2 my-sm-0">
              <Search style={{ fontSize: 13 }} />
            </button>
          </div>
        </form>

        {this.props.location.pathname === "/" && (
          <button
            className="filterButton btn btn-outline-secondary"
            onClick={() => {
              this.setState({ showFilters: !showFilters });
            }}
          >
            Filter
          </button>
        )}
        {showFilters && (
          <Filter showFilter={this.handleFilter} filter={this.props.filter} />
        )}
        <Route exact path="detail/:name" component={Detail} />
      </div>
    );
  }
}
export default withRouter(SearchBar);
