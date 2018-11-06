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

    render() {
        const data = [
          {
            "_id":"5bb724b4feb47b39acc322ff",
            "clientId":1,
            "gallonsRequested":29.4,
            "deliveryDate":"2018-11-17T06:00:00.000Z",
            "requestDate":"2018-01-23T06:00:00.000Z",
            "deliveryLocation":"223 N LBJ",
            "deliveryContactName":"Jude Jesse",
            "deliveryContactPhone":"2223334455",
            "deliveryContactEmail":"abc@gmail.com",
            "suggestedPrice":4000,
            "totalAmountDue":5700,
            "__v":0
          }
          ,{
              "_id":"5bb724c5feb47b39acc32300",
              "clientId":2,
              "gallonsRequested":70,
              "deliveryDate":"2018-12-17T06:00:00.000Z",
              "requestDate":"2015-10-17T06:00:00.000Z",
              "deliveryLocation":"123 E Bugg Ln",
              "deliveryContactName":"Emily Foster",
              "deliveryContactPhone":"8739342342",
              "deliveryContactEmail":"hij@gmail.com",
              "suggestedPrice":15000,
              "totalAmountDue":19000,"__v":0
            },{"_id":"5bb7ecf46332e970342228c6",
              "clientId":7,
              "gallonsRequested":70,
              "deliveryDate":"2018-12-17T06:00:00.000Z",
              "requestDate":"2015-10-17T06:00:00.000Z",
              "deliveryLocation":"123 E Bugg Ln",
              "deliveryContactName":"Don Jesse",
              "deliveryContactPhone":"8739342342",
              "deliveryContactEmail":"hij@gmail.com",
              "suggestedPrice":15000,
              "totalAmountDue":19000,"__v":0}
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
