import { useState } from 'react';
import type { FC } from 'react';
import robotImage from '../assets/Robot-img.png';
import backgroundImg from '../assets/background-img1.png';
import loginBackgroundImg from '../assets/login-background-img.png';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { object, string } from 'yup';
import { ForgotPassword } from '../api/services/authService';

const forgotPasswordValidationSchema = object().shape({
  email: string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgetPassword: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleResetPassword = async (values: { email: string }) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Reset password requested for:', values.email);
      
      // Call the forgot password API
      const response = await ForgotPassword({ email: values.email });
      
      // Show success toast
      toast.success(response.message || 'Password reset link sent to your email!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Navigate back to login page after short delay
      setTimeout(() => navigate('/login'), 3000);
      
    } catch (error: any) {
      console.error('Password reset failed:', error);
      setError(error.response?.data?.message || 'Password reset failed. Please try again.');
      
      // Show error toast
      toast.error(error.response?.data?.message || 'Password reset failed. Please try again.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
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
          {/* Left side - Forgot Password form */}
          <div className="flex-1 bg-white flex flex-col justify-center items-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px]">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">FORGOT PASSWORD</h2>
              <p className="text-center text-gray-500 mb-6 text-xs sm:text-sm">Please enter your email to reset the password</p>
              
              <Formik
                initialValues={{ email: '' }}
                validationSchema={forgotPasswordValidationSchema}
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
                        name="email"
                        placeholder="Email"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <EmailOutlinedIcon className="text-gray-400 mr-2" fontSize="medium" />
                          ),
                          style: { background: '#F5F6FF', borderRadius: 10 },
                        }}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
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

              <div className="text-center mt-6 relative z-10">
                <button 
                  type="button"
                  onClick={() => navigate('/login')}
                  className="text-[#1C8DC9] hover:text-[#1C8DC9] hover:underline text-sm sm:text-base" 
                >
                  Back to Login
                </button>
              </div>
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

export default ForgetPassword;