import { createLogger, format, transports, addColors } from "winston"

const { combine, printf, timestamp, colorize } = format

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
}

const colors = {
    fatal: 'blue',
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

addColors(colors)

const logConfig = {
    levels,
    format: combine(
        timestamp({
          format: "MM-DD-YYYY HH:mm:ss",
        }),
        colorize(),
        printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
    ),
    transports: [
        new transports.Console({ level: 'debug' }),
        new transports.Console({ level: 'info' }),
        new transports.File({
            filename: './logs/errors.log',
            level: 'error'
        }),
    ]
}

export const logger = createLogger(logConfig)

export const loggerTest = () => {
    logger.debug('aviso debug')
    logger.http('aviso http')
    logger.info('aviso info')
    logger.warning('aviso warn')
    logger.error('aviso error')
    logger.fatal('aviso fatal')
  };