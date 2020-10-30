export default {
  bundleByKey: state => key => state.bundle[key],
  contentByKey: state => key => state.content[key],
  bundle: state => state.bundle
}