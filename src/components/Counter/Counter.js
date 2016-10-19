import React from 'react'
import Helmet from 'react-helmet'
import './Counter.scss'

export const Counter = (props) => (
  <div>
    <Helmet title='Counter' />
    <h2 className='counterContainer'>
      Counter:
      {' '}
      <span>
        {props.counter}
      </span>
    </h2>
    <button className='btn btn-default' onClick={props.increment}>
      Increment
    </button>
    {' '}
    <button className='btn btn-default' onClick={props.doubleAsync}>
      Double (Async)
    </button>
  </div>
)

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired
}

export default Counter
