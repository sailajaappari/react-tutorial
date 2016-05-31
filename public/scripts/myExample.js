var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is another comment"}
];
//comment
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h3 className="commentAuthor">
          {this.props.author}
        </h3>
        {this.props.children}
      </div> );
}});

//composing components

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>{comment.text}
        </Comment>); });
    return (
      <div className="commentList">
        {commentNodes}
      </div> );
}});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
         Hello world! I am the comment form
      </div> );
}});

//update the CommentBox component
var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentList data={this.props.data}/>
        <CommentForm />
      </div> );
}});

//js
/* var CommentBox = React.createClass({
 render: function() {
  return (
   <div className="commentBox">
     Hello world! I am comment box
   </div>); 
}}); */ 

// raw js
/*var CommentBox = React.createClass({
  displayName: 'CommentBox',
  render: function() {
    return (
      React.createElement('div', {className: 'commentBox'}, "Hello world! I am comment box"));
}}); */

/*ReactDOM.render(
  //<CommentBox />,
  React.createElement(CommentBox, null),
  document.getElementById('content'));*/

ReactDOM.render(
  <CommentBox data={data} />,
  document.getElementById('content'));

