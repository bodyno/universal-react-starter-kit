import React, {Component} from 'react'
import './CustomAdd.scss'
import { Button, Switch, Popconfirm, notification, Spin } from 'antd'
import BreadCrumb from 'components/BreadCrumb'
import BookList from 'components/BookList'
import Sortable from 'plugin/sortable'
import { getLenth, setSubString } from 'components/String'
import animatedScrollTo from 'animated-scrollto'

export default class CustomAddView extends Component {

  componentDidMount () {
    this.initData()
    this.uploadImageEventInit()
    this.props.getImageList()
  }

  initData () {
    if (this.props.params.id) {
      this.props.initData(this.props.params.id)
    } else {
      this.props.initData()
    }
  }

  uploadImageEventInit () {
    const { uploadImage } = this.props
    document.getElementById('file').onchange = function (e) {
      const file = e.target.files[0]
      let formData = new FormData()
      formData.append('avatar', file)
      uploadImage(formData)
      e.target.value = ''
    }
  }

  render () {

    const { preview, showBooks, showAddBooks } = this.props.customAdd
    const { setShowBooks, setTitle, setTitleError, setDesc, addSubBook, saveList } = this.props
    const { router } = this.context

    const { id, fetchComplete } = this.props.customAdd
    let show = false
    if (!id) show = true
    if (id && fetchComplete) show = true

    const saveListHandle = () => {
      saveList()
      router.push('/custom/list')
      notification.success({
        message: '保存成功',
        description: '保存成功，可继续添加或修改',
      })
    }

    const changeTitle = (e) => {
      const value = e.target.value
      if (getLenth(value) > 24) {
        setTitleError(true)
      } else {
        setTitleError(false)
      }
      setTitle(setSubString(value, 24))
    }

    const blurTitle = (e) => {
      const value = e.target.value
      e.target.value = setSubString(value, 24)
      setTitleError(false)
    }

    const changeDesc = (e) => {
      const value = e.target.value
      setDesc(value)
    }

    const upload = () => {
      document.getElementById('file').click()
    }

    return (
      <div>
        { show ?
          <div>
            <div className='c-title'>自定义书单</div>
            <BreadCrumb to='/custom' menu1='自定义书单' menu2='添加书单' />
            <div className='page-con'>
              <div className='c-con clearfix'>
                <div className='c-left'>
                  <Emulate {...this.props} />
                </div>
                <div className='c-right'>
                  { !showAddBooks ?
                    <AddCate {...this.props} changeTitle={changeTitle} blurTitle={blurTitle} changeDesc={changeDesc} upload={upload} /> :
                    <AddBooksCon {...this.props} />
                  }
                </div>
              </div>
              <div className="c-btn-group-con">
                <div className='c-btn-group'>
                  <Button type='primary' className='btn blue mr12' onClick={saveListHandle}>保存</Button>
                  <Button onClick={this.props.setPreview.bind(this, true)} type='primary' className='btn gray'>预览</Button>
                </div>
              </div>
            </div>
          </div> : ''
        }
        { preview ?
          <Preview {...this.props} /> : ''
        }
        { showBooks ?
          <BookCon close={setShowBooks.bind(this, false)} addSubBook={addSubBook} /> : ''
        }
        <input type='file' id='file' style={{display: 'none'}} />
      </div>
    )
  }
}

CustomAddView.contextTypes = {
  router: React.PropTypes.object.isRequired
}

const BookCon = ({close, addSubBook}) => (
  <div>
    <div className='mask preview-mask' onClick={close}></div>
    <div className='mask-con-books'>
      <div className='mask-top'>
        <div className='title'>全部童书</div>
        <div onClick={close} className='close-con'>
          <i className='anticon anticon-cross'></i>
        </div>
      </div>
      <div className='mask-content'>
        <BookList portion={true} addSubBook={addSubBook} />
      </div>
    </div>
  </div>
)

