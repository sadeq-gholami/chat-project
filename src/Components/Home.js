import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../Styles/View Home Styles/Home.css';
class Home extends Component {
    constructor(){
        super();
        this.state= {
            userName: " "
        };
    }
    
    handlechange=(e)=>{
        this.setState({userName:e.target.value});
       // console.log(this.state.userName);
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.setUserName(this.state.userName.toLowerCase());
    }
    render() { 
        return ( 
           
     <div className= "app1"> 
         <div className= "outerbox">
         <div className= "innerbox">
        <div className ="imageholder">
         <img  width="140" src={ require('../images/icon.png') } />
         </div>
          <form className ="username" onSubmit={this.handleSubmit}>
            <input  onChange ={this.handlechange} 
                    value={this.state.userName}
                    placeholder="Enter username..."
                    type="text"/>
<<<<<<< HEAD
            <div>
            <Link to ={`/chatScreen/${this.state.userName.toLowerCase()}`}>
                 <button id = "tbtn" onClick={e=>this.handleSubmit(e)} 
                 type="button" >Sign in
                 </button> 
                
            </Link>
             </div>
=======
            <button id = "Sbtn" onClick={e=>this.handleSubmit(e)} type="button" >
                <Link to ={`/chatScreen/${this.state.userName.toLowerCase()}`}>login</Link>
                </button>
>>>>>>> f2715e923f7f88bd0aa09a9144ac205221a0a8dd
            </form>
                </div>
              </div>
            </div>
            
         );
    }
}
 
export default Home;