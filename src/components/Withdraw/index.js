import React, {Component} from 'react'
import { Button } from 'antd'
import './withdraw.scss'

export default class extends Component {

  close = () => {
    this.props.changeMaskHandle(false)
  }

  change = (type, e) => {
    this.props.valueChange(type, e.target.value)
  }

  applyValid = () => {
    const { apply_money } = this.props.withdraw.account
    const money = Number(this.refs.money.value)
    if (!money || isNaN(money)) {
      this.error('请输入正确的金额')
      return false
    }
    if (money < 100) {
      this.error('提取金额金额不得小于100')
      return false
    }
    if (money > apply_money) {
      this.error('提取金额不得超过账号余额')
      return false
    }

    const code = Number(this.refs.code.value)
    if (!code || isNaN(code)) {
      this.error('请输入正确的验证码')
      return false
    }

    return true
  }

  error = (message) => {
    notification.warning({
      message: '信息填写有误',
      description: message
    })
  }

  apply = () => {
    if (!this.applyValid()) return


    const { applyRequest } = this.props
    const { apply } = this.props.withdraw
    let data = {
      money: this.refs.money.value,
      verify_code: this.refs.code.value
    }
    if (apply.is_first_apply) {
      data.account = this.refs.account.value
      data.account_name = this.refs.account_name.value
    } else {
      data.account = this.refs.account.value
      data.account_name = this.refs.account_name.value
    }
    applyRequest(data)
  }

  sendCode = () => {
    this.props.sendCode()
  }

  edit = (e) => {
    const parent = e.target.parentElement
    parent.style.display = 'none'
    parent.nextSibling.style.display = 'block'
  }

  hide = (flag, type ,e) => {
    const value = this.refs[type].value
    const parent = e.target.parentElement
    parent.style.display = 'none'
    parent.previousSibling.style.display = 'block'
    if (!value) {
      this.error('请输入正确的收款人信息')
      return false
    }
    if (flag) {
      this.props.saveAccount(type, value)
    }
  }

  render () {

    const { mask, apply, code_text, account, code_status } = this.props.withdraw

    return (
      <div>
        <div className='mask preview-mask'></div>
        <div className='mask-withdraw'>
          <div className='title'>
            <div className='text'>申请提现</div>
            <div className="close-con" onClick={this.close}><i className="anticon anticon-cross"></i></div>
          </div>
          { mask == 1 ?
            <div className='not-enough'>
              <div className='text-con'>
                <div className='text'>账户余额大于¥100时才可提现哦，继续努力</div>
              </div>
            </div> :''
          }
          { (mask == 2 && !apply.phone) ?
            <div className='cant'>
              <div className='cant-img'></div>
              <div className='text'>
                您的童书馆还没有绑定手机号码，<br />
                请进入用户中心绑定手机号码后再进行提现
              </div>
              <div className='center'>
                <Button type='primary' className='btn blue'>用户中心</Button>
              </div>
            </div> :''
          }
          { mask == 3 ?
            <div className='done'>
              <div className='done-img'></div>
              <div className='text'>申请已提交</div>
              <div>
                3个工作日内到账<br />
                我们会以短信的方式通知您，请耐心等待
              </div>
            </div> :''
          }
          { mask == 4 ?
            <div className='form'>
              <div className='group'>
                <div className='text'>余额：</div>
                <div className='value'>{account.balance}元</div>
              </div>
              <div className='group'>
                <div className='text'>支付方式：</div>
                <div className='value'>
                  <div className='zhifubao'></div>
                  支付宝
                </div>
              </div>
              <div className='group'>
                <div className='text'>收款人账户：</div>
                { apply.is_first_apply ?
                  <div>
                    <input placeholder='请输入您的支付宝账户' ref='account' />
                  </div> :
                  <div>
                    <div className='value'>
                      {apply.account}
                      <span className='edit' onClick={this.edit}>修改</span>
                    </div>
                    <div className='value value-change'>
                      <input className='long-width' defaultValue={apply.account} onChange={this.change.bind(this, 'account')} ref='account' />
                      <span className='edit' onClick={this.hide.bind(this, true, 'account')}>确定</span>
                      <span className='edit2' onClick={this.hide.bind(this, false, 'account')}>取消</span>
                    </div>
                  </div>
                }
              </div>
              <div className='group'>
                <div className='text'>收款人姓名：</div>
                { apply.is_first_apply ?
                  <div>
                    <input placeholder='请输入您的支付宝账户' ref='account_name' />
                  </div> :
                  <div>
                    <div className='value'>
                      {apply.account_name}
                      <span className='edit' onClick={this.edit}>修改</span>
                    </div>
                    <div className='value value-change'>
                      <input className='long-width' value={apply.account_name} onChange={this.change.bind(this, 'account_name')} ref='account_name' />
                      <span className='edit' onClick={this.hide.bind(this, true, 'account_name')}>确定</span>
                      <span className='edit2' onClick={this.hide.bind(this, false, 'account_name')}>取消</span>
                    </div>
                  </div>
                }
              </div>
              <div className='group'>
                <div className='text'>提取金额：</div>
                <div className='value'>
                  <input placeholder='输入金额' ref='money'/><span className='ml'>元</span>
                </div>
              </div>
              <div className='group'>
                <div className='text'>手机验证：</div>
                <div className='value'>
                  <input placeholder='请输入验证码' ref='code' />
                  { code_status ?
                    <Button className='code' id='code' onClick={this.sendCode}>{code_text}</Button> :
                    <Button className='code' id='code' disabled>{code_text}</Button>
                  }
                </div>
              </div>
              <div className='group group-text'>
                验证短信将发送到您绑定的手机：{`${apply.phone.slice(0,2)}****${apply.phone.slice(7)}`}，请注意查收
              </div>
              <div className='group'>
                <div className='text'>到账时间：</div>
                <div className='value red'>{apply.date_account}</div>
              </div>
              <div className='btn-group'>
                <Button type='primary' className='btn blue' onClick={this.apply}>提交</Button>
                <Button type='primary' className='btn white' onClick={this.close}>取消</Button>
              </div>
            </div> :''
          }

        </div>
      </div>
    )
  }
}
