import React from 'react'
import FormErrors from './FormErrors'
import {Button, Form, Input,Label,Icon,Container,Dropdown} from 'semantic-ui-react'
import './App.css'
import {stateOptions,cityOptions} from './states-cities';
import {Link,withRouter} from "react-router-dom";



class RequestQuoteForm extends React.Component{

  state = {
      _id:'',
     name: '',
     gallonsRequested:0,
     date: '',
     suggestedPrice:0,
     totalAmountDue:0,
     phone:'',
     email:'',
     state:'',
     zipCode:'',
     city:'',
     address:'',
     client:'',
     formErrors: {email: '',phone:'',date:'',gallonsRequested:'',name:'',state:'',zipCode:'',city:'',address:'',client:''},
     emailValid: false,
     dateValid:false,
     phoneValid: false,
     gallonsRequestedValid:false,
     stateValid:false,
     zipcodeValid: false,
     addressValid:false,
     cityValid:false,
     nameValid: false,
     formValid: false,
     clientValid:false,
     submitting:false,
     filteredCities:null,
     clientOptions: null,
     clientToStateMap: {},
     quoteHistoryToClientMap:{},
     readOnlyMode:false,
   };

  handleChange = (e, { name, value }) =>{
      console.log(name,value,typeof value);
      this.setState({ [name]: value }, () => { this.validateField(name, value) });
      if (name === 'state'){
          let filteredCities = cityOptions(value);
          this.setState({filteredCities})
      }
  };

  componentDidMount(){
      fetch("http://localhost:3000/clientsInfo/")
      .then(res => {
          return res.json();
      }).then(data=>{
            let clientToStateMap = {};
            let clientOptions = data.map(client=>{
                clientToStateMap[client._id] = client.state;
                //make value an object to diff clients with same state since dropdown with same values wont work
                return {key:client._id,value:client._id,text:client.fullName}
            });
            this.setState({clientOptions,clientToStateMap});
      }).catch(err=>console.log('error from clients info call',err));

      fetch("http://localhost:3000/quotes/")
          .then(res=>{
              return res.json();
          })
          .then(data=>{
              let quoteHistoryToClientMap = {};
              data.map(quote=>quoteHistoryToClientMap[quote.clientId]=true);
              this.setState({quoteHistoryToClientMap})
          })
          .catch(err=>console.log('error from quotes call',err));
      //if coming from quoteHistory page prefill form.
      if (this.props.location.state){
          let {
              _id,
              gallonsRequested,
              requestDate,
              deliveryDate,
              deliveryAddress,
              deliveryCity,
              deliveryState,
              deliveryZipCode,
              deliveryContactName,
              deliveryContactPhone,
              deliveryContactEmail,
              suggestedPrice,
              totalAmountDue
          } = this.props.location.state;
          let formState = {
              _id,
              gallonsRequested,
              requestDate,
              date:deliveryDate.slice(0,10),
              address:deliveryAddress,
              city:deliveryCity ,
              state:deliveryState ,
              zipCode:deliveryZipCode ,
              name:deliveryContactName ,
              phone:deliveryContactPhone ,
              email:deliveryContactEmail,
              suggestedPrice,
              totalAmountDue,
              client:"5be1141d743dba3fd88e9052",//should change later to get proper client ID
              filteredCities:cityOptions(deliveryState),
              formValid:true,
              emailValid: true,
              dateValid:true,
              phoneValid: true,
              gallonsRequestedValid:true,
              stateValid:true,
              zipcodeValid: true,
              addressValid:true,
              cityValid:true,
              nameValid: true,
              clientValid:true,
              readOnlyMode:true
          };

          this.setState({...formState});
      }

      //uncomment to run test state
      // let testState = {
      //     name: 'Test User new',
      //     gallonsRequested:1500,
      //     date: '2018-11-30',
      //     phone:'8325555555',
      //     email:'test@email.com',
      //     state:'Texas',
      //     zipCode:'11111',
      //     city:'Houston',
      //     address:'19254 blah street',
      //     client:"5be1141d743dba3fd88e9052",
      //     formValid:true,
      //     filteredCities:cityOptions("Texas"),
      //     suggestedPrice:2.5185,
      //     totalAmountDue:3777.75,
      // };
      // this.setState(testState)
  }

