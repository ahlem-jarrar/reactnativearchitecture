import NetworkRequestInfo from './NetworkRequestInfo';
import { StartNetworkLoggingOptions } from './types';
export default class Logger {
    private requests;
    private xhrIdMap;
    private maxRequests;
    callback: (requests: any[]) => void;
    setCallback: (callback: any) => void;
    private getRequest;
    private updateRequest;
    private openCallback;
    private requestHeadersCallback;
    private headerReceivedCallback;
    private sendCallback;
    private responseCallback;
    enableXHRInterception: (options?: StartNetworkLoggingOptions | undefined) => void;
    getRequests: () => NetworkRequestInfo[];
    clearRequests: () => void;
}
