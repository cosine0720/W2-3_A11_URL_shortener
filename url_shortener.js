// define sample function to randomly return a item in an array
function sample(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

// define urlShortener function
function urlShortener(url) {
  // 未輸入則顯示錯誤通知！
  // if (url.length === 0) {
  //   return 'Oops🥵！ 這也太短了吧！'
  // }

  // 定義元素
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const numbers = '1234567890'

  // 整合元素
  let collection = []
  collection = collection.concat(lowerCaseLetters.split(''))
  collection = collection.concat(upperCaseLetters.split(''))
  collection = collection.concat(numbers.split(''))

  // 產生五碼亂數
  let shortener = ''
  // https://cosine-url.herokuapp.com/
  
  for (let i = 0; i < 5; i++) {
    shortener += sample(collection)
  }

  // return 結果
  return shortener
}

module.exports = urlShortener