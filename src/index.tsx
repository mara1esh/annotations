import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import App from './App';
import '@styles/_main.scss';

const ENDPOINT_URL = 'http://localhost:3000/';

axios.defaults.baseURL = ENDPOINT_URL;

ReactDOM.render(<App />, document.getElementById('root'));
