export interface IResponse {
    message: string;
    error: boolean;
}

export interface IResponseGetList<T> {
    data : T[],
    count: number
}