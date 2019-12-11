import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WebFont from 'webfontloader';
import './index.css';

WebFont.load({
  google: {
    families: ['Open Sans', 'sans-serif']
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
