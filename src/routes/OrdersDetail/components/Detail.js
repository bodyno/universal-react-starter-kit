import React, { Component } from 'react'
import { OrderTab } from 'components/TopTab'
import './Detail.scss'
import tempImg from '../assets/temp.png'
import BreadCrumb from 'components/BreadCrumb'
import { Icon, Row, Col, Modal, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option
const InputGroup = Input.Group

export default class OrdersDetail extends Component {

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  render () {
    //修改收件信息，修改备注
    const { setShowEditInfo, setShowEditRemark } = this.props
    const { showEditInfo, showEditRemark } = this.props.detail

    const { type } = this.props.params

    function createMarkup() {
      if(type == 'unpaid') {
        return {
          __html: '<i class="anticon anticon-info-circle-o"></i> 订单状态：<span class="font16">待付款</span>'
        };
      }
      else if(type == 'notshipped') {
        return {
          __html: '<i class="anticon anticon-info-circle-o"></i> 订单状态：<span class="font16">待发货</span>'
        };
      }
      else if(type == 'shipped') {
        return {
          __html: '<i class="anticon anticon-info-circle-o"></i> 订单状态：<span class="font16">待收货</span>'
        };
      }
      else if(type == 'completed') {
        return {
          __html: '<i class="anticon anticon-check-circle-o"></i> 订单状态：<span class="font16">交易成功</span>'
        };
      }
      else if(type == 'closed') {
        return {
          __html: '<i class="anticon anticon-exclamation-circle-o"></i> 订单状态：<span class="font16">交易关闭</span>'
        };
      }

    };

    return (
      <div id="orders-detail">
        <OrderTab active={type} />
        <BreadCrumb to="/orders" menu1="全部" menu2="订单详情" />
        <div className="detail-box">
          <div className="status">
            <Row type="flex" justify="center">
              <Col span={4}>
                <div className="txt">下单</div>
                <div className="icon success">
                  <Icon type="check-circle" />
                </div>
                <div className="tips">2016-06-30 09:09:01</div>
              </Col>
              <Col span={4}>
                <div className="txt">货到付款</div>
                <div className="icon success">
                  <Icon type="check-circle" />
                </div>
                <div className="tips">2016-06-30 09:09:01</div>
              </Col>
              <Col span={4}>
                <div className="txt">发货</div>
                <div className="icon">
                  <div className="step">3</div>
                </div>
                <div className="tips"></div>
              </Col>
              <Col span={4}>
                <div className="txt">确认收货</div>
                <div className="icon">
                  <div className="step">4</div>
                </div>
                <div className="tips"></div>
              </Col>
            </Row>
          </div>
          <div className="detail">
            <div className="tit">订单信息</div>
            <Row>
              <Col span={12}>
                <div className="item clearfix">
                  <div className="hd">订单来源：</div>
                  <div className="bd">移动端</div>
                </div>
                <div className="item clearfix">
                  <div className="hd">订单编号：</div>
                  <div className="bd">16215415310321511</div>
                </div>
                <div className="item clearfix">
                  <div className="hd">支付方式：</div>
                  <div className="bd">支付宝</div>
                </div>
                <div className="item clearfix">
                  <div className="hd">买家留言：</div>
                  <div className="bd">请使用顺丰快递</div>
                </div>
                <div className="item clearfix">
                  <div className="hd">收件信息：</div>
                  <div className="bd">Alice，18813845111，广东省 深圳市 宝安区 西乡街道宝源华丰总部经济大厦</div>
                  <a onClick={setShowEditInfo.bind(this, true)}><i className="iconfont icon-edit"></i></a>
                </div>
                <div className="item clearfix">
                  <div className="hd">发票：</div>
                  <div className="bd">增值税纸质发票，深圳市凯迪克文化传播有限公司，图书</div>
                  <a onClick={setShowEditInfo.bind(this, true)}><i className="iconfont icon-edit"></i></a>
                </div>
                <div className="item clearfix">
                  <div className="hd">推广人备注：</div>
                  <div className="bd"><span className="gray">暂无备注，备注是给孩宝客服的留言</span></div>
                  <a onClick={setShowEditRemark.bind(this, true)}><i className="iconfont icon-edit"></i></a>
                </div>
              </Col>
              <Col span={12}>
                <div className="item delivery" dangerouslySetInnerHTML={createMarkup()}>
                </div>
                <div className="item">
                  <span className="name">物流：顺丰快递</span>
                  <span>运单号：156135165103215</span>
                </div>
                <div className="item">
                    <span>2016-06-30 18:09:00</span>
                    <span className="lastly">订单已经拣货完毕，待出库交付顺丰快递</span>
                    <a id="more">
                      <span>更多<Icon type="down" /></span>
                      <DeliveryTimeline />
                    </a>
                </div>
              </Col>
            </Row>

            <DeliveryTable />
          </div>
        </div>
        {/*修改收件信息*/}
        <Modal
          title="修改收件信息"
          wrapClassName="vertical-center-modal edit-intro-modal"
          visible={showEditInfo}
          onOk={setShowEditInfo.bind(this, false)}
          onCancel={setShowEditInfo.bind(this, false)} >
          <div className="edit-info">
            <Form horizontal>
              <FormItem
                id="name"
                label="收件人姓名"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }} >
                <Input id="name" name="name" defaultValue="Alice" />
              </FormItem>

              <FormItem
                label="手机号码"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }} >
                <InputGroup size="large">
                  <Col span="9">
                    <Select id="countryCode" name="countryCode" size="large" defaultValue="中国大陆 +86" onChange={this.handleSelectChange}>
                      <Option value="泰国 +45">泰国 +45</Option>
                      <Option value="泰国 +45">泰国 +45</Option>
                      <Option value="马来西亚 +687">马来西亚 +687</Option>
                    </Select>
                  </Col>
                  <Col span="15">
                    <Input id="mobile" name="mobile" defaultValue="26888888" />
                  </Col>
                </InputGroup>
              </FormItem>

              <FormItem
                id="region"
                label="所在地区"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }} >
                <Select id="region" name="region" size="large" defaultValue="中国 广东省 深圳市" onChange={this.handleSelectChange}>
                  <Option value="新加坡 新加坡">新加坡 新加坡</Option>
                  <Option value="泰国 曼谷">泰国 曼谷</Option>
                  <Option value="马来西亚 马来西亚">马来西亚 马来西亚</Option>
                </Select>
              </FormItem>

              <FormItem
                id="address"
                label="详细地址"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }} >
                <Input type="textarea" id="address" name="address" rows="3" />
              </FormItem>

            </Form>
          </div>
        </Modal>
        {/*修改备注*/}
        <Modal
          title="修改备注"
          wrapClassName="vertical-center-modal edit-intro-modal"
          visible={showEditRemark}
          onOk={setShowEditRemark.bind(this, false)}
          onCancel={setShowEditRemark.bind(this, false)} >
          <div className="edit-remark">
            <label className="tit">请输入备注信息：</label>
            <div className="textarea-count">
              <Input type="textarea" rows={6} />
              <p className="help">追加给孩宝的订单处理或发货的留言</p>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

