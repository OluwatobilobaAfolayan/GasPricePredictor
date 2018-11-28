import React from 'react';
import {Link} from "react-router-dom";
import { Field, reduxForm } from 'redux-form'
import Date from './datepicker';
import FormErrors from './FormErrors'
import {Button, Form, Input,Label,Icon,Container} from 'semantic-ui-react'
import './App.css'

/*
  "fullName":"Dele Alli", <string valid
  "address":"123 Main Street",
  "city":"Austin", <string valid
  "state":"TX", <string valid
  "zipCode":78701, <number 5 digits valid
  "phone":2101234567, <number valid
  "email":"testemail@test.com" <email valid
*/

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
     readOnlyMode: false
   }

  handleChange = (e, { name, value }) =>{
    console.log(name);
     this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }
  
  switchToEdit = () => this.setState({readOnlyMode:false})

  componentDidMount(){
  
    let formState = this.props.userInfo? {
      ...this.props.userInfo,
      emailValid: true,
      stateValid:true,
      phoneValid: true,
      zipcodeValid: true,
      cityValid:true,
      fullNameValid: true,
      addressValid:true,
      formValid: true,
      readOnlyMode:true
    }: {}
    this.setState({
        ...formState,
    })
    
    
  }
  handleSubmit = ()=> {
    const {
      fullName,
      address,
      zipCode,
      city,
      state,
      phone,
      email,
      clientId,
      _id
    } = this.state;
    let payload = {clientId,fullName,address,zipCode,city,state,phone,email}
    console.log(_id,payload);
      fetch(`http://localhost:3000/clientsInfo/${_id}`,{
        method:'PUT',
        body:payload
    })
    .then(res => res.json())
    .then(data => console.log('Success:', data))
    .catch(error => console.error('Errorsss:', error));
    
  
  }

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
        addressValid = value.length > 0
        formErrors.address = addressValid? '': 'cannot be empty'
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
    fullName
  } = this.state;



    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Form className="profileFormContainer" onSubmit={this.handleSubmit} >
               <div className = "profileForm">
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
                 <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                   <label>State</label>
                   <Input disabled = {readOnlyMode} name='state'  value={state} onChange={this.handleChange} placeholder='Enter state'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                   <label>City</label>
                   <Input disabled = {readOnlyMode} name='city'  value={city} onChange={this.handleChange} placeholder='Enter city'>
                     <input />
                   </Input>
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
              {readOnlyMode && <Form.Button onClick ={this.switchToEdit} content='Edit'/>}
              {!readOnlyMode &&
                <Form.Group width = 'equal'>
                  <Form.Button content='Submit' disabled={!formValid} />
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
};

export default ProfileForm;
