import React, {Component} from 'react'
import Helmet from 'react-helmet'
import './Zen.scss'

export default class Zen extends Component {

  componentDidMount () {
    if (this.props.zen.text.length) return
    this.props.fetchZen()
  }

  renderLoading () {
    return (this.props.zen.fetching)
      ? <div className='loader'>加载中...</div>
      : ''
  }

  render () {
    const { fetchZen, clearZen, zen } = this.props
    const { fetching, text } = zen
    console.log(this.props)

    return (
      <div>
        <Helmet title='Zen' />
        <div>
          <button className='btn btn-default' onClick={fetchZen}>
            {fetching ? 'Fetching...' : 'Fetch'}
          </button>
          &nbsp;&nbsp;
          <button className='btn btn-default' onClick={clearZen}>Clear</button>
        </div>
        {this.renderLoading()}
        <div>
          { text.map((item, index) =>
              <h1 className='sb' key={index}>{item.text}</h1>
          )}
        </div>
      </div>
    )
  }
}

Zen.propTypes = {
  zen: React.PropTypes.object.isRequired
}
