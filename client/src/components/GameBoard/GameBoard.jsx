import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Hand from './Hand';
import { Query } from "react-apollo";
import gql from "graphql-tag";

class GameBoard extends PureComponent {
  render() {
    return (
      <div className="game-board">
        Game Board
        <Hand />
        <Query
          query={gql`
            {
              hello
            }
          `}
        >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;
      return (
        <div key={data.hello}>
          {data.hello}
        </div>
      );
    }}
  </Query>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameBoard);
