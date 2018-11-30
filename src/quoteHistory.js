import React from 'react';
import ReactTable from 'react-table'

export default class QuoteHistory extends React.Component{

   state = {
      data:[],
      loading:false,
    }
    componentDidMount(){
      this.setState({loading:true});
      fetch("http://localhost:3000/quotes/")
      .then(res=>{
        return res.json();
      })
      .then(data=>{
        console.log("from quoteHistroy success",data)
        this.setState({data,loading:false})
      })
      .catch(err=>{
        console.log("from quoteHistroy error",err)
        this.setState({loading:false})
      })
    }
    
    render() {
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
          
            let {data,loading} = this.state;
            return (
                <div>
                    {!loading && 
                      <ReactTable
                          data={data}
                          columns={columns}
                      />
                    }
                </div>
            )
    }
}
