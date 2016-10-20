import React, {Component} from 'react'
import './Setting.scss'
import { TopTabSetting } from 'components/TopTab'
import ShareCon from 'components/Share'
import { Link } from 'react-router'
import { Form, message, Upload, Modal, Icon, Button, Radio, Switch, Input, Table, Spin } from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let uploadType

export default class SettingView extends Component {
  componentDidMount () {
    this.props.requestSettingData()
    this.props.requestQrStore()
  }

  render () {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };

    //取童书馆数据、修改童书馆名称、下载童书馆二维码、修改童书馆简介、修改客服电话、修改 QQ 号
    const { setting: {data}, setShowEditName, setShowEditIntro, setShowEditPhone, setShowEditQQ } = this.props
    const { showEditName, showEditIntro, showEditPhone, showEditQQ, qrStore } = this.props.setting

    //修改用户名
    const putStoreName = () => {
      if (checkUserName()) {
        this.props.putSettingData(document.getElementById('storeName').value, "store_name")
      } else {
        return false
      }

    }
    const cancelStoreName = () => {
      let o = document.getElementById("storeName")

      this.props.setShowEditName(false)
      o.value = data.store_name
      correctClass(o, "字数不超过12个汉字或36个字母")
    }
    //TODO: 童书馆二维码接口还没返回正确的值
    //修改简介
    const putStoreDesc = () => {
      this.props.putSettingData(document.getElementById('storeDesc').value, "store_desc")
    }
    const cancelStoreDesc = () => {
      this.props.setShowEditIntro(false)
      document.getElementById("storeDesc").value = data.store_desc
    }
    //修改电话
    const putContactPhone = () => {
      if(checkPhone()) {
        this.props.putSettingData(document.getElementById('contactPhone').value, "phone")
      } else {
        return false
      }
    }
    const cancelContactPhone = () => {
      let o = document.getElementById("contactPhone")

      this.props.setShowEditPhone(false)
      o.value = data.phone
      correctClass(o, "如果是固定电话，请完整填写区号。例如“0755-12345678”")
    }
    //修改 QQ 号
    const putContactQQ = () => {
      if(checkQQ()) {
        this.props.putSettingData(document.getElementById('contactQQ').value, "contact_qq")
      } else {
        return false
      }
    }
    const cancelContactQQ = () => {
      let o = document.getElementById("contactQQ")

      this.props.setShowEditQQ(false)
      o.value = data.contact_qq
      correctClass(o, "当前设置的QQ号将用于您童书馆的联系方式之一")
    }
    //是否显示阅读专栏
    const readingSwitch = () => {
      let obj = document.getElementById("showReading")
      let data

      if(obj.getAttribute("data-val") == 1) {
        obj.setAttribute("data-val", 0)
        data = 0
      } else {
        obj.setAttribute("data-val", 1)
        data = 1
      }

      this.props.putSettingData(data, "show_reading")
    }
    //是否显示新书推荐
    const newBookSwitch = () => {
      let obj = document.getElementById("showNewBook")
      let data

      if(obj.getAttribute("data-val") == 1) {
        obj.setAttribute("data-val", 0)
        data = 0
      } else {
        obj.setAttribute("data-val", 1)
        data = 1
      }

      this.props.putSettingData(data, "show_new_book")
    }