  handleSubmit = ()=> {
      this.setState({submitting:true});

      const {
      gallonsRequested,
      date,
      suggestedPrice,
      totalAmountDue,
      phone,
      email,
      name,
      state,
      city,
      zipCode,
      address,
      _id,
      } = this.state;
      console.log(typeof suggestedPrice,
          typeof totalAmountDue, typeof zipCode);
    let requestDate = new Date();
    let deliveryDate = new Date(date);
    let payload = JSON.stringify({
          quoteId: 1,
          clientId: 1,
          gallonsRequested,
          requestDate,
          deliveryDate,
          deliveryAddress: address,
          deliveryCity: city,
          deliveryState: state,
          deliveryZipCode: zipCode,
          deliveryContactName: name,
          deliveryContactPhone: phone,
          deliveryContactEmail:email,
          suggestedPrice,
          totalAmountDue
    });
      let param = (_id)?_id:"";
      let method = (_id)?"PUT":"POST";
      fetch(`http://localhost:3000/quotes/${param}`,{
          method,
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body:payload
      })
          .then(res => res.json())
          .then(() =>{
              this.props.history.push('/clientInfo');
              this.setState({submitting:false})
          })
          .catch(error => this.setState({submitting:false}));

    // this.setState({})
  };
    deleteClient = () => {
        this.setState({submitting:true});
        fetch(`http://localhost:3000/quotes/${this.state._id}`,{
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
    let {formErrors,emailValid,phoneValid,dateValid,gallonsRequestedValid,nameValid,stateValid,zipcodeValid,cityValid,addressValid,clientValid} = this.state;
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
      case 'address':
        addressValid = value.length > 0;
        formErrors.address = addressValid? '': 'cannot be empty';
        break;
      case 'client':
        clientValid = value.length>0;
        formErrors.client =  clientValid? '': 'cannot be empty';
      default:
        break;
    }
    this.setState({
                    formErrors,
                    emailValid,
                    phoneValid,
                    dateValid,
                    gallonsRequestedValid,
                    nameValid,
                    stateValid,
                    zipcodeValid,
                    cityValid,
                    addressValid,
                    clientValid
                  }, this.validateForm);

        //Once forms required fields are filled generate suggested price and total amount due
      let {clientToStateMap,gallonsRequested,state,client,quoteHistoryToClientMap} = this.state;
      if(gallonsRequestedValid && stateValid && clientValid){
          let locationFactor = (clientToStateMap[client] === state)?.02:.04;
          let rateHistoryFactor = (quoteHistoryToClientMap[client])?.2:.3;
          let galReqFactor = (gallonsRequested>1000)?.02:.03;
          let suggestedPrice = 2.19 + (locationFactor+rateHistoryFactor+galReqFactor+.05+.04)*2.19;
          let totalAmountDue = suggestedPrice*gallonsRequested;
          this.setState({suggestedPrice,totalAmountDue})
      }
 }

validateForm() {
  let {emailValid,phoneValid,dateValid,gallonsRequestedValid,nameValid,stateValid,zipcodeValid,cityValid,addressValid,clientValid} = this.state;
  this.setState({formValid: emailValid&&phoneValid&&dateValid&&gallonsRequestedValid&&nameValid&&stateValid&&zipcodeValid&&cityValid&&addressValid&&clientValid});
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
    address,
    client,
    clientOptions,
    filteredCities,
    submitting,
    readOnlyMode,
  } = this.state;
    return (
       <Container textAlign='left'>
           <div style ={{padding:'10px'}} hidden={formValid}>
             <FormErrors formErrors={this.state.formErrors} />
          </div>
           <Form className="FormContainer" onSubmit={this.handleSubmit}>
               <div className = "appform formCard">
                   {/* <Field name="gallonsRequested" component={gallonsRequested} type="text" /> */}
                   <Form.Field   className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Client</label>
                       <Dropdown disabled = {readOnlyMode} name='client'  value={client} onChange={this.handleChange} placeholder='Enter client' search selection options={clientOptions} />
                   </Form.Field>
                   <Form.Input  label='Gallons Requested' placeholder='Enter Amount' name='gallonsRequested' value={gallonsRequested} onChange={this.handleChange} />
                   <Form.Field   className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Delivery Date</label>
                       <Input disabled = {readOnlyMode} name='date' value={date} onChange={this.handleChange}  labelPosition='left' type='text' placeholder='Price?'>
                           <input type='date'/>
                       </Input>
                   </Form.Field>
                   <Form.Field className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Address</label>
                       <Input disabled = {readOnlyMode} name='address'  value={address} onChange={this.handleChange} placeholder='Enter address'>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field   className={readOnlyMode?"disabledProfileInput":""}>
                       <label>State</label>
                       <Dropdown disabled = {readOnlyMode} name='state'  value={state} onChange={this.handleChange} placeholder='Enter state' search selection options={stateOptions} />
                   </Form.Field>
                   <Form.Field    className={readOnlyMode?"disabledProfileInput":""}>
                       <label>City</label>
                       <Dropdown disabled = {readOnlyMode} name='city'  value={city} onChange={this.handleChange} placeholder='Enter city' search selection options={filteredCities}/>
                   </Form.Field>
                   <Form.Field   className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Zipcode</label>
                       <Input disabled = {readOnlyMode} name='zipCode'  value={zipCode} onChange={this.handleChange} placeholder='Enter zip code'>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Name</label>
                       <Input disabled = {readOnlyMode} name='name'  value={name} onChange={this.handleChange} placeholder='Enter Name'>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Phone Number</label>
                       <Input disabled = {readOnlyMode} name='phone'  value={phone} onChange={this.handleChange} iconPosition='left' placeholder="Enter Phone number" >
                           <Icon name='phone' />
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field  className={readOnlyMode?"disabledProfileInput":""}>
                       <label>Email</label>
                       <Input disabled = {readOnlyMode} name='email'  value={email} onChange={this.handleChange} iconPosition='left' placeholder='Email'>
                           <Icon name='at' />
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field className="disabledProfileInput" >
                       <label>Suggested Price</label>
                       <Input disabled name='suggestedPrice' value={suggestedPrice} labelPosition='left' type='text' placeholder='Price?'>
                           <Label basic>$</Label>
                           <input />
                       </Input>
                   </Form.Field>
                   <Form.Field className="disabledProfileInput">
                       <label>Amount Due</label>
                       <Input disabled name='totalAmountDue'  value={totalAmountDue}  labelPosition='left' type='text' placeholder='Amount due?'>
                           <Label basic>$</Label>
                           <input />
                       </Input>
                   </Form.Field>
               </div>
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
               <Form.Group disabled={submitting} width='equal'>
                   <Form.Button content='Submit' color="green" disabled={!formValid}/>
                   <Link to="/clientInfo">
                       <Button content='Cancel'/>
                   </Link>
               </Form.Group>
               }
           </Form>
       </Container>

    )
  }
}

export default withRouter(RequestQuoteForm);
