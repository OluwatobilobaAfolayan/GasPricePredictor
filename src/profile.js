import React, {Component} from 'react';
import './App.css';
import {Button, Container,Dimmer, Loader, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      clientInfo: null
    };
  }

  componentDidMount(){
    const {profileName} = this.props.match.params;
    let clientInfo = this.props.location.state
    this.setState({clientInfo,loading:false})
  }

  render(){
    let {loading,clientInfo} = this.state;
    return(
      <div>
        {!loading && <div>PROFILE WORKS, {clientInfo.address}</div>}
        <Link to={{
          pathname:`/profileForm`,
          state:{
            ...clientInfo
          }
        }}>
          <Button content='Edit'/>
        </Link>
      </div>

    )
  }
}