class AddCate extends Component {
  render () {
    const { imageList, selectImage, title, showTitleError, desc } = this.props.customAdd
    const { setSelectImage, changeTitle, blurTitle, changeDesc, upload, deleteImg } = this.props

    return (
      <div>
        <div className='c-group'>
          <div className='title'>书单名称</div>
          <input type='text' value={title} onChange={changeTitle} onBlur={blurTitle} />
          <div className='clearfix'>
            { showTitleError ?
              <div className='text-error'>字数超过上限</div> : ''
            }
            <div className='text-info'>字数不超过12个汉字或24个字母</div>
          </div>
        </div>
        <div className='c-group'>
          <div className='title'>简要描述</div>
          <div className='area-con'>
            <textarea placeholder='请输入对书单的描述（选填）' rows='4' value={desc} onChange={changeDesc}></textarea>
            <div className='area-num'>
              <span className={ desc.length > 300 ? 'over' : '' }>{desc.length}</span>/300
            </div>
          </div>
        </div>
        <div className='c-group'>
          <div className='title title2'>广告图</div>
          { imageList.length ?
            <div className='c-image-con'>
              { imageList.map((item, index) =>
                <div key={index} className={ selectImage && selectImage.id == item.id ? 'c-ad-img select' : 'c-ad-img'}>
                  <div className='c-ad-img-inner' onClick={setSelectImage.bind(this, item.id)}>
                    <img src={item.path} width='230' height='108' />
                    { item.user_template ?
                      <i className='iconfont icon-delete' onClick={deleteImg.bind(this, item.id)}></i> : ''
                    }
                  </div>
                </div>
              )}
            </div> :
            <Spin />
          }
          <div className='clearfix'>
            <div className='c-btn-define' onClick={upload}><i className='anticon anticon-plus'></i>自定义广告图</div>
            <div className='c-size-text'>（不可大于5M，推荐尺寸：750*320）</div>
          </div>
        </div>
      </div>
    )
  }
}

class AddBooksCon extends Component {

  componentDidMount () {
    const { sortBook } = this.props
    const el = document.getElementById('c-books-con')
    Sortable.create(el, {
      onEnd: function () {
        const result = [].map.call(document.getElementsByClassName('c-book'), (item) => {
          return item.getAttribute('data-id')
        })
        sortBook(result)
      }
    })
  }

