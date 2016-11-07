import devConfig from './config.dev'
import prodConfig from './config.prod'

interface ClientConfig {
    port: string,
    tokenKey: string
}

let config: ClientConfig 

switch (ENV) {
    case 'production':
    case 'prod':
        config = prodConfig 
        break
    case 'development':
    case 'dev':
        config = devConfig 
        break
}

export default config