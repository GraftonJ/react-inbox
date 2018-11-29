import React from 'react'

const Message = ({ message, onStar, checked, onSelect }) => (
  <div className={`row message ${ message.read ? 'read' : 'unread' } ${ message.selected ? "selected" : "" }` }>
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" checked="test" onChange={ () => onSelect(message.id) }/>
        </div>
        <div className="col-xs-2">
          <i className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`} onClick={ () => {onStar(message.id)}}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="/">
        {message.subject}
      </a>
    </div>
  </div>
)

export default Message
