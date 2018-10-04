import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Consumer } from '../../Context';
import Axios from 'axios';

export default class Contact extends Component {
  state = {
    contactInfoIsShown: false
  };

  onShowClick = e => {
    this.setState({
      contactInfoIsShown: !this.state.contactInfoIsShown
    });
  };

  onDeleteClick = async (id, dispatch) => {
    try {
      await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'Delete_Contact', payload: id });
    } catch (error) {
      dispatch({ type: 'Delete_Contact', payload: id });
    }
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { contactInfoIsShown } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  className="fa fa-sort-down"
                  onClick={this.onShowClick}
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fa fa-times"
                  style={{ cursor: 'pointer', color: 'red', float: 'right' }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      color: 'black',
                      float: 'right',
                      marginRight: '1rem'
                    }}
                  />
                </Link>
              </h4>
              {contactInfoIsShown ? (
                <ul className="list-group">
                  <li className="list-gpoup-item">Email: {email}</li>
                  <li className="list-gpoup-item">Phone: {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};