    //童书馆名称格式判断
    const checkUserName = () => {
      let flag = 1
      let o = document.getElementById("storeName")
      let v = document.getElementById("storeName").value
      //[\u4e00-\u9fa5]为汉字的unicode编码，/i表示匹配的时候不区分大小写。
      let rx = /[a-z]/i,
          rxnum = /[0-9]/,
          rxcn = /[\u4e00-\u9fa5]/,
          num = 0,
          chr;

      for (let i = 0, j = v.length; i < j; i++) {
        chr = v.charAt(i);

        if (rx.test(chr)) num += 1;
        else if (rxcn.test(chr)) num += 3;
        else {
          flag=3;
          break;
        }

      }
      if (flag != 3) {
        if (num > 36) {
          errorClass(o, "字数不超过12个汉字或36个字母")
          return false;
        }
        else if (num < 1) {
          errorClass(o, "不能为空")
          return false;
        }
        correctClass(o, "字数不超过12个汉字或36个字母")
        return true;
      }
      else {
        if (rxnum.test(chr)) {
          errorClass(o, "不能包含数字")
          return false;
        } else {
          errorClass(o, "不能包含特殊符号")
          return false;
        }
      }
    }
    //客服电话格式判断
    const checkPhone = () => {
      let o = document.getElementById("contactPhone")
      let v = document.getElementById("contactPhone").value
      let phone = /^(\d{3,4}-\d{7,8})$/
      let mobile = /^1[34578]\d{9}$/

      if(!(phone.test(v)) && !(mobile.test(v))) {
        errorClass(o, "手机或固话格式错误")
        return false
      } else {
        correctClass(o, "如果是固定电话，请完整填写区号。例如“0755-12345678”")
        return true
      }
    }
    //QQ号格式判断
    const checkQQ = () => {
      let o = document.getElementById("contactQQ")
      let v = document.getElementById("contactQQ").value

      if(!(/^\d+$/.test(v))) {
        errorClass(o, "QQ号码格式错误")
        return false
      } else {
        correctClass(o, "当前设置的QQ号将用于您童书馆的联系方式之一")
        return true
      }
    }
    //公众号二维码格式判断
    const checkQrWechat = () => {
      let o = document.getElementById("createQrWechat")
      let v = document.getElementById("createQrWechat").value

      console.log(v.indexOf("http://weixin.qq.com"));
      if(v.indexOf("http://weixin.qq.com") < 0) {
        errorClass(o, "微信公众号链接格式错误，请参考格式 http://weixin.qq.com/r/GEw7I0DE7R2SrQRA9xkK")
        return false
      }
      else {
        correctClass(o, "")
        return true
      }
    }
    function errorClass(obj, txt) {
      let o = obj

      o.parentNode.parentNode.className = "ant-form-item-control has-feedback has-error"
      o.parentNode.nextSibling.textContent = txt
    }
    function correctClass(obj, txt) {
      var o = obj

      o.parentNode.parentNode.className = "ant-form-item-control"
      o.parentNode.nextSibling.textContent = txt
    }
    //计算字数
    const countTxtNum = (e) => {
      let o = e.target
      let curNum = o.parentNode.nextSibling.firstChild
      let maxNum = o.parentNode.nextSibling.lastChild

      curNum.textContent = o.value.length

      if(o.value.length > parseInt(maxNum.textContent)) {

        o.value = o.value.substring(0, parseInt(maxNum.textContent))

        message.error("最多只能输入1000字")

        curNum.textContent = maxNum.textContent
      }
    }

    //改变主要联系方式
    const changeContactWay = (e) => {
      this.props.putSettingData(e.target.value, "contact_way")
    }

    //上传图片
    const imgUpload = (type, e) => {
      document.getElementById('file').click()
      uploadType = type
    }
    const imgUploadChange = (e) => {
      let fData = new FormData();
      let file = document.getElementById('file').files[0]
      //上传图片大小限制
      let reader = new FileReader();

      reader.onload = function (e) {
        let data = e.target.result;
        //加载图片获取图片真实宽度和高度
        let image = new Image();

        image.onload = function() {
          if(parseInt(file.size)/1000000 < 5) {
            fData.append('avatar', file)
            this.props.uploadImageChange(fData, uploadType)
            document.getElementById('file').value = ''
          } else {
            message.error("图片尺寸要小于 5M")
          }
        }.bind(this)

        image.src= data;

      }.bind(this)

      reader.readAsDataURL(file);
    }

    //生成二维码
    const createQrWechat = (type, e) => {
      let v = document.getElementById("createQrWechat").value
      if(checkQrWechat()) this.props.requestQrcode(v, type)
      else return false
    }

