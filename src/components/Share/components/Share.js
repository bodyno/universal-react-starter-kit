import React, {Component} from 'react'
import './Share.scss'
import Clipboard from 'clipboard'
import { Popover, Button, Tooltip } from 'antd'

var clipboard

export default class Share extends Component {

  componentDidMount () {
    clipboard = new Clipboard('#copy-icon')
    clipboard.on('success', function(e) {
      e.clearSelection()
      setTimeout(function () {
        document.querySelector('.share-pop').classList.add('ant-popover-hidden')
      }, 1000)
    })
  }

  componentWillUnmount () {
    clipboard.destroy()
  }

  render () {
    const { showShare, showMore } = this.props.share

    return (
      <div>
        { showShare ?
          <ShareCon {...this.props} /> : ''
        }
        { showMore ?
          <MoreSize {...this.props} /> : ''
        }
      </div>
    )
  }
}

class ShareCon extends Component {

  shareQQ = () => {
    const data = this.getInfo()
    window.open(`http://connect.qq.com/widget/shareqq/index.html?url=${data.url}&showcount=0&desc=${data.info}&title=${data.title}&site=baobaobooks`)
    window.open(`http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Fwww.jiathis.com%2Fgetcode%2Ftool%23jtss-cqq&showcount=0&desc=%E5%B7%A5%E5%85%B7%E5%BC%8F+-+%E5%88%86%E4%BA%AB%E4%BB%A3%E7%A0%81+-+JiaThis%E6%8F%90%E4%BE%9B%E4%B8%93%E4%B8%9A%E7%9A%84%E5%88%86%E4%BA%AB%E6%8C%89%E9%92%AE%E4%BB%A3%E7%A0%81%E5%8F%8A%E7%B2%BE%E5%87%86%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%E6%9C%8D%E5%8A%A1%EF%BC%8C%E9%80%9A%E8%BF%87%E8%AE%BF%E5%AE%A2%E4%B8%8D%E6%96%AD%E7%9A%84%E5%88%86%E4%BA%AB%E8%A1%8C%E4%B8%BA%EF%BC%8C%E6%9D%A5%E6%8F%90%E5%8D%87%E7%BD%91%E7%AB%99%E7%9A%84%E4%BC%98%E8%B4%A8%E5%A4%96%E9%93%BE%E3%80%81%E5%A2%9E%E5%8A%A0%E7%A4%BE%E4%BC%9A%E5%8C%96%E6%B5%81%E9%87%8F%E3%80%81%E5%B8%A6%E6%9D%A5%E6%9B%B4%E5%A4%9A%E7%9A%84%E7%94%A8%E6%88%B7%EF%BC%81&summary=%E5%B7%A5%E5%85%B7%E5%BC%8F+-+%E5%88%86%E4%BA%AB%E4%BB%A3%E7%A0%81+-+JiaThis%E6%8F%90%E4%BE%9B%E4%B8%93%E4%B8%9A%E7%9A%84%E5%88%86%E4%BA%AB%E6%8C%89%E9%92%AE%E4%BB%A3%E7%A0%81%E5%8F%8A%E7%B2%BE%E5%87%86%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%E6%9C%8D%E5%8A%A1%EF%BC%8C%E9%80%9A%E8%BF%87%E8%AE%BF%E5%AE%A2%E4%B8%8D%E6%96%AD%E7%9A%84%E5%88%86%E4%BA%AB%E8%A1%8C%E4%B8%BA%EF%BC%8C%E6%9D%A5%E6%8F%90%E5%8D%87%E7%BD%91%E7%AB%99%E7%9A%84%E4%BC%98%E8%B4%A8%E5%A4%96%E9%93%BE%E3%80%81%E5%A2%9E%E5%8A%A0%E7%A4%BE%E4%BC%9A%E5%8C%96%E6%B5%81%E9%87%8F%E3%80%81%E5%B8%A6%E6%9D%A5%E6%9B%B4%E5%A4%9A%E7%9A%84%E7%94%A8%E6%88%B7%EF%BC%81&title=%E5%B7%A5%E5%85%B7%E5%BC%8F+-+%E5%88%86%E4%BA%AB%E4%BB%A3%E7%A0%81+-+JiaThis&site=jiathis&pics=`)
  }

  shareWeibo = () => {
    const data = this.getInfo()
    window.open(`http://service.weibo.com/share/share.php?title=${data.info}&url=${data.url}&source=bookmark&appkey=2992571369&pic=&ralateUid=`)
  }

