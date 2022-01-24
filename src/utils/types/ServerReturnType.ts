export interface IServerReturnType {
    error: boolean;
    statusCode: number;
    errorMessage?: string;
    successMessage?: string;
    trace?: any;
    data?: any;
}