import React from 'react';
import * as CheckAPI from './CheckAPI'
import './App.css';
import {Route, Link} from 'react-router-dom';

function ProductList(props){
  return (
    <div>
      <p>uid: {props.uid}</p>
      {props.product_types.map(product_type => 
        (<ol key={product_type}>拥有的type:{product_type}
        <Link to={
          {
            pathname: '/detail',
            query: {
              uid: props.uid,
              product_type: product_type
            }
          }
        }><button>查看具体type</button></Link></ol>)
        )}
    </div>
  );
}

class UidQuery extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uid: '',
      product_types: []
    };
  }
  handleInput(e){
    this.setState({uid: e.target.value});
  }

  handleSearch(){
    if(this.state.uid !== ''){
      CheckAPI.getAllType(this.state.uid).then(res=>{this.setState({product_types:res})})
    }
  }

  render(){
    return (
      <div>
        <input type='text' onChange={this.handleInput.bind(this)} defaultValue=''></input>
        <button onClick={this.handleSearch.bind(this)}>查询uid</button>
      <ProductList uid={this.state.uid} product_types={this.state.product_types} />
      </div>
    );
  }
}

function ProductIdList(props){
  return (
    <div>
      <p>uid: {props.uid}</p>
      <p>product type: {props.product_type}</p>
      <table>
        <tr>
          <td>产品id</td>
          <td>金额（分）</td>
        </tr>
      {props.detail.map(product_detail => 
      <tr>
        <td>{product_detail.id}</td>
        <td>{product_detail.amount}</td>
      </tr>
      )}
      </table>
    </div>
  );
}

class UidProductQuery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: []
    };
  }

  componentDidMount(){
    CheckAPI.getTypeInfo(this.props.uid, this.props.product_type)
    .then(res=>{this.setState({detail:res})})
  }

  render(){
    return (
      <div>
      <ProductIdList uid={this.props.location.query.uid} product_type={this.props.location.query.product_type} detail={this.state.detail} />
      </div>
    );
  }
}

class ProductApp extends React.Component{
  render(){
    return (
    <div className="App-header">
      <Route exact path='/' component={UidQuery} />
      <Route path='/detail' component={UidProductQuery} />
    </div>
    );
  }
}

export default ProductApp;