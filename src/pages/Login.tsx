import { useState } from 'react';
import type { FC } from 'react';
// import Header from '../components/ui/Header';
import robotImage from '../assets/Robot-img.png';
import backgroundImg from '../assets/background-img1.png';
import loginBackgroundImg from '../assets/login-background-img.png';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { LoginForm } from '../interface/IUser';
import { loginValidationSchema } from '../validationSchema/ValidationSchema';
import { userLogin } from '../api/services/user.service';

const Login: FC = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // const handleLogin = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   Handle login logic here
  // };

  const handleLogin = async (values: LoginForm) => {
    try {
      setIsLoading(true);
      setError(null);
      console.log('Login button clicked', values);
      
      const response = await userLogin(values);
      console.log('Login successful:', response.data);
      
      // Show success toast
      toast.success('Login successful! Welcome back!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Handle successful login here
      // You might want to store the token in localStorage or Redux store
      // localStorage.setItem('token', response.data.token);
      
      // Navigate to home page or dashboard
      navigate('/');
      
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
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

      {/* Header */}
      {/* <Header /> */}

      {/* Main content */}
      <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row max-w-[1000px] w-full bg-white rounded-[20px] shadow-xl overflow-hidden">
          {/* Left side - Login form */}
          <div className="flex-1 bg-white flex flex-col justify-center items-center py-8 sm:py-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-[400px]">
              <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">LOGIN</h2>
              <p className="text-center text-gray-500 mb-6 text-xs sm:text-sm">Start your journey by logging in and exploring amazing features!</p>
              <Formik<LoginForm>
                initialValues={{ email: '', password: '' }}
                validationSchema={loginValidationSchema}
                onSubmit={(values) => {
                  handleLogin(values);
                }}
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
                    <div className="mb-4">
                      <Field
                        as={TextField}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <LockOutlinedIcon className="text-gray-400 mr-2" fontSize="medium" />
                          ),
                          endAdornment: (
                            <span
                              className="cursor-pointer"
                              onClick={() => setShowPassword((prev) => !prev)}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </span>
                          ),
                          style: { background: '#F5F6FF', borderRadius: 10 },
                        }}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                      <div className="relative">
                        <button 
                          type="button"
                          onClick={() => navigate('/forgot-password')}
                          className="absolute right-0 top-2 text-[#1C8DC9] hover:text-[#1C8DC9] hover:underline text-sm cursor-pointer"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center mt-14 mb-4">
                      <CustomButton
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        className="w-full sm:w-auto"
                      >
                        {isLoading ? 'Logging in...' : 'Login Now'}
                      </CustomButton>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="flex items-center my-6">
                <div className="flex-grow h-px bg-gray-200" />
                <span className="mx-2 text-gray-500 font-semibold text-xs sm:text-sm">Login with Others</span>
                <div className="flex-grow h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                <button className="flex items-center w-full border border-gray-200 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition">
                  <GoogleIcon className="mr-2 text-[18px] sm:text-[22px]" style={{ color: '#EA4335' }} />
                  <span className="text-gray-700 text-sm sm:text-base">Login with <span className="font-bold">google</span></span>
                </button>
                <button className="flex items-center w-full border border-gray-200 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition">
                  <FacebookIcon className="mr-2 text-[18px] sm:text-[22px]" style={{ color: '#1877F3' }} />
                  <span className="text-gray-700 text-sm sm:text-base">Login with <span className="font-bold">Facebook</span></span>
                </button>
              </div>
              <div className="text-center mt-6 relative z-10">
                <button 
                    type="button"
                    onClick={() => {
                        console.log('SignUp button clicked');
                        navigate('/signup');
                    }}
                    className="text-[#1C8DC9] hover:text-[#1C8DC9] hover:underline text-sm sm:text-base" 
                    >
                    Create New Account ?
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
              {/* <div className="absolute inset-0 "></div> */}
              <div className="relative px-5 pt-5">
                <div className="text-white ">
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

export default Login;
