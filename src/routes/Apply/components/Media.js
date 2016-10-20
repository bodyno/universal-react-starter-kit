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
          <div className="name">自媒体平台信息<span>*</span></div>
          <div className="ele">
            <span className="help-text">（至少填一项）</span>

            <p>公众号ID</p>
            <Input style={{width: 380}} />

            <p>QQ群</p>
            <Input style={{width: 380}} />

            <p>电台、微博、博客、淘宝、微店等链接</p>
            <Input style={{width: 380}} />

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

      </div>
    )

  }

}
