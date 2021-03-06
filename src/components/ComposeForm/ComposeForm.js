import React from 'react'

const ComposeForm = ({ compose, onSend }) => (
    !compose
    ? <div></div>
    : <form className="form-horizontal well"
        onSubmit={(e) => {
          e.preventDefault()
          console.log(e.target[0].value);
          onSend(e.target[0].value, e.target[1].value)
        }}
      >
        <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
                <h4>Compose Message</h4>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="subject" className="col-sm-2 control-label">
                Subject
            </label>
            <div className="col-sm-8">
                <input type="text"
                    className="form-control"
                    id="subject"
                    placeholder="Enter a subject"
                    name="subject"></input>
            </div>
        </div>
        <div className="form-group">
            <label htmlFor="body" className="col-sm-2 control-label">
                Body
            </label>
            <div className="col-sm-8">
                <textarea
                    className="form-control"
                    id="body"
                    name="body"></textarea>
            </div>
        </div>
        <div className="form-group">
            <div className="col-sm-8 col-sm-offset-2">
                <input
                type="submit"
                value="Send"
                className="btn btn-primary"></input>
            </div>
        </div>
    </form>
)

export default ComposeForm
