import React from 'react'

export default class Toolbar extends React.Component {

  addLabelToSelected = (ev) => {
      if(ev.target.value !== "Apply label") {
        let label = ev.target.value
        this.props.addLabel(label)
        ev.target.value = "Apply label"
      }
    }

  removeLabelFromSelected = (ev) => {
      if(ev.target.value !== "Apply label") {
        let label = ev.target.value
        this.props.removeLabel(label)
        ev.target.value = "Remove label"
      }
    }

  render() {
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">2</span>
            unread messages
          </p>

          <button className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={ () => {this.props.onSelectAll(this.props.messages.selected)}}>
            <i className="fa fa-square-o" ></i>
          </button>

          <button className="btn btn-default" onClick={() => {this.props.markRead(this.props.messages.selected)}} >Mark As Read</button>

          <button className="btn btn-default" onClick={() => {this.props.markUnread(this.props.messages.selected)}}>Mark As Unread</button>

          <select className="form-control label-select" onChange={this.addLabelToSelected}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" onChange={this.removeLabelFromSelected}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
