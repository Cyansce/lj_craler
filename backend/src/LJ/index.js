const cheerio = require('cheerio')

const Cookies = [
  ' _smt_uid=5ec63dc2.1e97f6f0',
  ' UM_distinctid=17236614092737-09a2af0348db0b-30617d00-1fa400-17236614093497',
  ' _ga=GA1.2.945169743.1590050245',
  ' Hm_lvt_9152f8221cb6243a53c83b956842be8a=1594537338',
  ' sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22172366143aa7c8-0fec6947a68ea6-30617d00-2073600-172366143ab89%22%2C%22%24device_id%22%3A%22172366143aa7c8-0fec6947a68ea6-30617d00-2073600-172366143ab89%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_referrer%22%3A%22%22%2C%22%24latest_referrer_host%22%3A%22%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_utm_source%22%3A%22baidu%22%2C%22%24latest_utm_medium%22%3A%22pinzhuan%22%2C%22%24latest_utm_campaign%22%3A%22sousuo%22%2C%22%24latest_utm_content%22%3A%22biaotimiaoshu%22%2C%22%24latest_utm_term%22%3A%22biaoti%22%7D%7D',
  ' _gid=GA1.2.1401347152.1594537343',
  ' CNZZDATA1253491255=594035680-1594538732-https%253A%252F%252Fm.lianjia.com%252F%7C1594538732',
  ' CNZZDATA1254525948=899201721-1594539326-https%253A%252F%252Fm.lianjia.com%252F%7C1594539326',
  ' srcid=eyJ0Ijoie1wiZGF0YVwiOlwiMjIyYmQ1MTIzMDVlNzU4NTY2YThiOTkyZjg5MTc0NjZhZmY5YmFjZjZkZWI1OGI5OTY2Mzc2MWI4MmU0YjIwNTY3YmY3NmYwNjRiZTU4NDNjYzA1ZDkyMmE3YWE5MTgxZDhhZDNkOTFhZmNmMmZhNzBmZTQ0Nzc3ZWFmMzgwZGQzMzYzOWRmMjIwNGQ1M2ZiMGQzMDBkOWJmOGVmNTVkOGI2M2YyZDA5YzcwZDExYmY3NDE2MmNhMDFlZDEwZTczYzE2YTM5ZjM2N2IxMDM5ZmFjODdmNWUxZjMwY2Q3N2IzNDJmNmIyZmYzZDU3MWY0YWM4MmU5NDljNGE2MTNhZGU4YTNiYmJjOTFlOTFkMDE1OTQ1NTUxZmUxNzA2OWQ1YjQ2MmZmNTg2OTExYTVmYjUyN2JiY2EzNmU5YzIyNmFiN2JiMTM5MDE0MTFkMmY0ZDQyOTZjMzM3ODc0ODIxZVwiLFwia2V5X2lkXCI6XCIxXCIsXCJzaWduXCI6XCIyNDAwYTc4M1wifSIsInIiOiJodHRwczovL20ubGlhbmppYS5jb20vY3MvZXJzaG91ZmFuZy9pbmRleC8iLCJvcyI6IndlYiIsInYiOiIwLjEifQ==',
  ' Hm_lpvt_9152f8221cb6243a53c83b956842be8a=1594542416',
  'lianjia_uuid=31363758-4bfa-4f6c-b8ca-514e507ad92c',
  ' lianjia_ssid=7950611f-f458-4846-b0c9-66f244515a5a',
  ' select_city=430100'
]
const headers = {
  'Cookie': '',
  'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
  'Host': 'm.lianjia.com'
}

function setCookies(setCookie) {
  if (Array.isArray(setCookies)) {
    Cookies.splice(Cookies.length - setCookies.length, Cookies.length)
    setCookies.forEach(s => {
      const name = String(s).split(';')[0]
      name && Cookies.push(name)
    })
  }
}

exports.home = async function(ctx, next) {
  console.log('home')
  const url = 'https://m.lianjia.com/cs/'
  try {
    const result = await ctx.$http.get(url, { headers: headers })
    console.log(result.status)
    if (result.status === 200) {
      const $ = cheerio.load(result.data, { decodeEntities: false })
      setCookies(result.headers['set-cookie'])
      // ctx.body = $('#main_start').html()
      const navItems = $('#main_start').find('.channel_nav').find('.post_ulog')
      const ret = []
      Array.from(navItems).forEach(s => {
        ret.push({
          name: $(s).find('div.name').text(),
          url: $(s).attr('href')
        })
      })
      ctx.type = 'application/json'
      ctx.body = ret
    }
  } catch (error) {
    ctx.body = error.message
  }
}

exports.house = async function(ctx, next) {
  console.log('house')

  console.log(ctx.query)
  ctx.body = 'house'

  const url = `https://m.lianjia.com${ctx.query.url}`

  try {
    // headers.Cookie = Cookies.join(';')
    const result = await ctx.$http.get(url, { headers: headers })
    if (result.status === 200) {
      const $ = cheerio.load(result.data, { decodeEntities: false })
      ctx.body = $('html').find('script').html()
      const $s = $('html').find('script')
      $s.each((i, e) => {
        const text = $(e).html()
        // console.log(i, text)
        const key = 'window.__INIT_STATE__'
        if(text.includes(key)) {
          const window = {}
          const x = eval(text)
          ctx.type = 'application/json'
          ctx.body = x
        }
      })
    }
  } catch (error) {
    ctx.body = error.message
  }
} 

exports.region = async function(ctx, next) {
  console.log('region')
  const url = 'https://m.lianjia.com/api/dict/city?city_id=430100'
  try {
    const result = await ctx.$http.get(url, { headers: headers })
    if (result.status === 200) {
      ctx.type = 'application/json'
      ctx.body = result.data
    }
  } catch(error) {
    ctx.body = error.message
  }
}

exports.chengjiao = async function(ctx, next) {
  console.log('chengjiao')
  const url = 'https://m.lianjia.com/liverpool/api/chengjiao/getList'
  const params = {
    cityId: 430100,
    condition: ctx.query.condition
  }
  try {
    const result = await ctx.$http.get(url, { headers: headers, params: params })
    if (result.status === 200) {
      ctx.type = 'aplication/json'
      ctx.body = result.data
    }
  } catch (error) {
    ctx.body = error.message
  }
}