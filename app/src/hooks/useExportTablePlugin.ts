import { Column, RowModel, TableInstance } from '@tanstack/react-table';
import Papa from 'papaparse';
import { utils, writeFile } from 'xlsx';
import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useCallback } from 'react';
import { AvailableFileType, ExportProperties } from '@components/table/types';
import { isDate } from 'date-fns';
import { formatDate } from '@i18n';

// Get exported file name(do not specify extension here)
const defaultGetExportFileName = ({
	all
}: {
	all: boolean | 'selection';
	fileType: AvailableFileType;
}) => {
	return `${all === true ? 'all-' : ''}data`;
};

// To get column name while exporting
const defaultGetColumnExportValue = <T>(col: Column<T>) => {
	let name = col.columnDef.header;
	if (typeof name === 'object' || typeof name === 'function' || !name) {
		name = col.id;
	}
	return name;
};

function getExportFileBlob({
	columns,
	data,
	fileType,
	fileName
}: {
	columns: string[];
	data: Array<(string | Date)[]>;
	fileType: AvailableFileType;
	fileName: string;
}) {
	if (fileType === 'csv') {
		const csvString = Papa.unparse({ fields: columns, data });
		return new Blob([csvString], { type: 'text/csv' });
	}
	if (fileType === 'xlsx') {
		const compatibleData = data.map(row => {
			const obj: Record<string, unknown> = {};
			columns.forEach((col, index) => {
				obj[col] = row[index];
			});
			return obj;
		});

		const wb = utils.book_new();
		const ws1 = utils.json_to_sheet(compatibleData, {
			header: columns
		});
		utils.book_append_sheet(wb, ws1, 'React Table Data');
		writeFile(wb, `${fileName}.xlsx`);

		// Returning false as downloading of file is already taken care of
		return false;
	}
	if (fileType === 'pdf') {
		const doc = new JsPDF('landscape');
		autoTable(doc, {
			head: [columns],
			body: data as string[][],
			margin: { top: 20 },
			styles: {
				minCellHeight: 9,
				halign: 'left',
				valign: 'middle',
				fontSize: 11,
				minCellWidth: 25
			}
		});
		doc.save(`${fileName}.pdf`);

		return false;
	}

	// Other formats goes here
	return false;
}

function downloadFileViaBlob(fileBlob: Blob, fileName: string, type: AvailableFileType) {
	if (fileBlob) {
		const dataUrl = URL.createObjectURL(fileBlob);
		const link = document.createElement('a');
		link.download = `${fileName}.${type}`;
		link.href = dataUrl;
		link.click();
	}
}

const useExportTablePlugin = <T extends { ColumnMeta: ExportProperties }>(
	instance: TableInstance<T>,
	getExportFileName = defaultGetExportFileName,
	globalDisableExport = false
) => {
	const { getFlatHeaders, getRowModel, getCoreRowModel, getSelectedRowModel } = instance;

	// This method will enable export of data on `instance` object
	const exportData = useCallback(
		(fileType: AvailableFileType, all: boolean | 'selection' = false) => {
			if (!globalDisableExport) {
				const columns = getFlatHeaders()
					.map(({ column }) => {
						const {
							id,
							meta: {
								disableExport,
								exportLabel = defaultGetColumnExportValue,
								exportableFn
							} = {}
						} = column.columnDef;
						const columnExportValue = exportLabel(column);
						return {
							id,
							exportableFn,
							columnExportValue,
							canExport: !disableExport
						};
					})
					.filter(col => col.canExport);

				let rowModel: RowModel<T>;
				switch (all) {
					case 'selection':
						rowModel = getSelectedRowModel();
						break;
					case true:
						rowModel = getCoreRowModel();
						break;
					default:
						rowModel = getRowModel();
				}

				const { rows } = rowModel;
				const data = rows.map(row =>
					columns.map(col => {
						const v = row.getValue(col.id);
						if (col.exportableFn) {
							return col.exportableFn(v);
						}

						if (isDate(v)) {
							return fileType === 'pdf' ? formatDate(v) : v;
						}

						return typeof v === 'string' ? v : JSON.stringify(v);
					})
				);

				const fileName = getExportFileName({ fileType, all });
				// Get `FileBlob` to download
				const fileBlob = getExportFileBlob({
					columns: columns.map(col => col.columnExportValue),
					data,
					fileName,
					fileType
				});

				// Trigger download in browser
				if (fileBlob) {
					downloadFileViaBlob(fileBlob, fileName, fileType);
				}
			}
		},
		[
			globalDisableExport,
			getFlatHeaders,
			getSelectedRowModel,
			getRowModel,
			getCoreRowModel,
			getExportFileName
		]
	);
	return {
		exportData
	};
};

export default useExportTablePlugin;
