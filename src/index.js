import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-table/react-table.css";
import './Static/index.css'
import './Static/animate.css'
import './Static/event.css';
import './Static/stuff.css';
import "./Static/booking.css"
import './Static/reactDatePicker.css'
import "react-datepicker/dist/react-datepicker.css";
import "./Static/loader.css"
import "./Static/location.css"
import CSSPlugin from 'gsap/CSSPlugin';
// import "./Static/bootstrap3.css"
import {Provider} from "react-redux"
import store from "./store"

const C = CSSPlugin;

ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));