const DeliveryTable = ()=> (
  <div className="ant-table detail-table">
    <table>
      <tbody>
      <tr>
        <th>童书名称</th>
        <th>阶段(本 / 套)</th>
        <th>阶段数量</th>
        <th>结算价</th>
        <th>奖励</th>
        <th className="last">订单状态</th>
      </tr>
      <tr>
        <td>
          <div className="goods-info clearfix">
            <img className="img" src={tempImg} />
            <div className="txt">
              <div className="name">美国进口 凯迪克奖作品 Zin! A Violin 大家来听音乐会</div>
              <div className="price">￥50.00<span className="num">X 2</span></div>
            </div>
          </div>
        </td>
        <td>1-20</td>
        <td>1</td>
        <td>￥40</td>
        <td>￥10 <span className="gray">(预计)</span></td>
        <td rowSpan="3" className="bl last">待发货</td>
      </tr>
      <tr>
        <td>
          <div className="goods-info clearfix">
            <img className="img" src={tempImg} />
            <div className="txt">
              <div className="name">美国进口 凯迪克奖作品 Zin! A Violin 大家来听音乐会</div>
              <div className="price">￥50.00<span className="num">X 2</span></div>
            </div>
          </div>
        </td>
        <td>1-20</td>
        <td>1</td>
        <td>￥40</td>
        <td>￥10 <span className="gray">(预计)</span></td>
      </tr>
      <tr>
        <td>
          <div className="goods-info clearfix">
            <img className="img" src={tempImg} />
            <div className="txt">
              <div className="name">美国进口 凯迪克奖作品 Zin! A Violin 大家来听音乐会</div>
              <div className="price">￥50.00<span className="num">X 2</span></div>
            </div>
          </div>
        </td>
        <td>1-20</td>
        <td>1</td>
        <td>￥40</td>
        <td>￥10 <span className="gray">(预计)</span></td>
      </tr>
      <tr>
        <td colSpan="6" className="count">
          <div>商品总金额： ￥102.00</div>
          <div>= 订单总金额： ￥102.00</div>
          <div className="mt36">- 支付宝支付：￥102.00</div>
          <div>= 应付款金额： ￥0.00</div>
          <div className="mt36">总奖励： ￥20.00</div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
)

const DeliveryTimeline = ()=> (
  <div class="delivery-detail">
    <ul class="ant-timeline">
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">
            <div class="date">2016-06-30</div>
            22:59:57
          </span>
          您的订单已入库
        </div>
      </li>
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">22:59:57</span>
          您的订单已入库
        </div>
      </li>
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">
            <div class="date">2016-06-30</div>
            22:59:57
          </span>
          包裹已从分拨中心发出
        </div>
      </li>
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">22:59:57</span>
          商家正通知快递公司揽件
        </div>
      </li>
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">22:59:57</span>
          万象物流已接单；联系电话：4008232999
        </div>
      </li>
      <li class="ant-timeline-item">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">22:59:57</span>
          包裹已从宝安站_Z05发出，正在派件中，派件员：符仁成 15219288781 正在派件
        </div>
      </li>
      <li class="ant-timeline-item ant-timeline-item-last">
        <div class="ant-timeline-item-tail"></div>
        <div class="ant-timeline-item-head ant-timeline-item-head-blue"></div>
        <div class="ant-timeline-item-content">
          <span class="time">22:59:57</span>
          包裹签收
        </div>
      </li>
    </ul>
  </div>
)
