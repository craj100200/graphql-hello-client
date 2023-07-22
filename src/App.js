import React, { Component } from 'react';
import './App.css';

async function loadGreeting() {
   const response =  await fetch('https://graphql-hello-server.vercel.app/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:'{hello}'})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.hello;
}

async function  loadSayhello(name) {
   const response =  await fetch('https://graphql-hello-server.vercel.app/graphql', {
      method:'POST',
      headers:{'content-type':'application/json'},
      body:JSON.stringify({query:`{helloWithUserName(name:"${name}")}`})
   })
   const rsponseBody =  await response.json();
   return rsponseBody.data.helloWithUserName;
}

class App extends Component {
   constructor(props) {
      super(props);
      this.state =  {greetingMessage:'',sayHelloMessage:'',userName:''}
      this.updateName =  this.updateName.bind(this);
      this.showSayHelloMessage =  this.showSayHelloMessage.bind(this);
      this.showGreeting =  this.showGreeting.bind(this);
   }
   
   showGreeting() {
      loadGreeting().then(g => this.setState({greetingMessage:g+" :-)"}))
   }
   
   showSayHelloMessage() {
      const name = this.state.userName;
      console.log(name)
      loadSayhello(name).then(m => this.setState({sayHelloMessage:m}))
   }
   
   updateName(event) {
      this.setState({userName:event.target.value})
   }
   render() {
      return (
         <div className = "App">

            <section>
               <button id = "btnGreet" onClick = {this.showGreeting}>Greet</button>
               <br/> <br/>
               <div id = "greetingDiv">
                  <h1>{this.state.greetingMessage}</h1>
               </div>
            </section>
            
            <hr/>
            
            <section>
               Enter a name:<input id = "txtName" type = "text" onChange = {this.updateName}
               value = {this.state.userName}/>
               <button id = "btnSayhello" onClick = {this.showSayHelloMessage}>SayHello</button>
               <br/>
               user name is:{this.state.userName}    <br/>
               <div id = "SayhelloDiv">
                  <h1>{this.state.sayHelloMessage}</h1>
               </div>
            </section>
         </div>
      );
   }
}

export default App;
