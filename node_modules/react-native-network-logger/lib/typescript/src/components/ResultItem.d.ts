import React from 'react';
import NetworkRequestInfo from '../NetworkRequestInfo';
interface Props {
    request: NetworkRequestInfo;
    onPress?(): void;
    style?: any;
}
declare const ResultItem: React.FC<Props>;
export default ResultItem;
