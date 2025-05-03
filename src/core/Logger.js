class Logger {
  static info(msg) {
    console.log(`ℹ️  ${msg}`)
  }

  static success(msg) {
    console.log(`✅ ${msg}`)
  }

  static warn(msg) {
    console.warn(`⚠️  ${msg}`)
  }

  static error(msg) {
    console.error(`❌ ${msg}`)
  }
}

export default Logger
