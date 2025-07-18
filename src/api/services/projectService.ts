import { GET_PROJECTS_URL } from '../../constants/apiConstants';
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