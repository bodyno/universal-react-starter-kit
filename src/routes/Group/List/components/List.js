import React, {Component} from 'react'
import { Link } from 'react-router'
import './List.scss'
import { TopGroup } from 'components/TopTab'
import { SearchInput } from 'components/Ant'

import { Table, Button, Tooltip, Popover, Modal, InputNumber, Select } from 'antd'
const Option = Select.Option;

export default class List extends Component {

  render (){

    // const state = this.props
    // state.runingEdit= true
    //
    //
    // const handleOk = ()=>{
    //   state.runingEdit = false
    // }
    //
    // const handleCancel = ()=>{
    //   state.runingEdit = false
    // }

    return(
      <div>
        <TopGroup />

        <div className='p-con clearfix'>
          <div className="clearfix">
            <SearchInput placeholder="童书名称" onSearch={value => console.log(value)} style={{ width: 300 ,paddingBottom:'30px' }} />
          </div>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />

        </div>

        <Modal title="修改团购" okText="提交" >
          <div className="p-modal-con">
            <p>商品正在团购中...<br /><span className="gray">您的本次团购还可申请700本，团购天数已达到5天不可延长</span></p>
            <p>
              <span>申请数量</span>
              <InputNumber min={1} max={10} defaultValue={1} /></p>
            <p>
              <span>延长天数</span>
              <Select defaultValue="one" style={{ width: 120 }}>
                <Option value="one">1天</Option>
                <Option value="two">2天</Option>
                <Option value="three">3天</Option>
              </Select>
            </p>
          </div>
        </Modal>

      </div>
    )

  }

}

const content = (
  <div>
    <p>分享商品</p>
    <p>分享文章</p>
  </div>
);

const test = ()=>{
  console.log(1)
}

const Card = ()=>(
  <div className="card">
    <div className="headimg" style={{backgroundImage:'url(http://img2.imgtn.bdimg.com/it/u=2730523809,2825683527&fm=206&gp=0.jpg)'}}>
      <div className="tag tag-runing">进行中</div>
    </div>
    <div className="card-padding">
      <div className="tit">英国进口 独家授权！全世界独一无二的公主 TheLittle Princess's Big Books...</div>
      <div className="price"><span>团购价:</span>￥258.00</div>
      <div className="price"><span>当前结算价:</span>￥258.00</div>
      <div className="price"><span>下一阶段结算价:</span>￥258.00</div>
    </div>

    <StatusRuning />

    <div className="card-bottom">
      <div className="right">
        <Tooltip title="推荐到首页" placement="bottom">
          <i className="iconfont icon-tuangoudingdan"></i>
        </Tooltip>
        <Tooltip title="推荐到首页" placement="bottom">
          <i className="iconfont icon-article"></i>
        </Tooltip>
        <Popover content={content} trigger="click" placement="bottom" onVisibleChange={test}>
          <Tooltip title="推荐到首页" placement="bottom">
            <i className="iconfont icon-share"></i>
          </Tooltip>
        </Popover>

      </div>
    </div>
  </div>
)

// 团购进行中
const StatusRuning = ()=>(
  <div>
    <div className="card-info">
      <span className="red" style={{float:'left'}}>3天19时54分49秒</span>
      <Link to='/group/detail/1' activeClassName='tab-active'>
        <span className="blue" style={{float:'right'}}>已售70件</span>
      </Link>
    </div>
    <div className="card-btn">
      <Button size="large" type="ghost" style={{float:'left'}} onClick={runingEdit}>修改</Button>
      <Button size="large" type="ghost" style={{float:'right'}}>结束</Button>
    </div>
  </div>
)

const runingEdit = ()=>{

}

// 即将开团
const StatusStart = ()=>(
  <div>
    <div className="card-info">
      <span className="red">2016-06-01 9:00 开团</span>
    </div>
    <div className="card-btn">
      <Button size="large" type="ghost" style={{width:'120px'}}>取消</Button>
    </div>
  </div>
)

// 团购未通过
const StatusFail = ()=>(
  <div>
    <div className="card-info">
      <span style={{float:'left'}}><i class="anticon anticon-exclamation-circle"></i>团购申请未通过</span>
      <Popover content={content} trigger="hover" placement="bottomLeft">
        <span className="blue" style={{float:'right'}}>查看原因 ∨</span>
      </Popover>
    </div>
    <div className="card-btn">
      <Button size="large" type="primary" style={{float:'left'}}>重新申请</Button>
      <Button size="large" type="ghost" style={{float:'right'}}>取消</Button>
    </div>
  </div>
)

// 审核中
const StatusAudit = ()=>(
  <div>
    <div className="card-info">
      <span className="yellow">您申请的团购正在审核中</span>
    </div>
    <div className="card-btn">
      <Button size="large" type="primary" style={{float:'left'}}>修改</Button>
      <Button size="large" type="ghost" style={{float:'right'}}>取消</Button>
    </div>
  </div>
)
