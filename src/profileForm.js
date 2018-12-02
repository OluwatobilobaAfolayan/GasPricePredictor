import React from 'react';
import {Link,withRouter} from "react-router-dom";
import FormErrors from './FormErrors'
import {Button, Form, Input,Label,Icon,Container,Dropdown} from 'semantic-ui-react'
import './App.css'
import {stateOptions,cityOptions} from './states-cities';
class ProfileForm extends React.Component{
  
  
  state = {
     _id:'',
     clientId:1,
     fullName: '',
     address:'',
     zipCode: '',
     city:'',
     state:'',
     phone:'',
     email:'',
     formErrors: {email: '',phone:'',address:'',fullName:'',state:'',zipCode:'',city:''},
     emailValid: false,
     stateValid:false,
     phoneValid: false,
     zipcodeValid: false,
     cityValid:false,
     fullNameValid: false,
     addressValid:false,
     formValid: false,
     readOnlyMode: false,
     submitting: false,
     filteredCities:null
   };

  handleChange = (e, { name, value }) =>{
     this.setState({ [name]: value }, () => { this.validateField(name, value) })
     if (name === 'state'){
       let filteredCities = cityOptions(value);
        this.setState({filteredCities})
     }
     
    
  };
  


  componentDidMount(){
    let formState = this.props.userInfo? {
      ...this.props.userInfo,
      filteredCities: cityOptions(this.props.userInfo.state),
      emailValid: true,
      stateValid:true,
      phoneValid: true,
      zipcodeValid: true,
      cityValid:true,
      fullNameValid: true,
      addressValid:true,
      formValid: true,
      readOnlyMode:true
    }: {
      fullName: 'test',
      address:'test',
      zipCode: '11111',
      city:'test',
      state:'test',
      phone:'1111111111',
      email:'test@test.com',
      emailValid: true,
      stateValid:false,
      phoneValid: true,
      zipcodeValid: true,
      cityValid:false,
      fullNameValid: true,
      addressValid:true,
      formValid: false,
    };
    this.setState({...formState})
    
    
  }
  handleSubmit = ()=> {
    console.log(this.props);
    const {
      fullName,
      address,
      zipCode,
      city,
      state,
      phone,
      email,
      clientId,
      _id,
    } = this.state;
    this.setState({submitting:true});
    let payload = JSON.stringify({clientId,fullName,address,city,state,zipCode,phone,email})
    let param = (_id)?_id:"";
    let method = (_id)?"PUT":"POST";
    fetch(`http://localhost:3000/clientsInfo/${param}`,{
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:payload
    })
    .then(res => res.json())
    .then(data =>{
      this.props.history.push('/clientInfo');
      this.setState({submitting:false})
    })
    .catch(error => this.setState({submitting:false}));  
  };
  
  deleteClient = () => {
    this.setState({submitting:true});
    fetch(`http://localhost:3000/clientsInfo/${this.state._id}`,{
      method:"DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      this.props.history.push('/clientInfo');
      this.setState({submitting:false})
    })
    .catch(error => this.setState({submitting:false})); 
  };

  validateField(fieldName, value) {
    let {formErrors,emailValid,phoneValid,stateValid,zipcodeValid,cityValid,addressValid,fullNameValid} = this.state;
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i);
        formErrors.phone = phoneValid ? '' : ' is invalid';
        break;
      case 'state':
        stateValid = value.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) && value.length>0;
        formErrors.state = stateValid ? '' : ' not valid';
        break;
      case 'city':
        cityValid = value.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) && value.length>0;
        formErrors.city = cityValid ? '' : ' not valid';
        break;
      case 'zipCode':
        zipcodeValid = value.match(/^\d{5}$/);
        formErrors.zipCode = zipcodeValid?'':'not valid'
        break;
      case 'fullName':
        fullNameValid = value.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) && value.length>0;
        formErrors.fullName = fullNameValid ? '' : ' not valid';
        break;
      case 'address':
        addressValid = value.length > 0;
        formErrors.address = addressValid? '': 'cannot be empty';
        break;
      default:
        break;
    }
    this.setState({
                    formErrors,
                    emailValid,
                    phoneValid,
                    stateValid,
                    zipcodeValid,
                    cityValid,
                    addressValid,
                    fullNameValid
                  }, this.validateForm);
 }