  shareSpace = () => {
    const data = this.getInfo()
    window.open(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${data.url}&title=${data.title}&pics=&summary${data.info}`)
  }

  getInfo = () => {
    if (this.props.share.custom) {
      const { url, title } = this.props.share

      return {
        url: encodeURIComponent(url),
        info: encodeURIComponent(`分享我的书单：${title}`),
        title: encodeURIComponent('分享我的书单'),
      }
    } else {
      const { core } = this.props
      const { urls: {store_url}, store_info } = core

      return {
        url: encodeURIComponent(store_url),
        info: encodeURIComponent(`分享我的童书馆：${store_info.name}`),
        title: encodeURIComponent('分享我的童书馆'),
      }
    }
  }

  render () {

    const { core } = this.props
    let { urls: {store_url} } = core
    let title = '分享童书馆'
    const { custom } = this.props.share

    if (custom) {
      title = '分享书单'
      store_url = this.props.share.url
    }

    const closeShareHandle = () => {
      this.props.setShowShare(false)
    }

    const showMoreHandle = () => {
      this.props.setShowMore(true)
    }

    const qrcodeUrl = `http://qr.liantu.com/api.php?text=${encodeURIComponent(store_url)}`

    return (
      <div>
        <div className='mask' onClick={closeShareHandle}></div>
        <div className='modal-con modal-con-piece'>
          <div onClick={closeShareHandle} className='close-con'>
            <i className='anticon anticon-cross'></i>
          </div>
          <div className='title'>{title}</div>
          <div className='title-sub'>打开手机扫一扫下方二维码进行分享，或直接分享</div>
          <div className='image'>
            <img src={qrcodeUrl} height='145' />
            { custom ?
              <span></span> :
              <span onClick={showMoreHandle}>下载更多尺寸</span>
            }
          </div>
          <div className='share-icon'>
            <Tooltip title="扫描上方二维码进行分享" placement="top">
              <i className='iconfont icon-weixin'></i>
            </Tooltip>
            <i className='iconfont icon-qq' onClick={this.shareQQ}></i>
            <i className='iconfont icon-weibo' onClick={this.shareWeibo}></i>
            <i className='iconfont icon-qqkongjian' onClick={this.shareSpace}></i>
          </div>
          <div className='share-text'>您也可以复制链接进行分享：</div>
          <div className='share-copy'>
            <div id='share-text'>{store_url}</div>
            <Popover content='复制成功' trigger='click' placement='bottom' overlayClassName='share-pop'>
              <div id='copy-icon' data-clipboard-target='#share-text' className='iconfont icon-copy2'></div>
            </Popover>
          </div>
        </div>
      </div>
    )
  }
}

class MoreSize extends Component {
  render () {
    const closeMoreHandle = () => {
      this.props.setShowMore(false)
    }
    return (
    <div>
      <div className='mask' onClick={closeMoreHandle}></div>
      <div className='modal-con modal-more-con'>
        <div className='header'>
          <div className='header-title'>更多尺寸</div>
          <div onClick={closeMoreHandle} className='close-con'>
            <i className='anticon anticon-cross'></i>
          </div>
        </div>
        <div className='more-table-con'>
          <table className='more-table' cellSpacing='0'>
            <tbody>
            <tr>
              <th>二维码边长(cm)</th>
              <th>建议扫描距离(米)</th>
              <th>点击下载</th>
            </tr>
            <tr>
              <td>8cm</td>
              <td>0.5m</td>
              {/* TODO store-id */}
              <td><a href="/restapi/open/misc/store/31170/qrcode?size=1&type=download" className='iconfont icon-ordinarydownload'></a></td>
            </tr>
            <tr>
              <td>12cm</td>
              <td>0.8m</td>
              <td><a href="/restapi/open/misc/store/31170/qrcode?size=2&type=download" className='iconfont icon-ordinarydownload'></a></td>
            </tr>
            <tr>
              <td>15cm</td>
              <td>1m</td>
              <td><a href="/restapi/open/misc/store/31170/qrcode?size=3&type=download" className='iconfont icon-ordinarydownload'></a></td>
            </tr>
            <tr>
              <td>30cm</td>
              <td>1.5m</td>
              <td><a href="/restapi/open/misc/store/31170/qrcode?size=4&type=download" className='iconfont icon-ordinarydownload'></a></td>
            </tr>
            <tr>
              <td>50cm</td>
              <td>2.5m</td>
              <td><a href="/restapi/open/misc/store/31170/qrcode?size=5&type=download" className='iconfont icon-ordinarydownload'></a></td>
            </tr>
            </tbody>
          </table>
        </div>
        <div className='footer'>
          <Button onClick={closeMoreHandle} type='primary' className='btn blue'>关闭</Button>
        </div>
      </div>
    </div>
    )
  }
}
