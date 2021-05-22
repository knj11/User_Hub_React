// src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Header,
  UserPosts
} from './components';

import {
  getUsers,
  getPostsByUser
} from './api';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    getUsers()
      .then(users => {
        setUserList(users)
      })
      .catch(error => {
        // something something errors
      });
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setUserPosts([]);
      return;
    }

    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        // something something errors
      });
  }, [currentUser]);

  return (
    <div id="App">
      <Header
        userList={ userList }
        currentUser={ currentUser }
        setCurrentUser={ setCurrentUser } />
      {
        currentUser
        ? <UserPosts
            userPosts={ userPosts }
            currentUser={ currentUser } />
        : null
      }

    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);