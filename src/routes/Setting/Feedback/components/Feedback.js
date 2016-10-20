import React, {Component} from 'react'
import './Feedback.scss'
import { TopTabSetting } from 'components/TopTab'

import { Upload, Icon, Modal, Button, Input, message } from 'antd'

let imageW = []

export default class FeedbackView extends Component {

  constructor () {
    super();
  }

  render () {
    const { postFeedback, setPreviewImage, deleteImageChange } = this.props
    const { data, visible, bigImageIndex } = this.props.feedback

    //上传图片
    const imgUpload = () => {
      document.getElementById('file').click()
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
          if(this.props.feedback.data.length < 3) {
            if(parseInt(file.size)/1000000 < 5) {
              fData.append('avatar', file)
              this.props.uploadImageChange(fData)
              document.getElementById('file').value = ''
            } else {
              message.error("图片尺寸要小于 5M")
            }
          } else {
            document.getElementsByClassName("ant-upload-select")[0].style.display = "none"
          }

        }.bind(this)

        image.src = data;
        imageW.push(image.width)

      }.bind(this)
      reader.readAsDataURL(file);
    }
    const UploadImgItem = ({index, data, width}) => (
      <div class="ant-upload-list-item ant-upload-list-item-done">
        <div class="ant-upload-list-item-info">
          <a class="ant-upload-list-item-thumbnail">
            <img src={data} />
          </a>
          <i class="anticon anticon-eye-o" onClick={setPreviewImage.bind(this, true, index)}></i>
          <i class="anticon anticon-delete" onClick={deleteImageChange.bind(this, index)}></i>
        </div>
      </div>
    )
    //计算字数
    const countTxtNum = (e) => {
      let o = e.target
      let curNum = o.parentNode.nextSibling.firstChild
      let maxNum = o.parentNode.nextSibling.lastChild

      curNum.textContent = o.value.length

      if(o.value.length > parseInt(maxNum.textContent)) {

        o.value = o.value.substring(0, parseInt(maxNum.textContent))

        message.error("最多只能输入" + o.value.length + "字")

        curNum.textContent = maxNum.textContent
      }
    }

    //提交反馈
    const postFeedbackCheck = ({data}) => {
      let o = document.getElementById("feedbackTxt")

      if(o.value.length > 0) {
        postFeedback(o.value, data)
        message.success("提交成功，我们会尽快处理您的反馈，感谢您对我们的关注与重视")
        o.value = ""
      } else {
        message.error("反馈内容不能为空")
      }
    }

    return (
      <div>
        <TopTabSetting />
        <div className="feedback-box">
          <h3 className="tit">您的意见和想法对我们非常重要！</h3>
          <div className="textarea-count">
            <Input id="feedbackTxt" type="textarea" rows={9} placeholder="请提出您宝贵的意见" onKeyUp={countTxtNum} />
            <div className="counter">
              <span className="curr-num">0</span>/
              <span>1200</span>
            </div>
          </div>
          <div className="img-upload">
            <p className="rule">文件大小不超过5M，最多上传3张</p>
            <div className="clearfix">
              {data.length ?
                <div class="ant-upload-list ant-upload-list-picture-card">
                  { data.map((item, index) => (
                      <UploadImgItem {...this.props} key={index} data={item} index={index}  />
                    ))
                  }
                </div>
                :
                null
              }
              <div className="ant-upload ant-upload-select ant-upload-select-picture-card" style={data.length == 3 ? {display:"none"} : {display:"inline-block"}} onClick={imgUpload.bind(this)}>
                <span className="rc-upload">
                  <i className="anticon anticon-plus"></i>
                  <div className="ant-upload-text">上传照片</div>
                </span>
              </div>
            </div>
          </div>
          <Button type="primary" size="large" onClick={postFeedbackCheck.bind(this)}>提交</Button>
          <input type="file" id="file" name="fileLogo" className="hide" onChange={imgUploadChange} />
        </div>
        <Modal
          title="图片预览"
          width={imageW[bigImageIndex]}
          wrapClassName="preview-image"
          visible={visible}
          onCancel={setPreviewImage.bind(this, false, "")}
          footer={[]}
        >
          <div className="wrap">
            <img className="image" src={data[bigImageIndex]} />
          </div>
        </Modal>
      </div>
    )
  }
}
