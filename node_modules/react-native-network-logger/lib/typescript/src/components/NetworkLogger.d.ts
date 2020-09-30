import React from 'react';
import { ThemeName } from '../theme';
interface Props {
    theme?: ThemeName;
    sort?: 'asc' | 'desc';
}
declare const NetworkLogger: React.FC<Props>;
export default NetworkLogger;
