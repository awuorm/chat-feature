import React, { Component } from 'react';
import { default as Chatkit } from '@pusher/chatkit-server';

import ChatMessage from './components/ChatMessage';
import Signup from './components/SignUp';
import ChatApp from './components/ChatApp';   
import './App.css';


    const chatkit = new Chatkit({
      // instanceLocator: "YOUR INSTANCE LOCATOR",
      // key: "YOUR SECRET KEY"
      instanceLocator: "v1:us1:4048a463-4dbb-4faf-b283-820c767ccace",
      key: "5b071718-1b65-4ab9-bfc5-0864f09bb76b:bOjtHDj1YhY8TYHIoYLLF/JdrgWB6Qt4xfyERUoqahA="
    });

    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
            currentUsername: '',
            currentId: '',
            currentView: 'signup'
        }
        this.changeView = this.changeView.bind(this);
        this.createUser = this.createUser.bind(this);
    }

    createUser(username) {
        chatkit.createUser({
            id: username,
            name: username,
        })
        .then((currentUser) => {
            this.setState({
                currentUsername: username,
                currentId: username,
                currentView: 'chatApp'
            })
        }).catch((err) => {
                 if(err.status === 400) {
                this.setState({
                    currentUsername: username,
                    currentId: username,
                    currentView: 'chatApp'
                })
            } else {
                console.log(err.status);
            }
        });
    }

      changeView(view) {
          this.setState({
              currentView: view
          })
      }

      render() {
        let view ='';

        if (this.state.currentView === "ChatMessage") {
            view = <ChatMessage  changeView={this.changeView}/>
        } else if (this.state.currentView === "signup") {
            view = <Signup onSubmit={this.createUser}/>
        } else if (this.state.currentView === "chatApp") {
            view = <ChatApp currentId={this.state.currentId} />
        }
            return (
                <div className="App">
                    {view}
                </div>
            );
        }
    }
    export default App;