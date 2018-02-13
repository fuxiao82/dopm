import {restAjax} from './restAjax'
const memberId = '123'

const api = {
  getWebPageList({page = 1}) {
    return restAjax({
      url: '/webpage/webpagelist',
      data: {
        memberId: memberId,
        pageNum: page,
        size: 30
      }
    })
  },

  getWebPageDetail(id) {
    return restAjax({
      url: '/webpage/webpagedetail',
      data: {
        id: id
      }
    })
  },

  addWebPage(url){
    return restAjax({
      url: '/webpage/addwebpage',
      data: {
        memberId: memberId,
        url: url
      }
    })
  },

  saveScore({id, score}){
    return restAjax({
      url: '/webpage/markwebpage',
      data: {
        id: id,
        score: score
      }
    })
  },

  addTag({id, name}) {
    return restAjax({
      url: '/webpage/addtag',
      data: {
        id: id,
        name: name
      }
    })
  },

  deleteTag({id, tagId}) {
    return restAjax({
      url: '/webpage/deletetag',
      data: {
        id: id,
        tagId: tagId
      }
    })
  }

}

export default api

