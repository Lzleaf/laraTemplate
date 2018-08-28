import env from './env'

const DEV_URL = 'http://homestead.test/api'
const PRO_URL = 'http://homestead.test/api'

export default env === 'development' ? DEV_URL : PRO_URL
