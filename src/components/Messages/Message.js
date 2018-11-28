import React from 'react'

const Message = ({ message, onStar }) => (
  <div class="row message read">
    <div class="col-xs-1">
      <div class="row">
        <div class="col-xs-2">
          <input type="checkbox" />
        </div>
        <div class="col-xs-2">
          <i class={`star fa ${message.starred ? "fa-star" : "fa-star-o"}`} onClick={ () => {onStar(message.id)}}></i>
        </div>
      </div>
    </div>
    <div class="col-xs-11">
      <a href="#">
        {message.subject}
      </a>
    </div>
  </div>
)

export default Message
