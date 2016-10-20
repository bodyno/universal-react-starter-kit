import React, {Component} from 'react'
import './Agreement.scss'
import NoSideLayout from 'components/NoSideLayout'
import Identity from './Identity'

export default class Agreement extends Component {
  render() {
    return (
      <div className='agree-container'>
        <NoSideLayout>
          <div className='agree-con'>
            <div className='content'>
              <div className='border-top'></div>
              <div className='inner'>
                <div className='title1'>
                  孩宝童书馆管理中心改版升级，正式更名为“<span>孩宝U站</span>”，为您提供更加全面的童书馆管理及阅读服务管理服务。
                </div>
                <div className='title2'>为了共建更加美好的孩宝小镇，请您认真阅读并逐条确认以下服务声明，开启<span>孩宝U站</span>。</div>
                <div className='title3'>孩宝小镇阅读推广人服务声明</div>
                <div className='title4'>为更好地维护童书出版行业秩序，保护消费者（读者）合法权益，请您理解并承诺： </div>
                <div className='item'>
                  <div className='agree-check active'></div><em>1.</em>您尊重他人合法拥有的知识产权，如您在其他平台开设店铺，并且将孩宝小镇的产品（如书籍、图片、文案、音频、视频、课程内容等）上架到其他平台销售、使用，那么您须要谨慎审查其他平台产品或服务的合规性，不得推广、销售盗版书籍、打印版书籍、无授权点读书、无授权点读笔等非法出版物；
                </div>
                <div className='item'>
                  <div className='agree-check active'></div><em>2.</em>您在推广原则范围内使用孩宝小镇提供的产品或服务，不得以孩宝小镇提供的正版产品或合法服务的名义向读者（推广受众）提供非法产品或服务；不得盗印孩宝小镇所售图书或销售盗印的孩宝小镇所售图书；
                </div>
                <div className='item'>
                  <div className='agree-check active'></div><em>3.</em>您若发现盗版侵权线索，应及时向孩宝小镇提供。孩宝小镇发现盗版侵权线索需您协助的，您应积极协助孩宝小镇制止和打击盗版侵权；
                </div>
                <div className='item'>
                  <div className='agree-check'></div><em>4.</em>您不得以任何形式的不正当手段侵犯孩宝小镇或孩宝小镇其他推广人的合法权益。为公平维护各阅读推广人利益，童书馆内所有商品的零售价格、团购价格均已经统一，若您对价格有更合理建议的，您需与孩宝小镇协商并经孩宝小镇同意方可重新定价。
                </div>
                <div className='item'>
                  <div className='agree-check'></div><em>5.</em>您有义务积极推广自己的童书馆。如果您的童书馆自开馆一个月内（30天）未有推广行为的记录，孩宝小镇有权收回童书馆的使用权。如果您的童书馆连续三个月（90天）未有推广行为的记录，孩宝小镇有权收回童书馆的使用权。（推广行为的记录特指：童书馆内订单数据、会员访问童书馆的访问数据、推广人组织会员参加阅读活动的数据和推广人通过微信、微博、QQ等第三方平台推广童书馆的操作行为等。）
                </div>
                <div className='title5'>
                  一旦发现您有违反上述服务声明的重大事由之一的，孩宝小镇有权终止合作，并按法律规定、服务声明约定解决相关后续事宜。
                </div>
                <div className='agree-btn-group'>
                  <div className='agree-info'>请逐条核对协议条款。</div>
                  <div className='agree-btn'>同意</div>
                </div>
              </div>
            </div>
          </div>
        </NoSideLayout>
        <Identity />
      </div>
    )
  }
}
