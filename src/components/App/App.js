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
         composing: false,
         messages: []
       }
       this.API = 'http://localhost:8082/api/messages'
     }

     async componentDidMount() {
       const res = await fetch(this.API)
       const messages = await res.json()

       if (!res.ok) {
         console.log('NOT WORKING');
        this.setState({
          ...this.state,
          errors: [...this.state.errors, messages]
        })
        return
      }

       this.setState({
         ...this.state,
         messages
       })
     }

     onStar = async id => {
       const res = await fetch(this.API, {
         method: "PATCH",
         body: JSON.stringify({
           command: "star",
           messageIds: [id]
         }),
         headers: {
           'Content-Type': 'application/json; charset=utf-8',
           'Accept': 'application/json',
         }
       })

      if (!res.ok) {
           this.setState({
             ...this.state,
             errors: [...this.state.errors, await res.json()]
             })
            return
          }

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

     onRead = async id => {
       console.log("ONREAD FUNCTION");
       const ids = this.state.messages
      .map(message => message.id)

      const res = await fetch(this.API, {
        method: "PATCH",
        body: JSON.stringify({
          command: "read",
          messageIds: [id],
          read: true
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        }
      })
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

     markRead = async read => {
       console.log('Mark Read Function');
       const ids = this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)

      const res = await fetch(this.API, {
        method: "PATCH",
        body: JSON.stringify({
          command: "read",
          messageIds: ids,
          read: true
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        }
      })
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if (message.selected) message.read = true
           return message
         })
       })
     }

     markUnread = async read => {
       console.log('Mark Read Function');
       const ids = this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)

      const res = await fetch(this.API, {
        method: "PATCH",
        body: JSON.stringify({
          command: "read",
          messageIds: ids,
          read: false
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
        }
      })
       this.setState({
         ...this.state,
         messages: this.state.messages.map((message) => {
           if (message.selected) message.read = false
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

    addLabel = async label => {
      const ids = this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)

      const res = await fetch(this.API, {
        method: "PATCH",
        body: JSON.stringify({
          command: "addLabel",
          label,
          messageIds: ids
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })

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

    removeLabel = async label => {
      const ids = this.state.messages
      .filter(message => message.selected)
      .map(message => message.id)

      const res = await fetch(this.API, {
        method: "PATCH",
        body: JSON.stringify({
          command: "removeLabel",
          label,
          messageIds: ids
        }),
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        }
      })

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

    onDelete = id => {
      this.setState({
        ...this.state,
        messages: this.state.messages.filter(message => !message.selected)
      })
    }

    onCompose = () => {
      this.setState({
        ...this.state,
        composing: !this.state.composing
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
          numberUnread={this.state.messages.filter(message => !message.read).length}
          onDelete={this.onDelete}
          onCompose={this.onCompose}
          />
        <ComposeForm
          compose={this.state.composing}
        />
        <MessageList
          messages={this.state.messages}
          onStar={this.onStar}
          onSelect={this.onSelect}
          onRead={this.onRead}
        />

      </div>
    );
  }
}

export default App;
