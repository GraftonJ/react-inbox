import React from 'react'
import Message from './Message.js'

export default class MessageList extends React.Component {
  render() {
    return (
      <div>
      {this.props.messages.map((message, idx) =>
      (<Message key={idx} message={message} />))}
      </div>
    )
  }
}
