import { createLogger, format, transports } from 'winston';
import { IS_PRODUCTION } from '@/env-variables';

const logger = createLogger({
  format: format.combine(
    format(info => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    ...(IS_PRODUCTION ? [format.colorize()] : []),
    format.splat(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(
      ({ level, message, timestamp, ...metadata }) =>
        `${timestamp} [${level}]: ${message} ${metadata ? JSON.stringify(metadata) : ''}`
    )
  ),
  transports: [
    ...(IS_PRODUCTION
      ? [
          new transports.File({
            filename: './logs/all-logs.log',
            maxsize: 5242880,
            maxFiles: 5
          })
        ]
      : []),
    new transports.Console()
  ]
});

export default logger;
