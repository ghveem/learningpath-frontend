import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions';

export function Welcome ({ authenticated, userName, dispatch }) {
  const loginOrOutLink = authenticated ?
    (<button onClick={() => dispatch(logout())}>Logg ut</button>) :
    (<Link to='/login'>Logg inn</Link>);
  const gotoMyPage = authenticated ? (<Link to='/minside'>Min side</Link>) : '';
  return (
    <div>
      <h2>Hei {userName}!</h2>
      <p>{loginOrOutLink}</p>
      <p>{gotoMyPage}</p>
    </div>
  );
}

Welcome.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
};

const userName = user => [user.first_name, user.middle_name, user.last_name].join(' ');
const selectUserName = state => state.authenticated ? userName(state.user) : 'Stranger';

const select = (state) => Object.assign({}, state, {
  userName: selectUserName(state)
});

export default connect(select)(Welcome);
