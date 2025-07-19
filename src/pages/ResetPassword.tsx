import { useState } from 'react';
import type { FC } from 'react';
import robotImage from '../assets/Robot-img.png';
import backgroundImg from '../assets/background-img1.png';
import loginBackgroundImg from '../assets/login-background-img.png';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string, ref } from 'yup';
import { ResetPasswordAPI } from '../api/services/authService';

const resetPasswordValidationSchema = object().shape({
  newPassword: string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    .required('New password is required'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});

const ResetPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const handleResetPassword = async (values: { newPassword: string; confirmPassword: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!token) {
        setError('Reset token is missing. Please use the link from your email.');
        return;
      }
      
      console.log('Password reset with token:', token);
      
      // Call the reset password API with the payload structure you specified
      await ResetPasswordAPI({
        token: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      });
      
      // Show success toast
      toast.success('Password reset successfully!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Navigate to login page after short delay
      setTimeout(() => navigate('/login'), 3000);
      
    } catch (error: any) {
      console.error('Password reset failed:', error);
      setError(error.response?.data?.message || 'Password reset failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C8DC9] relative">
      {/* Background pattern */}
      <img
        src={backgroundImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />

      {/* Main content */}
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row max-w-[1000px] w-full bg-white rounded-[20px] shadow-xl overflow-hidden">
          {/* Left side - Reset Password form */}
          <div className="flex-1 bg-white flex flex-col justify-center items-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px]">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">RESET PASSWORD</h2>
              <p className="text-center text-gray-500 mb-6 text-xs sm:text-sm">Please enter your new password</p>
              
              <Formik
                initialValues={{ newPassword: '', confirmPassword: '' }}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={handleResetPassword}
              >
                {({ errors, touched }) => (
                  <Form>
                    {error && (
                      <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                        {error}
                      </div>
                    )}
                    <div className="mb-4">
                      <Field
                        as={TextField}
                        name="newPassword"
                        placeholder="New Password"
                        type={showNewPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <LockOutlinedIcon className="text-gray-400 mr-2" fontSize="medium" />
                          ),
                          endAdornment: (
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                          ),
                          style: { background: '#F5F6FF', borderRadius: 10 },
                        }}
                        error={touched.newPassword && Boolean(errors.newPassword)}
                        helperText={touched.newPassword && errors.newPassword}
                      />
                    </div>
                    <div className="mb-4">
                      <Field
                        as={TextField}
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <LockOutlinedIcon className="text-gray-400 mr-2" fontSize="medium" />
                          ),
                          endAdornment: (
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            </button>
                          ),
                          style: { background: '#F5F6FF', borderRadius: 10 },
                        }}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
                      />
                    </div>
                    <div className="flex justify-center mb-4">
                      <CustomButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? 'Processing...' : 'Reset Password'}
                      </CustomButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          {/* Right side - Robot image */}
          <div className="hidden lg:flex flex-1 bg-[#1C8DC9] relative overflow-hidden items-center justify-center p-8">
            <img
              src={loginBackgroundImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="relative rounded-[40px] border-1 border-white overflow-hidden h-[380px] w-[300px]">
              <div className="relative px-5 pt-5">
                <div className="text-white">
                  <h2 className="text-[25px] font-bold leading-tight">
                    Very good<br /> works are<br />waiting for <br /> you Login<br />Now!!!
                  </h2>
                </div>
                <div className="relative left-[45px] h-[255px] bottom-[52px] flex justify-center items-center overflow-hidden">
                  <img
                    src={robotImage}
                    alt="AI Robot"
                    className="shrink-0 min-w-full min-h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 