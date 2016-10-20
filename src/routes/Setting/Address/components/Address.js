import React, {Component} from 'react'
import './Address.scss'
import { TopTabSetting } from 'components/TopTab'
import { Link } from 'react-router'
import BreadCrumb from 'components/BreadCrumb'
import { Modal, Button } from 'antd'
const confirm = Modal.confirm

var clickListener
var marker
var timer

export default class Address extends Component {

  componentDidMount () {
    this.loadScript(this.initMap())
    this.initEvent()
    if (this.props.address.data) return
    this.props.requestCurAddress()
  }

  initEvent () {
    const {putCurAddress} = this.props

    document.getElementById('address-set').addEventListener('click', function(e) {
      if(document.getElementById('address-text-info')) {
        var addTxt = document.getElementById('address-text-info').textContent
      } else {
        var addTxt = ""
      }

      if (e.target.getAttribute('id') == 'button-address') {
        confirm({
          title: '确定把以下地址设为你的位置吗？',
          content: addTxt,
          onOk() {
            putCurAddress(addTxt)
            //alert('ok')
          },
          onCancel() {
            alert('okok')
          },
        });
      }
    })

    document.getElementById('address-set').addEventListener('click', function(e) {
      if (e.target.getAttribute('id') == 'address-update') {
        document.getElementById('address-info').style.display = 'none'
        document.getElementsByClassName('address-edit')[0].style.display = 'block'
        document.getElementById('address-edit-input').value = document.getElementById('address-text-info').textContent
      }
    })

    document.getElementById('address-set').addEventListener('click', function(e) {
      if (e.target.getAttribute('id') == 'btn-address-ok') {
        document.getElementById('address-info').style.display = 'block'
        document.getElementsByClassName('address-edit')[0].style.display = 'none'
        document.getElementById('address-text-info').textContent = document.getElementById('address-edit-input').value
      }
    })

  }

  loadScript (cb) {
    var script = document.createElement('script')
    script.src = 'https://webapi.amap.com/maps?v=1.3&key=aceb76e5d3cde5535f3e63d5b63f8950&plugin=AMap.Geocoder'
    document.body.appendChild(script)
    script.onload = function () {
      timer = setInterval(function () {
        if (AMap) {
          cb()
          clearInterval(timer)
        }
      }, 100)
    }
  }

  initMap () {
    return () => {

      var contextMenuPositon

      var map = new AMap.Map('map',{
        resizeEnable: true
      })
      var contextMenu = new AMap.ContextMenu()
      AMap.plugin(['AMap.Autocomplete','AMap.PlaceSearch'],function(){
        var autoOptions = {
          city: "",
          input: "map-search"
        };
        var autocomplete= new AMap.Autocomplete(autoOptions)
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 1,
          pageIndex: 1,
          city: '',
          map: map
        })
        AMap.event.addListener(autocomplete, "select", function(e){
          placeSearch.search(e.poi.name)
          var position = e.poi.location
          showMarker(position)
          showInfo(position)
        })

        document.getElementById('search-btn').onclick = function(e) {
          placeSearch.search(e.target.previousSibling.value)
        }
      });

      var geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });

      function showMarker(position) {
        marker = new AMap.Marker({
          position : position,
          map : map,
          draggable: true,
          cursor: 'move',
          raiseOnDrag: true
        })

        AMap.event.addListener(marker, 'click', function() {
          showInfo(position)
        })
        AMap.event.addListener(marker, 'dragstart', function() {
          document.getElementsByClassName('amap-info-close')[0].click()
        })
        AMap.event.addListener(marker, 'dragend', function(e) {
          showInfo(e.lnglat)
        })
      }

      function showInfo (position) {
        geocoder.getAddress(position, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            var addressText = result.regeocode.formattedAddress

            var content = []
            content.push("<div id='address-info'><div class='address-text'><span id='address-text-info'>"+ addressText +"</span><span id='address-update'>更正信息</span></div><div class='button-address' id='button-address'>设为我的位置</div></div>")
            content.push("<div class='address-edit clearfix'><input type='text' id='address-edit-input' /><div id='btn-address-ok'>确定</div></div>")
            var infoWindow = new AMap.InfoWindow({
              content: content.join("<br/>"),
              offset: new AMap.Pixel(0, -30)
            });

            infoWindow.open(map, marker.getPosition())
          }
        })
      }

      var ele = document.getElementsByClassName('amap-logo')[0]
      ele.parentNode.removeChild(ele)

      ele = document.getElementsByClassName('amap-copyright')[0]
      ele.parentNode.removeChild(ele)

      // 标注
      document.getElementById('mark-address').onclick = function(e) {

        var ele = e.target

        if (e.target.classList.contains('active')) {
          map.setDefaultCursor("pointer")
        } else {
          map.setDefaultCursor("crosshair")
        }
        e.target.classList.toggle('active')

        clickListener = AMap.event.addListener(map, "click", function(e) {
          marker && map.remove(marker)

          var position = e.lnglat
          showMarker(position)



          showInfo(position)

          map.setDefaultCursor("pointer")
          ele.classList.toggle('active')
          AMap.event.removeListener(clickListener)

        })

      }



    }
  }

  render () {
    const {data} = this.props.address

    const full = (e) => {
      const con = document.getElementsByClassName('map-con')[0]
      if (con.classList.contains('full')) {
        e.target.lastChild.textContent = '全屏'
      } else {
        e.target.lastChild.textContent = '退出全屏'
      }
      con.classList.toggle('full')
    }

    return (
      <div id='address-set'>
        <TopTabSetting {...this.props} />
        <BreadCrumb to='/setting' menu1='童书馆设置' menu2='设置详细地理位置' />
        <div className="page-con">
          { data ?
            <div className='address-now'>
              <span>当前位置：</span>
              <i className='iconfont icon-room'></i>{data.address == '' ? '无' : data.address}
            </div>
            : null
          }
          <div className='address-search'>
            <span>搜索位置：</span>
            <input type="text" id='map-search' />
            <div className='map-button' id='search-btn'>搜索</div>
          </div>
          <div className='map-con'>
            <div className='map-op clearfix'>
              <div onClick={full} className='map-op-item'><i className='iconfont icon-zoomoutmap'></i><span>全屏</span></div>
              <div id='mark-address' className='map-op-item'><i className='iconfont icon-room'></i>手动标记</div>
            </div>
            <div id="map"></div>
          </div>
        </div>
      </div>
    )
  }
}
