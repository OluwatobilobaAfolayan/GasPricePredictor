import React from 'react'
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
     formValid: false
   }

  handleChange = (e, { name, value }) =>{
    console.log(name);
     this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }

  componentDidMount(){
    /*
      address: "611 San Marcos Drive"
      city: "San Marcos"
      clientId: 1
      email: "xyz@test.com"
      fullName: "Raj Singh"
      phone: 674938888
      state: "TX"
      zipCode: 78666
    */
    this.setState({
        ...this.props.location.state
    })
    console.log('from profileForm',this.props.location.state);
  }
  handleSubmit = ()=> {
    // const {
    //   date,
    //   suggestedPrice,
    //   totalAmountDue,
    //   phone,
    //   email,
    //   name,
    // } = this.state;
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
        stateValid = value.match(/^[a-zA-Z]+$/);
        formErrors.state = stateValid ? '' : ' not valid';
        break;
      case 'city':
        cityValid = value.match(/^[a-zA-Z]+$/);
        formErrors.city = cityValid ? '' : ' not valid';
        break;
      case 'zipCode':
        zipcodeValid = value.match(/^\d{5}$/);
        formErrors.zipCode = zipcodeValid?'':'not valid'
        break;
      case 'fullName':
        fullNameValid = value.match(/^[a-zA-Z]+$/);
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

validateForm() {
  let {emailValid,phoneValid,stateValid,zipcodeValid,cityValid,addressRequestedValid,fullNameValid} = this.state;
  this.setState({formValid: emailValid&&phoneValid&&stateValid&&zipcodeValid&&cityValid&&addressRequestedValid&&fullNameValid});
}

render(){
  const {
    formValid,
    email,
    phone,
    state,
    zipCode,
    city,
    address,
    fullName
  } = this.state;

  /*
    "fullName":"Dele Alli", <string valid
    "address":"123 Main Street",
    "city":"Austin", <string valid
    "state":"TX", <string valid
    "zipCode":78701, <number 5 digits valid
    "phone":2101234567, <number valid
    "email":"testemail@test.com" <email valid
  */

    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
          <Form className="profileFormContainer" onSubmit={this.handleSubmit}>
               <div className = "profileForm">
                 <Form.Field>
                   <label>Name</label>
                   <Input name='fullName'  value={fullName} onChange={this.handleChange} placeholder='Enter Name'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                   <label>Address</label>
                   <Input name='address'  value={address} onChange={this.handleChange} placeholder='Enter address'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                   <label>State</label>
                   <Input name='state'  value={state} onChange={this.handleChange} placeholder='Enter state'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                   <label>City</label>
                   <Input name='city'  value={city} onChange={this.handleChange} placeholder='Enter city'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                   <label>Zipcode</label>
                   <Input name='zipCode'  value={zipCode} onChange={this.handleChange} placeholder='Enter zip code'>
                     <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                     <label>Phone Number</label>
                   <Input name='phone'  value={phone} onChange={this.handleChange} iconPosition='left' placeholder="Enter Phone number" >
                         <Icon name='phone' />
                         <input />
                   </Input>
                 </Form.Field>
                 <Form.Field>
                     <label>Email</label>
                   <Input name='email'  value={email} onChange={this.handleChange} iconPosition='left' placeholder='Email'>
                         <Icon name='at' />
                         <input />
                     </Input>
                 </Form.Field>
               </div>
              <Form.Group width = 'equal'>
              </Form.Group>
              <Form.Button content='Submit' disabled={!formValid} />
          </Form>
       </Container>

    )
  }
};

export default ProfileForm;