  render () {

    const { setShowBooks, setSubTitleError, setSubTitle, setShowSubTitle, deleteBook } = this.props
    const { showSubTitleError } = this.props.customAdd
    const { subTitle, showSubTitle, subBooks } = this.props.nowDir

    const changeSubTitle = (e) => {
      const value = e.target.value
      if (getLenth(value) > 24) {
        setSubTitleError(true)
      } else {
        setSubTitleError(false)
      }
      setSubTitle(setSubString(value, 24))
    }

    const blurTitle = (e) => {
      const value = e.target.value
      e.target.value = setSubString(value, 24)
      setSubTitleError(false)
    }

    return (
      <div>
        <div className='c-group'>
          <div className='title'>
            <span className='c-switch-margin'>目录</span>
            <Switch defaultChecked={showSubTitle} checked={showSubTitle} size='small' onChange={setShowSubTitle} />
          </div>
          <input type='text' value={subTitle} onBlur={blurTitle} onChange={changeSubTitle} />
          <div className='clearfix'>
            { showSubTitleError ?
              <div className='text-error'>字数超过上限</div> : ''
            }
            <div className='text-info'>字数不超过12个汉字或24个字母</div>
          </div>
        </div>
        <div className='c-group'>
          <div className='title'>童书</div>
          <div className='c-books-container'>
            <div className='c-books-con clearfix'>
              <div id='c-books-con'>
                { subBooks.map((item, index) =>
                  <Book {...item} key={index} deleteBook={deleteBook} />
                )}
              </div>
              <div className='c-books-add' onClick={setShowBooks.bind(this, true)}>添加童书</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const Book = ({img, deleteBook, goods_id}) => (
  <div className='c-book' data-id={goods_id}>
    <img src={img} width='120' />
    <i className='iconfont icon-delete' onClick={deleteBook.bind(this, goods_id)}></i>
  </div>
)

class Preview extends Component {
  render () {

    return (
      <div>
        <div className='mask preview-mask' onClick={this.props.setPreview.bind(this, false)}></div>
        <div className='mask-con'>
          <div className='preview-phone'>
            <div className='preview-phone-top'></div>
            <div className='preview-name'>XXX的童书馆</div>
            <div className='iframe-con'>
              <div className='iframe'>
                <EmulateContent {...this.props} />
              </div>
            </div>
          </div>
          <div className='preview-quit-con'>
            <div onClick={this.props.setPreview.bind(this, false)} className='preview-quit'>退出预览</div>
          </div>
        </div>
      </div>
    )
  }
}

class Emulate extends Component {
  render () {
    return (
      <div className='emulate'>
        <div className='emulate-top'></div>
        <div className='emulate-title'>咿呀咿呀童书馆</div>
        <EmulateContent {...this.props} />
        <div className='emulate-footer'></div>
      </div>
    )
  }
}

class EmulateContent extends Component {

  changeDesc = () => {
    const { setShowAddBooks } = this.props
    setShowAddBooks(false)
    animatedScrollTo(document.getElementById('emulate'), 0, 500)
  }

  addDir = () => {
    const { setShowAddBooks, addNewDir } = this.props
    setShowAddBooks(true)
    addNewDir()
    animatedScrollTo(document.getElementById('emulate'), 200, 500)
  }

  render () {

    const { showAddBooks, title, desc, selectImage, submenu, selectDirIndex } = this.props.customAdd
    const { showSubTitle, subTitle, subBooks } = this.props.nowDir
    const { changeDirIndex, deleteDir, sortDir, setShowAddBooks } = this.props

    return (
      <div className='emulate-con' id='emulate'>
        <div className='emulate'>
          <div className={ showAddBooks ? '' : 'emulate-active' } onClick={this.changeDesc}>
            { selectImage ?
              <div>
                <img src={selectImage.path} className='emulate-image' />
              </div>
              :
              <div className='emulate-ad-img'>广告图</div>
            }
            <div className='emulate-ad-name'>{ title ? title : '书单名称' }</div>
            <div className={ desc ? 'emulate-ad-desc' : 'emulate-ad-desc emulate-ad-center' }>{desc ? desc : '简要描述'}</div>
          </div>
          <div className='emulate-buy'>购买本书单所有图书</div>
          <div className='emulate-info emulate-info-top clearfix'>
            <div className='image'></div>
            <div className='name'>
              <div className='title'>咿呀咿呀童书馆</div>
              <div className='contact'><i className='contact-icon'></i>联系卖家</div>
            </div>
            <div className='into'>进入店铺</div>
          </div>
          <div className='emulate-spa'></div>
          { submenu.map((item, index) => (
            <BookDetail {...item} showAddBooks={showAddBooks} key={item.id} number={index} max={submenu.length} index={item.id} selectDirIndex={selectDirIndex} changeDirIndex={changeDirIndex} setShowAddBooks={setShowAddBooks} deleteDir={deleteDir.bind(this, index)} sortDir={sortDir} />
          ))}
          <div className='emulate-add-con'>
            <div className='emulate-add' onClick={this.addDir}>添加目录或童书</div>
          </div>
        </div>
      </div>
    )
  }
}

class BookDetail extends Component {
  render () {

    const { setShowAddBooks, showAddBooks, changeDirIndex, subTitle, showSubTitle, subBooks, index, selectDirIndex, number, max, deleteDir, sortDir } = this.props

    const changeDirIndexHandle = (index) => {
      if (!showAddBooks) {
        setShowAddBooks(true)
      }
      if (index == selectDirIndex) return
      changeDirIndex(index)
    }

    return (
      <div className={ (showAddBooks && index == selectDirIndex) ? 'emulate-active' : ''} onClick={changeDirIndexHandle.bind(this, index)}>
        { index == selectDirIndex ?
          <div className='dir-sort'>
            { number == 0 ?
              <div className='dir-op-item dir-up'><i className='anticon anticon-arrow-up'></i></div>
              :
              <div className='dir-op-item dir-up active' onClick={sortDir.bind(this, number, index, 'up')}><i className='anticon anticon-arrow-up'></i></div>
            }
            { number == (max - 1) ?
              <div className='dir-op-item dir-down'><i className='anticon anticon-arrow-down'></i></div>
              :
              <div className='dir-op-item dir-down active' onClick={sortDir.bind(this, number, index, 'down')}><i className='anticon anticon-arrow-down'></i></div>
            }
            <Popconfirm title="确定要删除这个目录吗？" onConfirm={deleteDir} okText="确定" cancelText="取消">
              <div className='dir-op-item dir-delete active'><i className='anticon anticon-delete'></i></div>
            </Popconfirm>
          </div> : ''
        }
        <div>
          { showSubTitle ?
            <div className='emulate-dir'>
              <div className='text'>
                <span>{ subTitle ? subTitle : '目录' }</span>
              </div>
            </div> : ''
          }
          <div className='emulate-book-container'>
            <div className='emulate-book-con clearfix'>
              { subBooks.length ?
                subBooks.map((item, index) =>
                  <div className='emulate-real-book' key={index}>
                    <img className='image' src={item.img} />
                    <div className='con'>
                      <div className='title'>{item.goods_name}</div>
                      <div className='price'>{item.shop_price}</div>
                      <div className='icon'></div>
                    </div>
                  </div>
                ) :
                <div>
                  <div className='emulate-book'>童书</div>
                  <div className='emulate-book'>童书</div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className='emulate-buy-con'>
          <div className='emulate-buy emulate-buy2'>一键购买</div>
        </div>
      </div>
    )
  }
}
