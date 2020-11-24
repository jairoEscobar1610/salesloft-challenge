import { AxiosResponse } from 'axios';

export const axiosResponses: { 200: AxiosResponse, 422: AxiosResponse } = {
    200: {
        data: ['data'],
        status: 200,
        statusText: 'OK',
        config: {},
        headers: {}
    },
    422: {
        data: ['error'],
        status: 422,
        statusText: 'Unprocessable Entity',
        config: {},
        headers: {}
    }
};

export function axiosResposeWithData(status:number, data:any): AxiosResponse{
    return Object.assign(axiosResponses[status], {data});
}

export const axios200 = {
    default: {
        get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponses[200]))
    },
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponses[200]))
}

export const axios422 = {
    default: {
        get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponses[422]))
    },
    get: jest.fn().mockImplementation(() => Promise.resolve(axiosResponses[422]))
}