export interface TableLayout {
    title: string;
    headerRows : string[];
    data: any[];
    canEdit: boolean;
    canRemove: boolean;
    functionRemove: Function;
    canUpload?: boolean;
    canLock?: boolean;
    propertyToCheck?: string;
    functionLock?: Function;
}