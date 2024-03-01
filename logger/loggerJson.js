const moment = require('moment');
const BaseLogger = require('./baseLogger');

class LoggerJson extends BaseLogger {
  constructor(options = {}) {
    super({ ...options, loggerType: 'json' }); 
    this.options.logFrequency = options.logFrequency || 'daily';
    this.options.logTime = options.logTime || '00:00'; 
  }

  log(level, message, details) {
    const timestamp = moment().format(this.options.dateTimeFormat);
    const serverInfo = this.options.showServerInfo ? this.getServerInfo() : '';

    const logEntry = {
      timestamp,
      serverInfo,
      level: level.toUpperCase(),
      message,
      details,
    };

    const logString = JSON.stringify(logEntry);
    console.log(logString); // Log to console

    // Log to file
    const fileName = this.getLogFileName(this.options.logFrequency, this.options.logTime, this.loggerType); // Pass loggerType
    this.logToFile(logString, fileName);
  }

  info(message, details) {
    this.log('info', message, details);
  }

  error(message, details) {
    this.log('error', message, details);
  }

  warn(message, details) {
    this.log('warn', message, details);
  }

  debug(message, details) {
    this.log('debug', message, details);
  }
}

module.exports = LoggerJson;