validateForm(x) {
  let {emailValid,phoneValid,stateValid,zipcodeValid,cityValid,addressValid,fullNameValid} = this.state;
  this.setState({formValid: emailValid&&phoneValid&&stateValid&&zipcodeValid&&cityValid&&addressValid&&fullNameValid});
}

render(){
  const {
    formValid,
    readOnlyMode,
    email,
    phone,
    state,
    zipCode,
    city,
    address,
    fullName,
    submitting,
    filteredCities
  } = this.state;

    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Form className="FormContainer " onSubmit={this.handleSubmit} >
               <div className = "appform formCard">
                 <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                   <label>Name</label>
                   <Input disabled = {readOnlyMode} name='fullName'  value={fullName} onChange={this.handleChange} placeholder='Enter Name'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                   <label>Address</label>
                   <Input disabled = {readOnlyMode} name='address'  value={address} onChange={this.handleChange} placeholder='Enter address'>
                     <input />
                   </Input>
                 </Form.Field>
                 {/*
                   <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                     <label>State</label>
                     <Input disabled = {readOnlyMode} name='state'  value={state} onChange={this.handleChange} placeholder='Enter state'>
                       <input />
                     </Input>
                   </Form.Field>
                   */}
                 <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                   <label>State</label>
                    <Dropdown disabled = {readOnlyMode} name='state'  value={state} onChange={this.handleChange} placeholder='Enter state' search selection options={stateOptions} />
                 </Form.Field>
                 {/*
                   <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                     <label>City</label>
                     <Input disabled = {readOnlyMode} name='city'  value={city} onChange={this.handleChange} placeholder='Enter city'>
                       <input />
                     </Input>
                   </Form.Field>
                  */}
                 
                 <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                   <label>City</label>
                    <Dropdown disabled = {readOnlyMode} name='city'  value={city} onChange={this.handleChange} placeholder='Enter city' search selection options={filteredCities}/>
                 </Form.Field>
                 <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                   <label>Zipcode</label>
                   <Input disabled = {readOnlyMode} name='zipCode'  value={zipCode} onChange={this.handleChange} placeholder='Enter zip code'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                     <label>Phone Number</label>
                   <Input disabled = {readOnlyMode} name='phone'  value={phone} onChange={this.handleChange} iconPosition='left' placeholder="Enter Phone number" >
                         <Icon name='phone' />
                         <input />
                   </Input>
                 </Form.Field>
                 <Form.Field className="disabledProfileInput">
                     <label>Email</label>
                   <Input  disabled = {readOnlyMode} name='email'  value={email} onChange={this.handleChange} iconPosition='left' placeholder='Email'>
                         <Icon name='at' />
                         <input />
                     </Input>
                 </Form.Field>
               </div>
              <Form.Group width = 'equal'>
              {readOnlyMode && 
                <Form.Group width = 'equal'>
                    <Link to="/clientInfo">
                        <Form.Button content='Cancel'/>
                    </Link>
                  <Form.Button onClick ={() => this.setState({readOnlyMode:false})} content='Edit'/>
                  <Form.Button disabled={submitting} onClick ={this.deleteClient} color="red" content='Delete'/>
                </Form.Group>
              }
              {!readOnlyMode &&
                <Form.Group  disabled = {submitting} width = 'equal'>
                  <Form.Button content='Submit' color="green" disabled={!formValid} />
                  <Link to="/clientInfo">
                   <Button content='Cancel'/>
                  </Link>
                </Form.Group> 
              }


              </Form.Group>

          </Form>
       </Container>
    )
  }
}

export default withRouter(ProfileForm);
