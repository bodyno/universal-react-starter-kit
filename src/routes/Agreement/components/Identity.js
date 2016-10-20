import React, {Component} from 'react'
import IdentityCon from 'components/Identity'

export default class Identity extends Component {

  hide = () => {
    this.refs.modal.style.display = 'none'
  }

  render () {
    return (
      <div ref='modal'>
        <div className='mask' onClick={this.hide}></div>
        <div className='identity-con'>
          <div className='title1'>为了更好地了解您并给您提供更优质的服务，请完善以下信息</div>
          <div className='title2'>请选择您的身份角色：</div>
          <div className='aggree-identity'>
            <IdentityCon />
          </div>
          <div className='agree-info'>您必须要选择一个身份</div>
          <div className='btn-ok'>确定</div>
        </div>
      </div>
    )
  }
}
