import React, {Component} from 'react';
import './App.css';
import {Container ,Card} from 'semantic-ui-react'
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
export default class ClientInfo extends Component{

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      ClientInfo: null
    };
    // 
    // fetch("http://localhost:3000/clientsInfo/")
    // .then(res => {
    //   console.log(res);
    //   return res.json();
    // })
    // .then(data => {
    //   let ClientInfo = data.map((user,index)=>{
    //     return(
    //       <Card style={{'width':'504px'}}>
    //          <Card.Content>
    //              <Card.Header content={user.name} />
    //             <Card.Meta content='Info' />
    //              <Card.Description content={
    //                 <ul className='info'>
    //                     <li><span className='ui header'>Address:</span>{user.address}</li>
    //                   <li><span className='ui header'>Phone:</span>{user.phone}</li>
    //                 <li><span className='ui header'>Email:</span>{user.email}</li>
    //                 </ul>
    //             } />
    //         </Card.Content>
    //      </Card>
    //     )
    //   })
    //   this.setState({ClientInfo,loading:false})
    // })
  }

    componentDidMount(){
        let fakeJson =
        [
          {
            "_id":"5bb7eee76332e970342228c7",
            "clientId":1,
            "name":"Emmanuel Afolayan",
            "address":"1810, Aquarena Springs Drive, San Marcos, Texas",
            "phone":"2344328973",
            "email":"xyz@yahoo.com",
            "__v":0
          }
        ];

        let ClientInfo = fakeJson.map((user,index)=>{
          return(
            <Card style={{'width':'504px'}}>
               <Card.Content>
                   <Card.Header content={user.name} />
                  <Card.Meta content='Info' />
                   <Card.Description content={
                      <ul className='info'>
                          <li><span className='ui header'>Address:</span>{user.address}</li>
                        <li><span className='ui header'>Phone:</span>{user.phone}</li>
                      <li><span className='ui header'>Email:</span>{user.email}</li>
                      </ul>
                  } />
              </Card.Content>
           </Card>
          )
        })
        this.setState({ClientInfo,loading:false})
    }
    render(){
      let {loading} = this.state;
        return(
            <Container className = "fillScreen">
                <div className="info-wrapper">

                     {!loading&&this.state.ClientInfo}
                     {loading &&
                       <Dimmer active>
                         <Loader>Loading</Loader>
                       </Dimmer>
                     }
                </div>
            </Container>
        )
    }
}
