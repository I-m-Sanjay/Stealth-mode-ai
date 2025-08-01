import { GET_PROJECTS_URL, PROJECT_URL, UPDATE_PROJECT_URL, GENERATE_CODE_URL } from '../../constants/apiConstants';
import axiosInstance from '../axiosInstance';

export interface IProject {
  _id: string;
  name: string;
  userId: {
    _id: string;
    email: string;
    name: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  createdAt: string;
  __v: number;
}

export interface IGetProjectsResponse {
  success: boolean;
  message: string;
  data: IProject[];
}

export interface ICreateProjectPayload {
  name: string;
  userId: string;
}

export interface ICreateProjectResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    userId: string;
    isActive: boolean;
    _id: string;
    createdAt: string;
    __v: number;
  };
}

export interface IUpdateProjectPayload {
  name?: string;
  userId?: string;
  isActive?: boolean;
}

export interface IUpdateProjectResponse {
  success: boolean;
  message: string;
  data: IProject;
}

export interface IGenerateCodePayload {
  returnType: 'sse';
  userMessage: string;
  projectId: string;
}

export interface IGenerateCodeResponse {
  // SSE response - this will be a stream of data
  // The actual response structure depends on your backend implementation
  data?: any;
  error?: string;
}

export const getProjects = async (id: string): Promise<IGetProjectsResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(`${GET_PROJECTS_URL}?id=${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createProjectAPI = async (payload: ICreateProjectPayload): Promise<ICreateProjectResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(PROJECT_URL, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProjectAPI = async (projectId: string, payload: IUpdateProjectPayload): Promise<IUpdateProjectResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .put(`${UPDATE_PROJECT_URL}/${projectId}`, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const generateCodeAPI = async (payload: IGenerateCodePayload): Promise<IGenerateCodeResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .post(GENERATE_CODE_URL, payload)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}; 