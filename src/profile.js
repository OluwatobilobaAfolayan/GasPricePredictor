import React, {Component} from 'react';
import './App.css';
import {Link} from "react-router-dom";
import ProfileForm from './profileForm'

export default class Profile extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      clientInfo: null
    };
  }

  componentDidMount(){
    let clientInfo = this.props.location.state
    this.setState({clientInfo,loading:false})
  }

  render(){
    let {loading,clientInfo} = this.state;
    return(
      <div>
        {!loading &&  <ProfileForm userInfo = {clientInfo}/>}
      </div>

    )
  }
}
