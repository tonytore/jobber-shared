declare module 'winston-loki' {
  import TransportStream = require('winston-transport')

  export interface LokiTransportOptions {
    host: string
    labels?: Record<string, string>
    json?: boolean
    format?: any
    onConnectionError?: (err: Error) => void
  }

  export class LokiTransport extends TransportStream {
    constructor(options: LokiTransportOptions)
  }
}
