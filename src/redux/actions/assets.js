import api from '@/axios'
const getAssets = () => {
    return new Promise(reslove => {
        api.get('/api/assets').then(res => {
            if (res.data.success) {
                localStorage.setItem('assets', res.data.datas)
                reslove(res.data.datas)
            }
        })
    })
}

export {
    getAssets
}