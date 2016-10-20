import React, {Component} from 'react'
import './Guide.scss'
import { TopTabSetting } from 'components/TopTab'
import post from '../assets/video.png'

import { Card, Icon, Button, Modal, Spin } from 'antd'

export default class GuideView extends Component {
  constructor() {
    super();
  }

  componentDidMount () {
    if (this.props.guide.data) return
    this.props.requestGuideData()
  }

  render () {
    const { guide: {data} } = this.props

    return (
      <div>
        <TopTabSetting />
        <div className="guide-box clearfix">
        { data ?
          data.map((item, index) => (
            <VideoItem {...this.props} key={index} data={item} />
            )) :
          <spinItem />
        }
        </div>
      </div>
    )
  }
}

class VideoItem extends Component {
    render() {
      //TODO 视频时长没有返回
      //播放第一个视频
      const { data, setShowVideo } = this.props
      const { showVideo } = this.props.guide

      const handleCancel = () => {
        const myVideo = document.getElementById("video1")
        myVideo.currentTime=0
        myVideo.pause()
        this.props.setShowVideo(false)
      }

      return (
        <Card style={{ width: 294 }} bordered={false} onClick={setShowVideo.bind(this, true)}>
          <div className="custom-image">
            <img alt="example" width="100%" src={data.video_image} />
            <span className="time">1:00:06</span>
          </div>
          <div className="custom-card">
            <h3>{data.title}</h3>
            <p>发布时间：{data.pub_time}</p>
          </div>
          {/*设置我的童书馆*/}
          <Modal onCancel={handleCancel}
                 title="设置我的童书馆"
                 width="750px"
                 wrapClassName="vertical-center-modal confr-modal guide-modal"
                 visible={showVideo}
                 onOk={handleCancel}
                 okText="关闭"
          >
            <video id="video1" src={data.video_url} controls autoPlay></video>
          </Modal>
        </Card>
      )
    }
}

const spinItem = () => {
  <div className="spin-box">
    <Spin />
  </div>
}
