import React, { Component } from 'react';
import {Link} from "react-router-dom";
import './App.css';
import {Container  } from 'semantic-ui-react'


export default class Menu extends Component{
    render(){
        return(
           <Container>
               <ul className="menu">
                   <li><Link to="/clientInfo">Client Info</Link></li>
                   <li><Link to="/requestQuote">Request Quote</Link></li>
                   <li><Link to="/quoteHistory">Quote History</Link></li>
               </ul>
           </Container>
        )
    }
}