    return (
      <div>
        <TopTabSetting />
        <ShareCon />
        { data ?
          <div>
            <div className="setting-box clearfix">
              <div className="left">
                <div className="list">
                  <div className="item clearfix">
                    <div className="hd">童书馆名称</div>
                    <div className="bd">{data.store_name}</div>
                    <div className="od"><a onClick={setShowEditName.bind(this, true)}>修改</a></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">童书馆Logo</div>
                    <div className="bd">
                      <img id="logo" className="logo width66" src={data.logo} alt="童书馆Logo" />
                    </div>
                    <div className="od">
                      <a href="javascript:;" onClick={imgUpload.bind(this, 'logo')}>修改Logo</a>
                      <p className="tips">小于5M，建议尺寸300*300</p>
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">童书馆二维码</div>
                    <div className="bd">
                      {Qrcode ? <img id="storeQrCode" className="qrcode width66" src={qrStore.qrcode} alt="童书馆二维码" /> : "无"}
                    </div>
                    <div className="od"><a onClick={() => this.props.setShowMore(true)}>下载更多尺寸</a></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">童书馆招牌</div>
                    <div className="bd">
                      <img id="storeImage" className="signs" src={data.store_image} alt="童书馆招牌" />
                    </div>
                    <div className="od">
                      <a href="javascript:;" onClick={imgUpload.bind(this, 'store_image')}>修改招牌</a>
                      <p className="tips">小于5M，建议尺寸750*326</p>
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">童书馆简介</div>
                    <div className="bd">{data.store_desc ? data.store_desc : "无"}</div>
                    <div className="od"><a href="javascript:;" onClick={setShowEditIntro.bind(this, true)}>修改</a></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">主要联系方式</div>
                    <div className="bd">
                      <RadioGroup id="contactWay" onChange={changeContactWay}>
                        <Radio key="a" value={1} checked={data.contact_way == 1 ? true : false}>客服电话</Radio>
                        <Radio key="b" value={2} checked={data.contact_way == 2 ? true : false}>微信公众号</Radio>
                        <Radio key="c" value={3} checked={data.contact_way == 3 ? true : false}>个人微信</Radio>
                        <Radio key="d" value={4} checked={data.contact_way == 4 ? true : false}>QQ号</Radio>
                      </RadioGroup>
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">客服电话</div>
                    <div className="bd contact-bd hg19">
                      <span>{data.phone}</span> {data.contact_way == 1 ? <i class="iconfont icon-check"></i> : ''}
                    </div>
                    <div className="od"><a href="javascript:;" onClick={setShowEditPhone.bind(this, true)}>修改</a></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">微信公众号</div>
                    <div className="bd contact-bd">
                      {data.contact_wechat ?
                        <img className="qrcode width66" src={data.contact_wechat} alt="微信公众号"/> : "无"
                      }
                      {data.contact_way == 2 ? <i class="iconfont icon-check"></i> : ''}
                    </div>
                    <div className="od">
                      <a href="javascript:;" onClick={imgUpload.bind(this, 'contact_wechat')}>修改二维码</a>
                      <div className="public-link">
                        或
                        <div className="inp-item">
                          <Input id="createQrWechat" type="text" placeholder="输入微信公众号链接" />
                          <div className="ant-form-explain" style={{fontSize:"12px"}}></div>
                        </div>
                        <a href="javascript:;" onClick={createQrWechat.bind(this, 'contact_wechat')}>生成二维码</a>
                      </div>
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">个人微信</div>
                    <div className="bd contact-bd">
                      {data.contact_person_wechat ?
                        <img className="qrcode width66" src={data.contact_person_wechat} alt="个人微信" /> : "无"
                      }
                      {data.contact_way == 3 ? <i class="iconfont icon-check"></i> : ''}
                    </div>
                    <div className="od">
                      <a href="javascript:;" onClick={imgUpload.bind(this, 'contact_person_wechat')}>修改二维码</a>
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">QQ号</div>
                    <div className="bd contact-bd hg19">
                      {data.contact_qq ?
                        <span>{data.contact_qq}</span> : "无"
                      }
                      {data.contact_way == 4 ? <i class="iconfont icon-check"></i> : ''}
                    </div>
                    <div className="od"><a href="javascript:;" onClick={setShowEditQQ.bind(this, true)}>修改</a></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">所在地址</div>
                    <div className="bd">{data.address ? data.address : '无'}</div>
                    <div className="od"><Link to='/setting/address'>设置</Link></div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">阅读专栏</div>
                    <div className="bd">
                      <Switch id="showReading" data-val={data.show_reading} defaultChecked={data.show_reading == '1' ? true : false} onChange={readingSwitch} size="small" />
                    </div>
                  </div>
                  <div className="item clearfix">
                    <div className="hd">新书推荐</div>
                    <div className="bd">
                      <div className="bd">
                        <Switch id="showNewBook" data-val={data.show_new_book} defaultChecked={data.show_new_book == '1' ? true : false} onChange={newBookSwitch} size="small" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right">
                <iframe src="https://shopdev.baobaobooks.net?mobile=mobile" frameBorder="0" width="375" height="584"></iframe>
              </div>
              {/*修改童书馆名称*/}
            </div>
            <Modal
              title="修改童书馆名称"
              wrapClassName="vertical-center-modal"
              visible={showEditName}
              onOk={putStoreName}
              onCancel={cancelStoreName}
            >
              <div className="edit-name">
                <Form horizontal>
                  <FormItem
                    {...formItemLayout}
                    label="童书馆名称："
                    help="字数不超过12个汉字或36个字母"
                  >
                    <Input id="storeName" type="textarea" defaultValue={data.store_name} />
                  </FormItem>
                </Form>
              </div>
            </Modal>
            {/*修改童书馆简介*/}
            <Modal
              title="修改童书馆简介"
              width="656px"
              wrapClassName="vertical-center-modal edit-intro-modal"
              visible={showEditIntro}
              onOk={putStoreDesc}
              onCancel={cancelStoreDesc}
            >
              <div className="edit-intro">
                <label className="tit">请输入童书馆简介：</label>
                <div className="textarea-count">
                  <Input id="storeDesc" type="textarea" rows={6} defaultValue={data.store_desc} onKeyUp={countTxtNum} />
                  <div className="counter">
                    <span id="curNum" className="curr-num">{data.store_desc ? data.store_desc.length : null}</span>/
                    <span id="maxNum">1000</span>
                  </div>
                </div>
              </div>
            </Modal>
            {/*修改客服电话*/}
            <Modal
              title="修改客服电话"
              wrapClassName="vertical-center-modal"
              visible={showEditPhone}
              onOk={putContactPhone}
              onCancel={cancelContactPhone}
            >
              <div className="edit-phone">
                <Form horizontal>
                  <FormItem
                    {...formItemLayout}
                    label="客服电话："
                    help="如果是固定电话，请完整填写区号。例如“0755-12345678”"
                  >
                    <Input id="contactPhone" type="text" placeholder="手机号码或固定电话" defaultValue={data.phone} />
                  </FormItem>
                </Form>
              </div>
            </Modal>
            {/*修改QQ号*/}
            <Modal
              title="修改QQ号"
              wrapClassName="vertical-center-modal"
              visible={showEditQQ}
              onOk={putContactQQ}
              onCancel={cancelContactQQ}
            >
              <div className="edit-qq">
                <Form horizontal>
                  <FormItem
                    {...formItemLayout}
                    label="QQ号："
                    help="当前设置的QQ号将用于您童书馆的联系方式之一"
                  >
                    <Input id="contactQQ" type="text" defaultValue={data.contact_qq} />
                  </FormItem>
                </Form>
              </div>
            </Modal>
            <input type="file" id="file" name="fileLogo" className="hide" onChange={imgUploadChange} />
          </div>:
          <div className="spin-box">
            <Spin />
          </div>
        }
      </div>
    )
  }
}
