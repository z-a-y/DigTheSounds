import React, { Component } from "react";
import ReactDOM from 'react-dom';
import {
  HashRouter, Route, Switch
} from 'react-router-dom';
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import {
  Button, Grid, withStyles,
  Paper,
} from '@material-ui/core';
import hash from "./hash";
import "./App.css";
import TrackCard from "./components/trackCard/TrackCard";
import TopBar from "./components/topBar/TopBar";

const useStyles = () => ({
  root: {
    float: 'none',
    maxWidth: '450px',
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  grid1: {
    marginTop: "8px"
  },

  loginButton: {
    marginTop: "40vh"
  }
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      no_data: false,
      term: "medium",
      user: {}
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }



  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
      this.getUser(_token);
    }

  }

  componentDidUpdate(prevState) {
    // Set token
    let _token = hash.access_token;

    if (prevState.term !== this.state.term) {
      this.getCurrentlyPlaying(_token);
    }
    
  }
  
  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/top/tracks?time_range=" +this.state.term+"_term&limit=12",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empty
        if(!data) {
          this.setState({
            no_data: true,
          });
          return;
        }
        
        this.setState({
          items: data.items,
          no_data: false /* We need to "reset" the boolean, in case the
                            user does not give F5 and has opened his Spotify. */
        });
      }
    });

    
  }

  getUser(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        // Checks if the data is not empt

        this.setState({
          user: data,
        });
        console.log(data);
      }
    });
  }

  handleChange(event) {
    this.setState({
      term: event.target.value,
    });

  };

  render() {
    let data = [];
    const { classes } = this.props;

    if (this.state.items) {
      data = this.state.items;
    }


    return (
        <div className="App">
          {!this.state.token && (
            <Button
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
              variant="contained"
              color="primary"
              size="large"
              disableElevation
              className={classes.loginButton}
            >
              Login to Spotify
            </Button>
          )}
          {this.state.token && !this.state.no_data && (
            <React.Fragment>
              <TopBar handleChange={this.handleChange}></TopBar>
              <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
                className={classes.grid1}
              >
                {data.map((item) => (
                  <TrackCard
                    key={item.name}
                    item={item}
                  />
                ))}
              </Grid>
            </React.Fragment>
          )}
        </div>
    );
  }
}

export default withStyles(useStyles) (App);