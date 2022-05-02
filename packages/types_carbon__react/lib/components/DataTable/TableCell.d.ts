import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface ReactAttrTableCell extends ReactAttr<HTMLTableCellElement> {
	children?: ReactNode | object;
}

declare const TableCell: FCReturn<ReactAttrTableCell>;
export default TableCell;
