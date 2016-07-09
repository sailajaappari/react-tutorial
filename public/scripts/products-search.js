var Products = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];


var ProductRow = React.createClass ({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: "red"}}>
        {this.props.product.name}
      </span>
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductCategoryRow = React.createClass ({
  render: function() {
    return (
      <tr>
        <td style={{color: "blue"}}>{this.props.category}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass ({
  render: function() {
    var rows = [];
    var lastcategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if(product.category !== lastcategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastcategory = product.category;
    }.bind(this));
    return (
      <div>
        <table>
          <thead>
            <tr style={{color: "green"}}>
              <th>Name</th>
              <th>Price</th> 
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>   
      </div>
    );
  }
});

var SearchBar = React.createClass ({
  handleChange: function() {
    this.props.onUserInput (
      this.refs.FilterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <input 
           type="text"
           value={this.props.filterText} 
           placeholder="search..." 
           ref="FilterTextInput"
           onChange={this.handleChange}/>
        <p>
         <input 
           type="checkbox" 
           checked={this.props.inStockOnly}
           ref="inStockOnlyInput"
           onChange={this.handleChange}/>
         {''}
         Only show products in stock
        </p>
      </form>

    );
  }
});



var FilterableProductTable = React.createClass ({
  getInitialState: function() {
    return ({
      filterText: '',
      inStockOnly: false
    });
  },
  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function() {
    return (
      <div>
        <SearchBar 
           filterText={this.state.filterText}
           inStockOnly={this.state.inStockOnly}
           onUserInput={this.handleUserInput}/>
        <ProductTable 
           products={this.props.products}
           filterText={this.state.filterText}
           inStockOnly={this.state.inStockOnly}/>
      </div>
    );
  }
});

ReactDOM.render(
  <FilterableProductTable products={Products}/>,
  document.getElementById('content')
);
