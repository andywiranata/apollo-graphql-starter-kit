import fs from 'fs';

const winston = require('winston');
require('winston-daily-rotate-file');

// FILE LOGGER
const env = process.env.NODE_ENV || 'development';
const logDirectory = ('logs');

// Create the log directory if it does not exist
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}

const logFormatter = options => `[${options.timestamp()} | ${options.meta.codePath != null ? options.meta.codePath : ''}]  ${winston.config.colorize(options.level, options.level.toUpperCase())} : ${options.label} --- ${options.message} ${JSON.stringify(options.meta)}`;

const getTimestamp = () => {
    const d = new Date();
    return `${d.getHours()}:${d.getMinutes()}:${
        d.getSeconds()}.${d.getMilliseconds()}`;
};

const logger = ({ fileName }) => {
    const label = fileName.split('/').slice(-3).join('/');

    return new (winston.Logger)({
        transports: [
            // colorize the output to the console
            new (winston.transports.Console)({
                timestamp: getTimestamp,
                prettyPrint: true,
                colorize: true,
                label,
                formatter: logFormatter
            }),
            new (winston.transports.DailyRotateFile)({
                filename: `${logDirectory}/-oss-express.log`,
                datePattern: 'yyyy-MM-dd',
                prepend: true,
                level: env === 'development' ? 'verbose' : 'info',
                json: false,
                label,
                timestamp: getTimestamp,
                formatter: logFormatter,
                localTime: true
            }),
        ],
        exitOnError: false
    });
};

const getLogger = ({ fileName }) => logger({ fileName });
export default Object.assign({}, { getLogger });
