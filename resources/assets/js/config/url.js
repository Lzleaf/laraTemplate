import env from './env'

const DEV_URL = 'http://127.0.0.1:8000/api'
const PRO_URL = 'http://127.0.0.1:8000/api'

export default env === 'development' ? DEV_URL : PRO_URL
