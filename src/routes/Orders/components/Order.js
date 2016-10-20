import React, {Component} from 'react'
import { OrderTab } from 'components/TopTab'
import { Link } from 'react-router'
import { Pagination } from 'antd'
import { SearchInput } from 'components/Ant'
import './Order.scss'
import tempImg from '../assets/temp.png'
import { Icon, Tooltip, Table, DatePicker, Spin } from 'antd'
import TableMinWidth from 'components/TableMinWidth'


const RangePicker = DatePicker.RangePicker
const columns = [{
  title: '阶段(本／套)',
  dataIndex: 'grade',
}, {
  title: '结算价',
  dataIndex: 'price',
}, {
  title: '阶段数量',
  dataIndex: 'gradeNum',
}];

const data = [{
  key: '1',
  grade: '1-20',
  price: '￥40.00',
  gradeNum: '2',
}, {
  key: '2',
  grade: '1-20',
  price: '￥40.00',
  gradeNum: '2',
}, {
  key: '3',
  grade: '1-20',
  price: '￥40.00',
  gradeNum: '2',
}];

class Order extends Component {

  componentDidMount () {
    this.props.fetchAllData()
  }

  render () {

    const { order, changePage } = this.props
    const { list, page, per_page } = this.props.order

    return (
      <div>
        <OrderTab />
        <div className='table-con'>
          <div className='order-search'>
            <div className='order-search-input'>
              <SearchInput placeholder='订单号／收货人姓名／收货人手机号／用户名／用户手机／书名' style={{ width: 500 }} />
            </div>
            <RangePicker style={{ width: 246 }} />
            <span className='order-export'>导出Excel</span>
          </div>
          { list ?
            <div className='ant-table order-table clearfix'>
              <table>
                <tbody>
                <tr>
                  <th width="193">童书名称</th>
                  <th width="76">单价</th>
                  <th width="76">数量</th>
                  <th width="145">奖励</th>
                  <th width="145">阅读家庭</th>
                  <th width="94">总付款</th>
                  <th width="135">总奖励</th>
                  <th width="145">收件人</th>
                  <th width="90">订单状态</th>
                  <th width="120" style={{"textAlign":"right"}}>操作</th>
                </tr>

                { list.map((item, index) =>
                  <OrderItem {...this.props} key={index} data={item}  />
                )}

                {/*<tr className='order-tr more-tr'>
                  <td className='bl br' colSpan='4'>
                    <a>加载更多商品</a>
                  </td>
                </tr>*/}
                </tbody>
              </table>
              <div className='order-pagination'>
                {list ?
                  <Pagination total={list.total_count} current={page} pageSize={per_page} onShowSizeChange={changePage}
                              onChange={changePage} showSizeChanger={true} showQuickJumper={true}/>
                  :
                  null
                }
              </div>
            </div> :
            <Spin />
          }
        </div>
      </div>
    )
  }
}

const OrderItem = ( {data} ) => (
  <tr>
    <td colSpan='10' className='nopadding'>
      <table className="order-item">
        <tbody>
          <tr>
            <td className='order-top'>
              <div>
                <span className='time'>{data.order_time}</span>
                <span className='number'>订单号: {data.order_sn}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td className="order-bottom nopadding">
              <table>
                <tbody>
                <tr className='order-tr'>
                  <td width="510" className="goods-list nopadding">
                    { data.books.map((item, index) =>
                        <table key={index}>
                          <tbody>
                          <tr>
                            <td width="200" className='bl bb'>
                              <img className='order-img' src={item.goods_thumb} />
                              <span className='order-name'>{item.goods_name}</span>
                            </td>
                            <td width="80" className='bb'>￥{item.goods_price}</td>
                            <td width="80" className='bb'>{item.goods_number}</td>
                            <td width="150" className='bb br'>
                              <div className='detail-tips'>
                                <span className='reward'>￥{item.total_reward} <span className='color8d'>(预计)</span><Icon type='down' /></span>
                                <div className='box'>
                                  <Table columns={columns} dataSource={item.reward_list} pagination={false} bordered={false} />
                                  {item.reward_list.goods_number}
                                </div>
                              </div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                    )}
                  </td>
                  <td width="150" className='br'>
                    <p class='color8d'>{data.user_name}<br/>{data.user_mobile}</p>
                  </td>
                  <td width="100" className='br'>￥{data.goods_amount}</td>
                  <td width="140" className='br'>{data.total_reward} <span className='color8d'>(预计)</span></td>
                  <td width="150" className='br'>
                    <p>{data.consignee}<br/>{data.consignee_mobile}</p>
                  </td>
                  <td width="100" className='br' >{data.order_status}</td>
                  <td width="130" className='br' style={{"textAlign":"right"}}>
                    <Link to='/order/unpaid/detail' activeClassName='tab-active'>订单详情</Link><br/>
                    <Link to='/order/unpaid/detail' activeClassName='tab-active'>修改订单</Link>
                  </td>
                </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </td>
  </tr>
)

export default TableMinWidth({
  width: 1300
})(Order)
