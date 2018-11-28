import React from 'react'

const Message = ({ message, onStar }) => (
  <div className="row message read">
    <div className="col-xs-1">
      <div className="row">
        <div className="col-xs-2">
          <input type="checkbox" />
        </div>
        <div className="col-xs-2">
          <i className={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`} onClick={ () => {onStar(message.id)}}></i>
        </div>
      </div>
    </div>
    <div className="col-xs-11">
      <a href="#">
        {message.subject}
      </a>
    </div>
  </div>
)

export default Message
