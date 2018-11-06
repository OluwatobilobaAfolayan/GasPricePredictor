import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './App.css';
import {Container  } from 'semantic-ui-react'

export default class Footer extends Component{
    render(){
        return(
            <footer className="footer">
                <Container>
                    <ul className="footer-content">
                        <li><Link to="/clientInfo">Client Info</Link></li>
                        <li><Link to="/requestQuote">Request Quote</Link></li>
                        <li><Link to="/quoteHistory">Quote History</Link></li>
                    </ul>
                </Container>
            </footer>

        )
    }
}
