export type FormDataType = {
    states: FormStatesType;
    structures: FormStructuresType[];
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
    [key: string]: any;
}

export type FormRowType = {
    rowType: RowType;
    label: string;
    name: string;
    placeholder?: string;
    readonly?: boolean;
    disabled?: boolean;
    rules?: any;
}

export type RowType = 'text' | 'password';

export type RegisterFormType = {
    user_name: string;
    name: string;
    email: string;
    code: string;
    password: string;
    confirm_password: string;
}
