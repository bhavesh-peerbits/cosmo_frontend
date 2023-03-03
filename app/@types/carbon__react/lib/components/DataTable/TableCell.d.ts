import { ReactNode } from 'react';
import { FCReturn, ReactAttr } from '../../../typings/shared';

interface ReactAttrTableCell extends Omit<ReactAttr<HTMLTableCellElement>, 'children'> {
	children?: ReactNode | object;
}

declare const TableCell: FCReturn<ReactAttrTableCell>;
export default TableCell;
