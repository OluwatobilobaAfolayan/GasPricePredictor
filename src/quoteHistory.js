import React from 'react';
import ReactTable from 'react-table'

export default class QuoteHistory extends React.Component{

    // componentDidMount(){
    //   fetch("http://localhost:3000/quotes/")
    //   .then(res => {
    //     console.log(res);
    //     return res.json();
    //   })
    //   .then(data => {
    //     this.setState({data})
    //   })
    //
    //
    // }
/*
[{
  "_id":"5be10e7798f2b926bfd56a92",
  "clientId":1,
  "fullName":"Dele Alli",
  "address":"123 Main Street",
  "city":"Austin",
  "state":"TX",
  "zipCode":78701,
  "phone":2101234567,
  "email":"testemail@test.com"
},
{
  "_id":"5be1141d743dba3fd88e9052",
  "clientId":1, 
  "fullName":"Raj Singh",
  "address":"611 San Marcos Drive",
  "city":"San Marcos",
  "state":"TX","zipCode":78666,
  "phone":674938888,
  "email":"xyz@test.com",
  "__v":0
}]
*/
    render() {
        const data = [
        {
          "_id":"5be10fb698f2b926bfd5d69e",
          "quoteId":1,
          "clientId":1,
          "gallonsRequested":1000,
          "requestDate":"2018-10-20T06:00:00.000Z",
          "deliveryDate":"2018-10-30T06:00:00.000Z",
          "deliveryAddress":"123 Main Street",
          "deliveryCity":"Austin",
          "deliveryState":"TX",
          "deliveryZipCode":78701,
          "deliveryContactName":"Raj Singh",
          "deliveryContactPhone":2101234567,
          "deliveryContactEmail":"testemail@test.com",
          "suggestedPrice":2.59,
          "totalAmountDue":2590
        },{
          "_id":"5be116c5743dba3fd88e9054",
          "quoteId":2,
          "clientId":2,
          "gallonsRequested":500,
          "requestDate":"2018-07-20T06:00:00.000Z",
          "deliveryDate":"2019-01-30T06:00:00.000Z",
          "deliveryAddress":"323 Zone street",
          "deliveryCity":"Austin",
          "deliveryState":"AZ",
          "deliveryZipCode":8701,
          "deliveryContactName":"David Michigan",
          "deliveryContactPhone":8573648382,
          "deliveryContactEmail":"testemail2@test.com",
          "suggestedPrice":7.9,
          "totalAmountDue":6372,
          "__v":0
        }
      ];

        const columns = [{
                Header: 'Item #',
                accessor: '_id'
            }, {
                Header: 'Request Date',
                accessor: 'requestDate',
            }, {
                Header: 'Delivery Date',
                accessor: 'deliveryDate'
            }, {
                Header: 'Gallons Rate',
                accessor: 'gallonsRequested'
            },
            {
                Header: 'Total Price',
                accessor: 'totalAmountDue'
            }];

            return (
                <ReactTable
                    data={data}
                    columns={columns}
                />
            )
    }
}
