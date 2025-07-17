import { useState } from 'react';
import type { FC } from 'react';
// import Header from '../components/ui/Header';
import robotImage2 from '../assets/Robot2.png';
import backgroundImg from '../assets/background-img1.png';
import loginBackgroundImg from '../assets/login-background-img.png';
import { Formik, Form, Field } from 'formik';
import { TextField } from '@mui/material';
import CustomButton from '../components/ui/CustomButton';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { SignUpFormValues } from '../interface/IUser';
import { signUpValidationSchema } from '../validationSchema/ValidationSchema';
import { doSignUp } from '../api/services/authService';

const SignUp: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const handleLogin = () => {
        console.log('Login button clicked');
        navigate('/login');
    };

    const handleSignUp = async (values: SignUpFormValues) => {
        setIsLoading(true);
        setError(null);

        try {
            const { userName, email, password } = values;
            const signUpData = {
                name: userName,
                email: email,
                password: password
            };
            const response = await doSignUp(signUpData);
            console.log('Sign up successful:', response);

            // Show success toast
            toast.success('Account created successfully! Please login to continue.', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Navigate to login page after successful signup
            navigate('/login');
        } catch (err: any) {
            console.error('Sign up failed:', err);
            setError(err.response?.data?.message || 'Sign up failed. Please try again.');
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
            <div className="flex justify-center items-center min-h-screen p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col lg:flex-row max-w-[1000px] w-full bg-white rounded-[20px] overflow-hidden shadow-2xl">
                    {/* Left side - Motivational message */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#1C8DC9] relative overflow-hidden items-center justify-center p-6 sm:p-8 lg:p-10 min-h-[300px] lg:min-h-[600px]">
                        <img
                            src={loginBackgroundImg}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        <div className="relative rounded-[40px] border border-white overflow-hidden h-[280px] w-[220px] sm:h-[320px] sm:w-[250px] lg:h-[380px] lg:w-[300px]">
                            <div className="relative px-3 sm:px-4 lg:px-5 pt-3 sm:pt-4 lg:pt-5">
                                <div className="text-white">
                                    <h2 className="text-[18px] sm:text-[20px] lg:text-[25px] font-bold leading-tight ml-[80px] sm:ml-[100px] lg:ml-[120px]">
                                        Very good<br /> 
                                        <span className='px-2 sm:px-3'>works are</span><br />
                                        waiting for <br />
                                        you SignUp<br /> 
                                        <span className='px-6 sm:px-8 lg:px-10'>Now!!!</span>
                                    </h2>
                                </div>
                                <div className="relative h-[180px] sm:h-[200px] lg:h-[255px] bottom-[40px] sm:bottom-[45px] lg:bottom-[52px] right-[35px] sm:right-[40px] lg:right-[50px] flex justify-center items-center overflow-hidden">
                                    <img
                                        src={robotImage2}
                                        alt="AI Robot"
                                        className="shrink-0 min-w-full min-h-full object-contain"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - SignUp form */}
                    <div className="w-full lg:w-1/2 bg-white flex flex-col justify-center items-center py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-[400px]">
                            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-2">SIGN UP</h2>
                            <p className="text-center text-gray-500 mb-6 text-sm">Sign up and unlock the future with AI</p>
                            {error && (
                                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
                                    {error}
                                </div>
                            )}
                            <Formik<SignUpFormValues>
                                initialValues={{ userName: '', email: '', password: '', confirmPassword: '' }}
                                validationSchema={signUpValidationSchema}
                                onSubmit={handleSignUp}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                name="userName"
                                                placeholder="Username"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                InputProps={{
                                                    startAdornment: (
                                                        <PersonOutlineIcon className="text-gray-400 mr-2" fontSize="medium" />
                                                    ),
                                                    style: { background: '#F5F6FF', borderRadius: 10 },
                                                }}
                                                error={touched.userName && Boolean(errors.userName)}
                                                helperText={touched.userName && errors.userName}
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                name="email"
                                                type="email"
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
                                        </div>
                                        <div className="mb-4">
                                            <Field
                                                as={TextField}
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
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
                                                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </span>
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
                                                {isLoading ? 'Signing Up...' : 'SignUp Now'}
                                            </CustomButton>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="flex items-center my-6">
                                <div className="flex-grow h-px bg-gray-200" />
                                <span className="mx-2 text-gray-500 font-semibold text-sm">SignUp with Others</span>
                                <div className="flex-grow h-px bg-gray-200" />
                            </div>
                            <div className="space-y-3">
                                <button className="flex items-center justify-center w-full border border-gray-200 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition text-sm">
                                    <GoogleIcon className="mr-2 text-[20px] sm:text-[22px]" style={{ color: '#EA4335' }} />
                                    <span className="text-gray-700">Login with <span className="font-bold">google</span></span>
                                </button>
                                <button className="flex items-center justify-center w-full border border-gray-200 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition text-sm">
                                    <FacebookIcon className="mr-2 text-[20px] sm:text-[22px]" style={{ color: '#1877F3' }} />
                                    <span className="text-gray-700">Login with <span className="font-bold">Facebook</span></span>
                                </button>
                            </div>
                            <div className="text-center mt-6 relative z-10">
                                <button
                                    type="button"
                                    onClick={() => {
                                        console.log('Button clicked');
                                        handleLogin();
                                    }}
                                    className="text-[#1C8DC9] hover:text-[#1C8DC9] hover:underline text-sm"
                                >
                                    Already have an account? Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp; 