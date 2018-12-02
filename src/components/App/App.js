import React, { Component } from 'react';
import './App.css';
import Toolbar from '../Toolbar/Toolbar.js'
import MessageList from '../Messages/MessageList.js'
import ComposeForm from '../ComposeForm/ComposeForm.js'

class App extends Component {
  constructor(props) {
       super(props)
       this.apibase = 'http://localhost:8082/api/messages'
       this.state = {
         messages: [
            {
              "id": 1,
              "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
              "read": false,
              "starred": true,
              "labels": ["dev", "personal"]
            },
            {
              "id": 2,
              "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
              "read": false,
              "starred": false,
              "selected": true,
              "labels": []
            },
            {
              "id": 3,
              "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
              "read": false,
              "starred": true,
              "labels": ["dev"]
            },
            {
              "id": 4,
              "subject": "We need to program the primary TCP hard drive!",
              "read": true,
              "starred": false,
              "selected": true,
              "labels": []
            },
            {
              "id": 5,
              "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
              "read": false,
              "starred": false,
              "labels": ["personal"]
            },
            {
              "id": 6,
              "subject": "We need to back up the wireless GB driver!",
              "read": true,
              "starred": true,
              "labels": []
            },
            {
              "id": 7,
              "subject": "We need to index the mobile PCI bus!",
              "read": true,
              "starred": false,
              "labels": ["dev", "personal"]
            },
            {
              "id": 8,
              "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
              "read": true,
              "starred": true,
              "labels": []
            }
          ]
       }
     }

     onStar = id => {
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if(message.id === id) {
             message.starred = !message.starred
           }
           return message
         })
       })
     }

     onRead = id => {
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if(message.id === id) {
             if(message.read === false) {
               message.read = true
             }
           }
           return message
         })
       })
     }

     markRead = selected => {
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if(message.selected) {
               message.read = true
           }
           return message
         })
       })
     }

     markUnread = selected => {
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if(message.selected) {
               message.read = false
           }
           return message
         })
       })
     }

    onSelect = id => {
      this.setState({
        ...this.state,
        messages: this.state.messages.map(message => {
          if (message.id === id) {
            message.selected ? message.selected = false : message.selected = true
          }
          return message
        })
      })
    }

    onSelectAll = selected => {
      this.setState({
        ...this.state,
        messages: this.state.messages.map((message) => {
          selected < this.state.messages.length
          ? message.selected = true
          : message.selected = false
          return message
        })
      })
    }

    addLabel = label => {
      this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if(message.selected && !message.labels.includes(label)) {
          message.labels.push(label)
          message.labels.sort()
          }
          return message
        })
      })
    }

    removeLabel = label => {
      this.setState({
      ...this.state,
      messages: this.state.messages.map(message => {
        if(message.selected && message.labels.includes(label)) {
          message.labels.pop(label)
          message.labels.sort()
          }
          return message
        })
      })
    }



  render() {
    return (
      <div className="App container">
        <h1>Gmail</h1>
        <Toolbar
          messages={this.state.messages}
          markRead={this.markRead}
          markUnread={this.markUnread}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          onSelectAll={this.onSelectAll}
          selected={this.state.messages.filter(message => message.selected).length}
          unselected={this.state.messages.filter(message => !message.selected).length}
          />
        <MessageList messages={this.state.messages} onStar={this.onStar} onSelect={this.onSelect} onRead={this.onRead}/>
        <ComposeForm />
      </div>
    );
  }
}

export default App;
