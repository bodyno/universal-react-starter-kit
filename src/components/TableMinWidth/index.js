import React, { Component } from "react"

function HOCFactoryFactory(params){
  return ComposedComponent => class extends Component {

    componentDidMount() {
      document.getElementById('main').style.minWidth = `${params.width}px`
    }

    componentWillUnmount() {
      document.getElementById('main').style.minWidth = 'auto'
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
}

export default HOCFactoryFactory
