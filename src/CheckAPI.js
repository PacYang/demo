const url_get_all = "http://127.0.0.1:8000/test/get_uid_info"
const url_get_type = "http://127.0.0.1:8000/test/get_uid_product_info"

const headers = {
    'Content-Type': 'application/json'
  }

export const getAllType = (uid) =>
  fetch(url_get_all, { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify({'uid': uid})
    })
  .then(res =>res.json())
  .then(data => data.product_types)

  export const getTypeInfo = (uid, product_type) =>
  fetch(url_get_type, { 
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        'uid': uid,
        'product_type': product_type
      })
    })
  .then(res =>res.json())
  .then(data => data.detail)