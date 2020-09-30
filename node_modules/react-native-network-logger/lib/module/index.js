import logger from './loggerSingleton';
export { default } from './components/NetworkLogger';
export const startNetworkLogging = options => {
  logger.enableXHRInterception(options);
};
export const getRequests = () => logger.getRequests();
export const clearRequests = () => logger.clearRequests();
export { getBackHandler } from './backHandler';
export { ThemeName } from './theme';
//# sourceMappingURL=index.js.map