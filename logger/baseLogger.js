const fs = require('fs');
const path = require('path');
const moment = require('moment');

class BaseLogger {
  constructor(options = {}) {
    this.options = {
      dateTimeFormat: options.dateTimeFormat || 'YYYY-MM-DD HH:mm:ss',
      showServerInfo: options.showServerInfo !== undefined ? options.showServerInfo : true,
      logFilePath: options.logFilePath || './logs', // Default log file path
      loggerType :options.loggerType, // Default logger type
    };
  }

  logToFile(logString, fileName) {
    const filePath = path.join(this.options.logFilePath, fileName);

    fs.appendFile(filePath, logString + '\n', (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });
  }

  getLogFileName(logFrequency, logTime, loggerType) {
    const now = moment();
    const today = now.format('YYYY-MM-DD');

    if (logFrequency === 'daily' && now.isAfter(moment(today + ' ' + logTime, 'YYYY-MM-DD HH:mm'))) {
      return now.add(1, 'day').format('YYYY-MM-DD') + `.log`;
    }

    let format = 'YYYY-MM-DD';
    if (logFrequency === 'hourly') {
      format = 'YYYY-MM-DD_HH';
    } else if (logFrequency === 'minutely') {
      format = 'YYYY-MM-DD_HH-mm';
    }

    return now.format(format) + `.log`;
  }

  getServerInfo() {
    const networkInterfaces = require('os').networkInterfaces();
    let serverInfo = '';

    for (const interfaceName in networkInterfaces) {
      const interfaces = networkInterfaces[interfaceName];
      for (const iface of interfaces) {
        if (!iface.internal && iface.family === 'IPv4') {
          serverInfo = `${iface.address}:${this.getServerPort()}`;
          break;
        }
      }
      if (serverInfo !== '') {
        break;
      }
    }

    return serverInfo;
  }

  getServerPort() {
    // Implement logic to get the server port (e.g., from configuration)
    // For simplicity, using a placeholder value '3000'
    return '3000';
  }
}

module.exports = BaseLogger;
