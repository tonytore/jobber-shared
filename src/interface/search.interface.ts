
export interface ILokiSearchResult {
  status: 'success' | 'error';
  data: ILokiData;
}


export interface ILokiData {
  resultType: 'streams' | 'matrix' | 'vector';
  result: ILokiResult[];
}

export interface ILokiResult {
  stream: Record<string, string>; // labels (job, level, app, etc.)
  values: [string, string][];     // [timestamp, log line]
}

export interface ILokiQuery {
  logql: string;       // `{app="api"} |= "error"`
  start?: number;      // unix nanoseconds
  end?: number;        // unix nanoseconds
  limit?: number;
  direction?: 'forward' | 'backward';
}


export interface ILokiQueryBuilder {
  labels: Record<string, string>;
  contains?: string;
  regex?: string;
  range?: string; // e.g. "5m", "1h"
}

export interface ILokiPaginateProps {
  limit: number;
  direction?: 'forward' | 'backward';
  start?: number;
}
