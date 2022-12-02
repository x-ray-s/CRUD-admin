const _fetch = window.fetch
const _isObject = (v) => typeof v === 'object'
const fetch = (url, options = {}) => {
    const {
        method = 'GET',
        params,
        baseURL,
        data,
        headers,
        responseType = 'json',
    } = options

    // baseURL
    if (!/^http/.test(url) && baseURL && /^http/.test(baseURL)) {
        const isDoubleSlash = baseURL.endsWith('/') && url.startsWith('/')
        url = baseURL + url.substring(isDoubleSlash ? 1 : 0)
    }
    const _url = new URL(url)
    // params control
    if (params) {
        Object.keys(params).forEach((key) => {
            _url.searchParams.append(key, params[key])
        })
    }

    const requestOptions = {
        method,
    }
    const _headers = new window.Headers()
    if (headers) {
        Object.keys(headers).forEach((key) => {
            _headers.append(key, headers[key])
        })
    }

    // data
    if (data && !/(get|option)/i.test(method)) {
        // default form
        if (!_headers.has('content-type')) {
            _headers.append('content-type', 'application/x-www-form-urlencoded')
        }

        const type = _headers.get('content-type')
        const isDataObject = _isObject(data)

        switch (type) {
            case 'application/json':
                requestOptions.body = isDataObject ? JSON.stringify(data) : data
                break
            case 'application/x-www-form-urlencoded':
                const form = new URLSearchParams(isDataObject ? '' : data)
                if (isDataObject) {
                    Object.keys(data).forEach((key) => {
                        form.append(key, data[key])
                    })
                }
                requestOptions.body = form.toString()
                break
            case 'multipart/form-data':
                const formData = new FormData()
                if (isDataObject) {
                    Object.keys(data).forEach((key) => {
                        formData.append(key, data[key])
                    })
                }
                requestOptions.body = formData
                _headers.delete('content-type')
                break
            default:
                requestOptions.body = data
        }
    }

    requestOptions.headers = _headers
    // response
    return _fetch(new Request(_url, requestOptions)).then((r) => {
        if (!r.ok) {
            throw new Error(r.statusText)
        }
        if (responseType === 'json') {
            return r.json()
        }
        return r
    })
}

window.fetch = (url, options = {}) =>
    fetch(url, {
        baseURL: 'http://localhost:4000',
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('pinia/auth/token'),
        },
        ...options,
    })

export default fetch

export { fetch }
