# Multi Type Logger Template
This is Logger package for Node.js logging that offers two distinct logging option JSON-based logging and inline console logging. As per your logging needs can switching between these logging types and write them to a .log files. Customize log formats, colors, and rotation frequencies for precise control over your application's logging behavior.

## Installation
```bash
npm install node-multi-type-logger
```
## Usage
The package has two type logging template type.
- Inline text logs
- JSON format logs

### Example of usage
```bash
const { LoggerJson, LoggerInline } = require('dual-logger');

// Example: LoggerJson
const loggerJson = new LoggerJson({
  logFilePath: './logs',
  logFrequency: 'daily',
  logTime: '12:00',
});

loggerJson.info('This is an information log.');

// Example: LoggerInline
const loggerInline = new LoggerInline({
  logFilePath: './logs',
  logFrequency: 'hourly',
  logTime: '00:00',
  showColor: true,
  colorMap: { error: '\x1b[31m' },
});

loggerInline.error('This is an error log.');
```
## Configuration Oprions
- `logFilePath`: Path where log files will be stored.
- `logFrequency`: Log file frequency (daily, hourly, minutely).
- `logTime`: Time to trigger daily log rotation (format: 'HH:mm').
- `showColor`: Whether to show colored logs (for LoggerInline).
- `colorMap`: Color mapping for log levels (for LoggerInline).

### Log File Name Format
- `YYYY-MM-DD.log`: Daily logger file format.
- `YYYY-MM-DD-hh:mm` : Hourly/Miniutely logger file format

## License
This project is licensed under the MIT License - see the LICENSE file for details.
