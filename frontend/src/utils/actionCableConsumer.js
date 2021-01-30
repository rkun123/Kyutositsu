import { backendURL } from './api'
import { createConsumer } from '@rails/actioncable'

const consumer = createConsumer(backendURL + '/cable')
export default consumer