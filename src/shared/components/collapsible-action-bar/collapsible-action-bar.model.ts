export type CollapsibleRowData = any;

export interface InlineActions {
  icon: string;
  description: string;
  customStyles?: { [property: string]: string };
  show: (rowData: CollapsibleRowData) => boolean;
  onClick: (rowData: CollapsibleRowData) => void;
  disableCriteria: (rowData: CollapsibleRowData) => boolean;
}

export const alwaysEnabled = (_: CollapsibleRowData) => false;
export const alwaysShow = (_: CollapsibleRowData) => true;
