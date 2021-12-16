export interface ResponseDataService {
    data?: [any];
    success?: boolean;
    message?: string;
    token?:  string
    userData?: {
        firstname: string;
        lastname: string;
        username: string;
    } 
}

export interface ReturnDataService {
    statusCode: number;
    response: ResponseDataService;
}