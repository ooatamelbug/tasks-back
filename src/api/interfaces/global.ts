export interface ResponseDataService {
    data?: [any];
    success?: boolean;
    messages?: string;
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