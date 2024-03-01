const moment = require('moment');
const BaseLogger = require('./baseLogger');

class LoggerInline extends BaseLogger {
  constructor(options = {}) {
    super(options);
    this.options.showColor = options.showColor !== undefined ? options.showColor : false;
    this.options.colorMap = options.colorMap || {};
    this.loggerType = 'inline';
  }

  log(level, message, details) {
    const timestamp = moment().format(this.options.dateTimeFormat);
    const serverInfo = this.options.showServerInfo ? this.getServerInfo() : '';
    const colorCode = this.options.showColor ? this.getColor(level) : '';

    console.log(`${colorCode}[${timestamp}]${serverInfo} | ${level.toUpperCase()} | ${message} ${details ? `| details: ${details}` : ''}\x1b[0m`);

    // Log to file
    const fileName = this.getLogFileName(this.options.logFrequency, this.options.logTime);
    const logString = `${timestamp} | ${serverInfo} | ${level.toUpperCase()} | ${message} ${details ? `| details: ${details}` : ''}`;
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

  getColor(level) {
    const colorCode = this.options.colorMap[level.toLowerCase()] || '\x1b[0m';
    return colorCode;
  }
}

module.exports = LoggerInline;
