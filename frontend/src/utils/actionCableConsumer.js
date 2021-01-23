import { backendURL } from './api'
import { createConsumer as _createConsumer } from '@rails/actioncable'

const createConsumer = (uid, client, authToken) => (_createConsumer(backendURL + `/cable?uid=${uid}&client=${client}&authToken=${authToken}`))
export default createConsumer