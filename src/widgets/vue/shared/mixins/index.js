import * as arrayUtils from '../scripts/array'
import * as buildUtils from '../scripts/build'
import * as domUtils from '../scripts/dom'
import * as eventUtils from '../scripts/event'
import * as formatUtils from '../scripts/format'
import * as objectUtils from '../scripts/object'
import * as stringUtils from '../scripts/string'
import * as validateUtils from '../scripts/validate'

export default {
  methods: {
    ...arrayUtils,
    ...buildUtils,
    ...domUtils,
    ...eventUtils,
    ...formatUtils,
    ...objectUtils,
    ...stringUtils,
    ...validateUtils
  }
}