import React, {Component} from 'react'
import './Identity.scss'

export default class Identity extends Component {
  render () {
    return (
      <div className="role clearfix">
        <div className="role-itme active">
          <div className="teacher"></div>
          <p>教师</p>
        </div>
        <div className="role-itme">
          <div className="media"></div>
          <p>自媒体</p>
        </div>
        <div className="role-itme">
          <div className="organization"></div>
          <p>机构</p>
        </div>
      </div>
    )
  }
}
