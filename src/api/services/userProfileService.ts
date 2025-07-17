import type { UserProfileResponse } from '../../interface/IUser';
import { USER_PROFILE_API } from '../../constants/apiConstants';
import axiosInstance from '../axiosInstance';

export const getUserProfile = async (): Promise<UserProfileResponse> => {
  return new Promise((resolve, reject) => {
    axiosInstance
      .get(USER_PROFILE_API)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}; 