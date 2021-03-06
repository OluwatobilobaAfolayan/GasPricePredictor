import React, {Component} from 'react';
import './App.css';
import { Container,Dimmer, Loader, Icon} from 'semantic-ui-react'
import {Link} from "react-router-dom";

export default class ClientInfo extends Component{

  constructor(props) {
    super(props);
    this.state = {
      timePased: false,
      loading: true,
      ClientInfo: null
    };
  }

    componentDidMount(){
      setTimeout(
       function() {
         this.setState({timePased:true})
       }
       .bind(this),
       3000
      );
      fetch("http://localhost:3000/clientsInfo/")
      .then(res => {
        console.log(res);
        return res.json();
      })
      .then(data => {
        console.log(data);
        let ClientInfo = data.map((user,index)=>{
          return(
            <Link to={{
              pathname:`/profile/${user.fullName}`,
              state:{
                ...user
              }
            }} className = "card" key={user._id} >
               <div className = "cardInfo">
                  <div className = "cardHeader">
                    <div className = "cardProfile">
                      <img src = "http://profilepicturesdp.com/wp-content/uploads/2018/07/place-holder-for-profile-picture-1.jpg"/>
                    </div>
                    <span className = "cardName">
                      {user.fullName}
                    </span>
                  </div>
                  <ul className='cardMeta'>
                      <li>
                        <span className='cardMeta-title'>Address:</span>
                        <span className ="cardMeta-text">{user.address}</span>
                      </li>
                      <li>
                        <span className='cardMeta-title'>Phone:</span>
                        <span className ="cardMeta-text">{user.phone}</span>
                      </li>
                      <li>
                        <span className='cardMeta-title'>Email:</span>
                        <span className ="cardMeta-text">{user.email}</span>
                      </li>
                 </ul>
              </div>
           </Link>
          )
        });
        this.setState({ClientInfo,loading:false})
      }).catch(err=> {
        this.setState({loading:false})
    });
    }
    
    componentWillUnmount(){
      /*Clear timeout logic setfor loader in componentDidMount if we exit page within 3 secs*/
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
    render(){
      let {loading,timePased} = this.state;
        return(
            <Container className = "fillScreen">
                <div className="info-wrapper">

                     {!loading&&this.state.ClientInfo}
                     {!loading&&
                       <Link to="/profileForm" className = "card cardAdd">
                          <Icon name="add user" size="huge" className="iconColor"/>
                       </Link>
                     }
                     {loading && timePased &&   
                       <Dimmer active>
                         <Loader>Loading</Loader>
                       </Dimmer>
                     }
                </div>
            </Container>
        )
    }
}
