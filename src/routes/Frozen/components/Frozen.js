import React, {Component} from 'react'
import './Frozen.scss'
import frozenImg from '../assets/frozen.png'
import NoSideLayout from 'components/NoSideLayout'

export default class Frozen extends Component {

  render () {
    return (
      <div className='frozen-con'>
        <NoSideLayout {...this.props}>
          <div className='content'>
            <div className='inner'>
              <img src={frozenImg} height='292' />
              <div className='text1'>哎呀！您的帐号冻结了！</div>
              <div className='text2'>可能的原因是文字占位，请及时联系客服。</div>
              <div className='qq-con'>
                <div className='qq'>QQ交谈</div>
              </div>
              <div className='phone'>客服电话：0755-29485501</div>
            </div>
          </div>
        </NoSideLayout>
      </div>
    )
  }
}
