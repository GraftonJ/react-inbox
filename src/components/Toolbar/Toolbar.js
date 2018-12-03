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
            <span className="badge badge">{this.props.numberUnread}</span>
            unread messages
          </p>

          <button className="btn btn-danger"
            onClick={(e) => {
               e.preventDefault()
               console.log("COMPOSE CLICK");
              {this.props.onCompose()}}
            }
          >
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={ () => {this.props.onSelectAll(this.props.selected)}}>
            <i className={`fa ${this.props.selected === 0
              ? "fa-square-o"
              : this.props.unselected === 0
              ? "fa-check-square-o"
              : "fa-plus-square-o"}`}></i>
          </button>

          <button className="btn btn-default"
            disabled={this.props.selected ? false : true }
            onClick={() => {this.props.markRead(this.props.messages.selected)}}>Mark As Read</button>

          <button className="btn btn-default"
          disabled={this.props.selected ? false : true }
          onClick={() => {this.props.markUnread(this.props.messages.selected)}}>Mark As Unread</button>

          <select className="form-control label-select"
          disabled={this.props.selected ? false : true }
          onChange={this.addLabelToSelected}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select"
          disabled={this.props.selected ? false : true } onChange={this.removeLabelFromSelected}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default"
          disabled={this.props.selected ? false : true }
          onClick={this.props.onDelete}
          >
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}
