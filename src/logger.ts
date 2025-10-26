import winston, { Logger } from 'winston'
import { LokiTransport } from 'winston-loki'

export interface LoggerConfig {
    serviceName: string
    level: string
    lokiUrl?: string
    enableLoki?: boolean
}

export const winstonLogger = (config: LoggerConfig): Logger => {
    const { serviceName, level, lokiUrl, enableLoki = true } = config
    
    const consoleOptions = {
        level,
        handleException: true,
        json: true,
        colorize: true,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.errors({ stack: true }),
            winston.format.json()
        )
    }

    const transports: winston.transport[] = [
        new winston.transports.Console(consoleOptions)
    ]

    // Add Loki transport if enabled and URL is provided
    if (enableLoki && lokiUrl) {
        const lokiOptions = {
            host: lokiUrl,
            labels: {
                service: serviceName,
                environment: process.env.NODE_ENV || 'development'
            },
            json: true,
            format: winston.format.json(),
            onConnectionError: (err: Error) => console.warn('Loki connection error:', err)
        }
        
        try {
            const lokiTransport = new LokiTransport(lokiOptions)
            transports.push(lokiTransport)
        } catch (error) {
            console.warn('Failed to initialize Loki transport:', error)
        }
    }

    const logger: Logger = winston.createLogger({
        exitOnError: false,
        defaultMeta: { 
            service: serviceName,
            timestamp: new Date().toISOString()
        },
        transports
    })

    return logger
}

// Convenience function for quick setup
export const createLogger = (serviceName: string, lokiUrl?: string): Logger => {
    return winstonLogger({
        serviceName,
        level: process.env.LOG_LEVEL || 'info',
        lokiUrl: lokiUrl || process.env.LOKI_URL || 'http://loki:3100',
        enableLoki: !!lokiUrl || !!process.env.LOKI_URL
    })
}

// Simple console-only logger for development
export const createConsoleLogger = (serviceName: string): Logger => {
    return winstonLogger({
        serviceName,
        level: process.env.LOG_LEVEL || 'info',
        enableLoki: false
    })
}