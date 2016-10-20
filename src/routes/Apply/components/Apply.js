import React, {Component} from 'react'
import './Apply.scss'
import NoSideLayout from 'components/NoSideLayout'
import Identity from 'components/Identity'

import Media from './Media'
import Teacher from './Teacher'
import Organization from './Organization'

export default class Apply extends Component {
  render (){

    return(
      <NoSideLayout>
        <div className="apply-con">
          为了更好地了解您并给您提供更优质的服务，请完善以下信息
          <div className="apply-wrap">
            <Identity />
            <Teacher />
            {/*<Media />*/}
          </div>
        </div>
      </NoSideLayout>
    )

  }

}
