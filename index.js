// Example usage
const LoggerJson = require('./logger/loggerJson');
const LoggerInline = require('./logger/loggerInline');

const loggerJson = new LoggerJson({
  logFilePath: './logs',
  logFrequency: 'daily',
  logTime: '12:00',
});

const loggerInline = new LoggerInline({
  logFilePath: './logs',
  logFrequency: 'hourly',
  logTime: '00:00',
  showColor: true,
  colorMap: { error: '\x1b[31m' },
});

loggerJson.info('LoggerJson info message');
loggerInline.error('LoggerInline error message');