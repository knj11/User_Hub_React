// src/index.js

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import {
  Header,
  UserPosts,
  UserTodos
} from './components';

import {
  getUsers,
  getPostsByUser,
  getTodosByUser // NEW
} from './api';

const App = () => {
  const [userList, setUserList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userTodos, setUserTodos] = useState([]); // NEW

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
      setUserTodos([]); // NEW
      return;
    }

    getPostsByUser(currentUser.id)
      .then(posts => {
        setUserPosts(posts);
      })
      .catch(error => {
        // something something errors
      });

    // NEW
    getTodosByUser(currentUser.id)
      .then(todos => {
        setUserTodos(todos);
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
        currentUser // MODIFIED
        ? <>
            <UserPosts
              userPosts={ userPosts }
              currentUser={ currentUser } />
            <UserTodos
              userTodos={ userTodos }
              currentUser={ currentUser } />
          </>
        : null
      }

    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);