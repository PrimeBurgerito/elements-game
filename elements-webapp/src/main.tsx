import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './main.scss';

window.oncontextmenu = (e) => e.preventDefault();

console.log('App initiated!');

ReactDOM.render(<App />, document.getElementById('root'));
