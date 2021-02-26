import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.scss';

window.oncontextmenu = (e) => e.preventDefault();

// tslint:disable-next-line:no-console
console.info('App initiated!');

ReactDOM.render(<App />, document.getElementById('root'));
