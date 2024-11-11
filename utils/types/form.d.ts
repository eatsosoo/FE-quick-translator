export type FormDataType = {
    states: FormStatesType;
    structure: FormStructuresType;
}

export type FormStatesType = {
    apiErrors: { [key: string]: string };
    loading: { [key: string]: boolean };
    values: { [key: string]: any };
}

export type FormStructuresType = {
    title?: string;
    name?: string;
    topSlotName?: string;
    bottomSlotName?: string;
    rows?: FormRowType[];
    validate: any;
    [key: string]: any;
}

export type FormRowType = {
    rowType: RowType;
    label: string;
    name: string;
    placeholder?: string;
}

export type RowType = 'text' | 'password';
