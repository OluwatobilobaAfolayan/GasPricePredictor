import React from 'react'
import FormErrors from './FormErrors'
import {Button, Form, Input,Label,Icon,Container,Dropdown} from 'semantic-ui-react'
import './App.css'
import {stateOptions,cityOptions} from './states-cities';
import {Link} from "react-router-dom";



class RequestQuoteForm extends React.Component{

  state = {
     name: '',
     gallonsRequested: '',
     date: '',
     suggestedPrice:'',
     totalAmountDue:'',
     phone:'',
     email:'',
     location:'',
     formErrors: {email: '',phone:'',date:'',"suggestedPrice":'',totalAmountDue:'',gallonsRequested:'',name:'',state:'',zipCode:'',city:''},
     emailValid: false,
     dateValid:false,
     phoneValid: false,
     suggestedValid: false,
     amountValid:false,
     gallonsRequestedValid:false,
     stateValid:false,
     zipcodeValid: false,
     cityValid:false,
     nameValid: false,
     formValid: false,
     submitting:false,
     filteredCities:null
   };

  handleChange = (e, { name, value }) =>{
      console.log(name);
      this.setState({ [name]: value }, () => { this.validateField(name, value) });
      if (name === 'state'){
          let filteredCities = cityOptions(value);
          this.setState({filteredCities})
      }
  };

  handleSubmit = ()=> {
    const {
      gallonsRequested,
      date,
      suggestedPrice,
      totalAmountDue,
      phone,
      email,
      name,
    } = this.state;

    this.setState({})
  };

  validateField(fieldName, value) {
    let {formErrors,emailValid,phoneValid,dateValid,suggestedValid,amountValid,gallonsRequestedValid,nameValid,stateValid,zipcodeValid,cityValid} = this.state;
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'phone':
        phoneValid = value.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i);
        formErrors.phone = phoneValid ? '' : ' is invalid';
        break;
      case 'date':
        dateValid = value.match(/^[12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/i);
        formErrors.date = dateValid ? '' : ' not filled';
        break;
      case 'suggestedPrice':
        suggestedValid = value.match(/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/i);
        formErrors.suggestedPrice = suggestedValid ? '' : 'is invalid';
        break;
      case 'totalAmountDue':
        amountValid = value.match(/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/i);
        formErrors.totalAmountDue = amountValid ? '' : ' not valid';
        break;
      case 'gallonsRequested':
        gallonsRequestedValid = value.match(/^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/i);
        formErrors.gallonsRequested = gallonsRequestedValid ? '' : ' not valid';
        break;
      case 'name':
        nameValid =  value.match(/^(?![\s.]+$)[a-zA-Z\s.]*$/) && value.length>0;
        formErrors.name = nameValid ? '' : ' not valid';
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
        formErrors.zipCode = zipcodeValid?'':'not valid';
        break;
      default:
        break;
    }
    this.setState({
                    formErrors,
                    emailValid,
                    phoneValid,
                    dateValid,
                    suggestedValid,
                    amountValid,
                    gallonsRequestedValid,
                    nameValid,
                    stateValid,
                    zipcodeValid,
                    cityValid,
                  }, this.validateForm);
 }

validateForm() {
  let {emailValid,phoneValid,dateValid,suggestedValid,amountValid,gallonsRequestedValid,nameValid,stateValid,zipcodeValid,cityValid} = this.state;
  this.setState({formValid: emailValid&&phoneValid&&dateValid&&suggestedValid&&amountValid&&gallonsRequestedValid&&nameValid&&stateValid&&zipcodeValid&&cityValid});
}

render(){
  const {
    formValid,
    gallonsRequested,
    date,
    suggestedPrice,
    totalAmountDue,
    phone,
    email,
    name,
    state,
    zipCode,
    city,
    filteredCities,
    submitting
  } = this.state;
    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
           <Form className="FormContainer" onSubmit={this.handleSubmit}>
               <div className = "appform formCard">
                   {/* <Field name="gallonsRequested" component={gallonsRequested} type="text" /> */}
                   <Form.Input  label='Gallons Requested' placeholder='Enter Amount' name='gallonsRequested' value={gallonsRequested} onChange={this.handleChange} />
                   <Form.Field >
                       <label>Date</label>
                       <Input name='date' value={date} onChange={this.handleChange}  labelPosition='left' type='text' placeholder='Price?'>
                           <input type='date'/>
                       </Input>
                   </Form.Field>
                   <Form.Field >
                       <label>Suggested Price</label>
                       <Input name='suggestedPrice' value={suggestedPrice} onChange={this.handleChange}  labelPosition='left' type='text' placeholder='Price?'>
                           <Label basic>$</Label>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field >
                       <label>Amount Due</label>
                       <Input name='totalAmountDue'  value={totalAmountDue} onChange={this.handleChange}  labelPosition='left' type='text' placeholder='Amount due?'>
                           <Label basic>$</Label>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field >
                       <label>State</label>
                       <Dropdown name='state'  value={state} onChange={this.handleChange} placeholder='Enter state' search selection options={stateOptions} />
                   </Form.Field>
                   <Form.Field  >
                       <label>City</label>
                       <Dropdown  name='city'  value={city} onChange={this.handleChange} placeholder='Enter city' search selection options={filteredCities}/>
                   </Form.Field>
                   <Form.Field >
                       <label>Zipcode</label>
                       <Input name='zipCode'  value={zipCode} onChange={this.handleChange} placeholder='Enter zip code'>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field>
                       <label>Name</label>
                       <Input name='name'  value={name} onChange={this.handleChange} placeholder='Enter Name'>
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
                   <Form.Button content='Submit' color="green" disabled={!formValid || submitting} />
                   <Link to="/clientInfo">
                       <Button content='Cancel'/>
                   </Link>
               </Form.Group>
           </Form>
       </Container>

    )
  }
}

export default RequestQuoteForm;
