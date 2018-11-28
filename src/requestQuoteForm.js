import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Date from './datepicker';
import FormErrors from './FormErrors'
import Location from './locationPicker';
import {Button, Form, Input,Label,Icon,Container} from 'semantic-ui-react'
import './App.css'



const locationWrapper = props =>(
    <Form.Field>
        <label>Delivery Location</label>
        <Input icon='search' placeholder='Search...' />
        <Location/>
    </Form.Field>
);

class RequestQuoteForm extends React.Component{

  state = {
     name: '',
     gallonsRequested: '',
     date: '',
     suggestedPrice:'',
     totalAmountDue:'',
     phone:'',
     email:'',
     submittedGallonsRequested: '',
     sumbittedDate: '',
     formErrors: {email: '',phone:'',date:'',"suggestedPrice":'',totalAmountDue:'',gallonsRequested:'',name:''},
     emailValid: false,
     dateValid:false,
     phoneValid: false,
     suggestedValid: false,
     amountValid:false,
     gallonsRequestedValid:false,
     nameValid: false,
     formValid: false,
   }

  handleChange = (e, { name, value }) =>{
    console.log(name);
     this.setState({ [name]: value }, () => { this.validateField(name, value) })
  }
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

   this.setState({ submittedGallonsRequested: gallonsRequested, sumbittedDate: date })
    console.log(this.state);
  }

  validateField(fieldName, value) {
    let {formErrors,emailValid,phoneValid,dateValid,suggestedValid,amountValid,gallonsRequestedValid,nameValid} = this.state;
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
        nameValid = value.match(/^[a-zA-Z]+$/);
        formErrors.name = nameValid ? '' : ' not valid';
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
                  }, this.validateForm);
 }

validateForm() {
  let {emailValid,phoneValid,dateValid,suggestedValid,amountValid,gallonsRequestedValid,nameValid} = this.state;
  this.setState({formValid: emailValid&&phoneValid&&dateValid&&suggestedValid&&amountValid&&gallonsRequestedValid&&nameValid});
}

  _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    };

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
  } = this.state;
    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
           <div className="formStyle">
               <Form onSubmit={this.handleSubmit}>
                   <Form.Group width = 'equal'>
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
                   </Form.Group>
                   <Form.Field onKeyPress={this._handleKeyPress}>
                       <label>Delivery Location</label>
                       <Input icon='search' placeholder='Search...' />
                       <Location/>
                   </Form.Field>
                   <Form.Group widht = 'equal'>
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
                   </Form.Group>
                   <Form.Button content='Submit' disabled={!formValid} />
               </Form>
           </div>
       </Container>

    )
  }
};

export default RequestQuoteForm;
