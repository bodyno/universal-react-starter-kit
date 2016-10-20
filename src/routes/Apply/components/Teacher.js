import React, {Component} from 'react'
import './Apply.scss'

import { Button, Input, Select, Radio } from 'antd'
const Option = Select.Option;
const RadioGroup = Radio.Group;

const selectBefore = (
  <Select defaultValue="Http://" style={{ width: 120 }}>
    <Option value="中国大陆 86">中国大陆 +86</Option>
    <Option value="Https://">Https://</Option>
    <Option value="Https1://">Https1://</Option>
  </Select>
);

export default class Media extends Component {
  render (){

    return(
      <div className="apply-form">
        <div className="itme">
          <div className="name">教师资格证<span>*</span></div>
          <div className="ele">
            <Button type="primary" size="large">本地上传图片</Button>
            <span className="help-text">（格式为jpg,png,bmp,gif,大小不超过5MB）</span>
          </div>
        </div>
        <div className="itme">
          <div className="name">手机号码<span>*</span></div>
          <div className="ele">
              <div style={{ width: 300 ,verticalAlign : 'middle', display:'inline-block'}}>
                <Input addonBefore={selectBefore} placeholder="请输入手机号码" />
              </div>
              <p className="help-text">为了您的提现操作更加便捷，请绑定手机号</p>
              <Input placeholder="短信验证码" style={{width: 100}} /> <Button type="primary" size="large">获取验证码</Button>
          </div>
        </div>
        <div className="itme">
          <div className="name">所在地址<span>*</span></div>
          <div className="ele">
            <p>当前位置: <i className="iconfont icon-room"></i></p>
            <p>具体位置: </p>

            <p>是否有线下实体机构</p>
            <RadioGroup>
              <Radio key="a" value={1}>是</Radio>
              <Radio key="b" value={2}>否</Radio>
            </RadioGroup>

            <p>是否可以组织线下活动</p>
            <RadioGroup>
              <Radio key="a" value={1}>线上</Radio>
              <Radio key="b" value={2}>线下</Radio>
              <Radio key="c" value={3}>都可以</Radio>
            </RadioGroup>

            <p>是否在其他平台开设线上店铺</p>
            <RadioGroup>
              <Radio key="a" value={1}>是</Radio>
              <Radio key="b" value={2}>否</Radio>
            </RadioGroup>

            <p>平台名称</p>
            <RadioGroup>
              <Radio key="a" value={1}>淘宝／天猫</Radio>
              <Radio key="b" value={2}>京东</Radio>
              <Radio key="c" value={3}>有赞</Radio>
              <Radio key="d" value={4}>微店</Radio>
              <Radio key="e" value={5}>其他</Radio>
            </RadioGroup>

            <p>店铺地址</p>
            <Input style={{width: 380}} />

            <p>是否可以做内容分享<span className="help-text">（如果您有能力并且有意愿，孩宝将邀请您组织线下活动、微课分享、录制课程、文章投稿等）</span></p>
            <RadioGroup>
              <Radio key="a" value={1}>是</Radio>
              <Radio key="b" value={2}>否</Radio>
            </RadioGroup>

            <p>讲师链接</p>
            <Input style={{width: 380}} />

            <p>服务阅读家庭的渠道<span className="help-text">（多选）</span></p>
            <RadioGroup>
              <Radio key="a" value={1}>机构</Radio>
              <Radio key="b" value={2}>微信群</Radio>
              <Radio key="c" value={3}>QQ群</Radio>
              <Radio key="d" value={4}>朋友圈</Radio>
              <Radio key="e" value={5}>爱阅帮</Radio>
              <Radio key="f" value={6}>微信公众号</Radio>
              <Radio key="g" value={7}>其他</Radio>
            </RadioGroup>

            <p>您服务的阅读家庭宝宝年龄<span className="help-text">（多选）</span></p>
            <RadioGroup>
              <Radio key="a" value={1}>0-3</Radio>
              <Radio key="b" value={2}>3-6</Radio>
              <Radio key="c" value={3}>6-9</Radio>
              <Radio key="d" value={4}>9+</Radio>
            </RadioGroup>

            <p>
              <Button type="primary" size="large">提交</Button>
            </p>
          </div>
        </div>
      </div>
    )

  }

}
