import React, { Component } from 'react';
import Login from '../Presentation/Login'
import ReactDOM from 'react-dom';
import '../Styles/View Home Styles/Home.css';
import SignupPopup from '../Presentation/signupPopup';
class Home extends Component {
    constructor(){
        super();
        this.state= {
            userId:"",
            username: "",
            password:"",
            authorized:true,
            avatarURl:"",
            selectedImage:null
        };
    }


    handleUserIdChange=(e)=>{
        this.setState({userId:e.target.value});
    }

    handleUsernameChange=(e)=>{
        this.setState({username:e.target.value});
    }

    handlePasswordChange=(e)=>{
        this.setState({password:e.target.value});
    }


    handleSubmit= async(e)=>{
        e.preventDefault();
        this.props.model.setUserId(this.state.userId.toLowerCase());
        this.props.model.setPassword(this.state.password);

        sessionStorage.setItem("userId", this.state.userId.toLowerCase());
        sessionStorage.setItem("password", this.state.password);
        const response = await this.props.model.login()
        .then(res=> res)
        .catch(err=>{
            if(err.status===401)
            console.log(err)}
            );
        if(response){
            this.setState({authorized:true})
            this.props.history.push(`/chatScreen/${this.state.userId.toLowerCase()}`);
        }else{
            this.setState({authorized:false})
        }
    }

    fileSelectedHandlar = event=>{
        this.setState({
            selectedImage: event.target.files[0]
        });
    }

    imageUploadHandler= async (event)=>{
        event.preventDefault();
        let avatarUrl="";
        console.log(this.state.selectedImage)
        if (this.state.selectedImage){
            let data = new FormData();
            data.append('name', this.state.selectedImage.name);
            data.append('imgUrl', this.state.selectedImage);
            avatarUrl= await fetch('https://chat-application-api.herokuapp.com/pictures', {
                    method: 'POST',
                    body: data
                })
                .then(response => {
                    return response.json();
                })
                .then(data=>{
                        return data.url;
                })
                .catch(error => console.error('error', error));
        }

        this.props.model.setUsername(this.state.username.toLowerCase());
        this.props.model.setUserId(this.state.userId.toLowerCase());
        this.props.model.setPassword(this.state.password);
        sessionStorage.setItem("username", this.state.username.toLowerCase());
        sessionStorage.setItem("userId", this.state.userId.toLowerCase());
        sessionStorage.setItem("password", this.state.password);
        this.props.model.setAvatarUrl(avatarUrl);

        await this.props.model.signup().then(res=>{
            console.log(res)
            if(res.status===500){
                alert("username already taken :( try a different one")
            }else{
                alert("congratulations! you have successfully created acount! you can now log in")
                this.closePopup();
            }
            //this.closePopup();
        }).catch(err=> {
            console.log(err);
            alert("could not signup try again")
        });   
    }

    displayPopup=event=>{
        event.preventDefault();
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display= 'flex';
    }

    closePopup = event =>{
        const node = ReactDOM.findDOMNode(this);
        node.querySelector('.bg-modal').style.display= 'none';
    }

    render() { 
        return ( 
            <div>
                <Login 
                    userId={this.state.userId}
                    password={this.state.password}
                    authorized={this.state.authorized}
                    handleSubmit={this.handleSubmit}
                    handleUserIdChange={this.handleUserIdChange}
                    handlePasswordChange={this.handlePasswordChange}
                    displayPopup={this.displayPopup}
                />
                <SignupPopup 
                    userId={this.state.userId}
                    username={this.state.username}
                    password={this.state.password}
                    imageUploadHandler={this.imageUploadHandler}
                    fileSelectedHandlar={this.fileSelectedHandlar}
                    closePopup={this.closePopup}
                    handleUsernameChange={this.handleUsernameChange}
                    handlePasswordChange={this.handlePasswordChange}
                    handleUserIdChange={this.handleUserIdChange}

                />
            </div>
        );
    }
}
 
export default Home;