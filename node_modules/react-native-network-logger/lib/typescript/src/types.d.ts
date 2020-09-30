export declare type Headers = {
    [header: string]: string;
};
export declare type RequestMethod = 'GET' | 'POST' | 'UPDATE' | 'DELETE';
export declare type StartNetworkLoggingOptions = {
    /** Max number of requests to keep before overwriting, default 500 */
    maxRequests?: number;
};
