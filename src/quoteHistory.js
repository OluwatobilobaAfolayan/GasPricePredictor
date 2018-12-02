import React from 'react';
import ReactTable from 'react-table';
import './App.css';
import {Link} from "react-router-dom";


export default class QuoteHistory extends React.Component{

   state = {
      data:[],
      loading:false,
      itemIDToQuoteMap:{}
    };
    componentDidMount(){
      this.setState({loading:true});
      fetch("http://localhost:3000/quotes/")
      .then(res=>{
        return res.json();
      })
      .then(data=>{
        console.log("from quoteHistroy success",data);
        let itemIDToQuoteMap ={};
        data.map(quote=>{
            itemIDToQuoteMap[quote._id] = quote;
        });
        this.setState({data,itemIDToQuoteMap,loading:false})
      })
      .catch(err=>{
        console.log("from quoteHistroy error",err);
        this.setState({loading:false})
      })
    }
    
    render() {
        const {itemIDToQuoteMap} = this.state;
        const columns = [{
                Header: 'Item ID',
                accessor: '_id',
                Cell: props => <Link to={{
                    pathname:"/requestQuote",
                    state:{...itemIDToQuoteMap[props.value]}
                }
                }>{props.value}</Link>
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
                <div >
                    {!loading && 
                      <ReactTable
                          className = "quoteHistoryCard"
                          data={data}
                          columns={columns}
                      />
                    }
                </div>
            )
    }
}
