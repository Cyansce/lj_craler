import http from './index'

export async function getHouseTypes() {
  const url = '/home'
  return http.get(url).then(res => {
    return res.data
  })
}

export async function getRegion() {
  const url = '/region'
  return http.get(url).then(res => {
    return res.data
  })
}

export async function chengjiao(condition) {
  const url = '/chengjiao?condition=' + condition
  return http.get(url).then(res => {
    return res.data
  })
}

