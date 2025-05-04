'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegCircleUser } from 'react-icons/fa6';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
const apiversion = '/api';

function Login() {
    const [show, setShow] = useState(false);
    const [credentials, setCredentials] = useState({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
        country: ""
    });
    const [errors, setErrors] = useState({
        fullname: "",
        email: "",
        mobile: "",
        password: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
        country: ""
    });
    const [activeForm, setActiveForm] = useState('login');
    const [generatedOtp, setGeneratedOtp] = useState("");

    // Browser-compatible OTP generator
    const generateOtp = () => {
        const digits = '0123456789';
        let otp = '';
        for (let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
        }
        return otp;
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateMobile = (mobile) => {
        const re = /^\d{10}$/;
        return re.test(mobile);
    };

    const validatePassword = (password) => {
        return password.length >= 5;
    };

    const validateOTP = (otp) => {
        const re = /^\d{6}$/;
        return re.test(otp);
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (activeForm === 'login') {
            if (!credentials.email) {
                newErrors.email = "Email is required";
                valid = false;
            } else if (!validateEmail(credentials.email)) {
                newErrors.email = "Invalid email format";
                valid = false;
            } else {
                newErrors.email = "";
            }

            if (!credentials.password) {
                newErrors.password = "Password is required";
                valid = false;
            } else if (!validatePassword(credentials.password)) {
                newErrors.password = "Password must be at least 5 characters";
                valid = false;
            } else {
                newErrors.password = "";
            }
        }

        if (activeForm === 'signup') {
            if (!credentials.fullname) {
                newErrors.fullname = "Full name is required";
                valid = false;
            } else {
                newErrors.fullname = "";
            }

            if (!credentials.email) {
                newErrors.email = "Email is required";
                valid = false;
            } else if (!validateEmail(credentials.email)) {
                newErrors.email = "Invalid email format";
                valid = false;
            } else {
                newErrors.email = "";
            }

            if (!credentials.mobile) {
                newErrors.mobile = "Mobile is required";
                valid = false;
            } else if (!validateMobile(credentials.mobile)) {
                newErrors.mobile = "Invalid mobile number (10 digits)";
                valid = false;
            } else {
                newErrors.mobile = "";
            }

            if (!credentials.country) {
                newErrors.country = "Country is required";
                valid = false;
            } else {
                newErrors.country = "";
            }

            if (!credentials.password) {
                newErrors.password = "Password is required";
                valid = false;
            } else if (!validatePassword(credentials.password)) {
                newErrors.password = "Password must be at least 6 characters";
                valid = false;
            } else {
                newErrors.password = "";
            }
        }

        if (activeForm === 'forgot') {
            if (!credentials.email) {
                newErrors.email = "Email is required";
                valid = false;
            } else if (!validateEmail(credentials.email)) {
                newErrors.email = "Invalid email format";
                valid = false;
            } else {
                newErrors.email = "";
            }
        }

        if (activeForm === 'otp') {
            if (!credentials.otp) {
                newErrors.otp = "OTP is required";
                valid = false;
            } else if (!validateOTP(credentials.otp)) {
                newErrors.otp = "OTP must be 6 digits";
                valid = false;
            } else {
                newErrors.otp = "";
            }
        }

        if (activeForm === 'newPassword') {
            if (!credentials.newPassword) {
                newErrors.newPassword = "New password is required";
                valid = false;
            } else if (!validatePassword(credentials.newPassword)) {
                newErrors.newPassword = "Password must be at least 6 characters";
                valid = false;
            } else {
                newErrors.newPassword = "";
            }

            if (!credentials.confirmPassword) {
                newErrors.confirmPassword = "Please confirm password";
                valid = false;
            } else if (credentials.newPassword !== credentials.confirmPassword) {
                newErrors.confirmPassword = "Passwords don't match";
                valid = false;
            } else {
                newErrors.confirmPassword = "";
            }
        }

        setErrors(newErrors);
        return valid;
    };

    const handleShow = () => {
        setShow(true);
        resetForms();
    };
    const sendMail = async (fullname, email, type, id) => {
        try {
            const response = await axios.post(
                '/api/send',
                {
                    fullname,
                    email,
                    type,
                    id
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.success) {
                toast.success('Check your email and verify your account!');
                return true;
            } else {
                toast.error('Error sending email: ' + (response.data.error || 'Unknown error'));
                return false;
            }
        } catch (error) {
            console.error('Error sending email:', error);
            toast.error('Failed to send verification email');
            return false;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            if (!validateForm()) return;

            // Create a plain object instead of FormData
            const userData = {
                name: credentials.fullname,
                email: credentials.email,
                mobile: credentials.mobile,
                password: credentials.password,
                country: credentials.country
            };

            const response = await axios.post(`${apiversion}/users`, userData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.status === 200 || response.data.status === 201) {
                const mailSent = await sendMail(
                    credentials.fullname,
                    credentials.email,
                    "sign-up",
                    response.data.user.id
                );

                if (mailSent) {
                    resetForms();
                    handleClose();
                    toast.success('Account created successfully! Please check your email for verification.');
                }
            } else if (response.data.status === 409) {
                toast.success(response.data.message);
            } else if (response.data.status === 422) {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error occurred:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Some technical error occurred');
            } else {
                toast.error('Some technical error occurred');
            }
        }
    };
    const handleClose = () => {
        setShow(false);
        resetForms();
    };

    const resetForms = () => {
        setCredentials({
            fullname: "",
            email: "",
            mobile: "",
            password: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
            country: ""
        });
        setErrors({
            fullname: "",
            email: "",
            mobile: "",
            password: "",
            otp: "",
            newPassword: "",
            confirmPassword: "",
            country: ""
        });
        setActiveForm('login');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const res = await signIn('credentials', {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        });

        if (res?.status === 401) {
            toast.error("Invalid credentials");
        } else {
            handleClose();
            resetForms();
            toast.success("Login Successfully!!");

        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Simulate forgot password process
        const otp = generateOtp();
        setGeneratedOtp(otp);
        console.log("Generated OTP:", otp);
        setActiveForm('otp');
        toast.success("OTP sent to your email");
    };

    const handleOtpVerify = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        if (credentials.otp === generatedOtp) {
            console.log("OTP Verified successfully");
            toast.success("OTP verified successfully");
            setActiveForm('newPassword');
        } else {
            console.log("Invalid OTP");
            toast.error("Invalid OTP");
        }
    };

    const handleNewPassword = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Simulate password reset
        console.log("Password reset to:", credentials.newPassword);
        toast.success("Password changed successfully");
        setActiveForm('login');
    };

    const handleChange = (e) => {
        const { id, value } = e.target;

        // For OTP field, only allow numbers and limit to 6 digits
        if (id === 'otp') {
            const numericValue = value.replace(/\D/g, '').slice(0, 6);
            setCredentials(prev => ({ ...prev, [id]: numericValue }));
        }
        // For mobile field, only allow numbers and limit to 10 digits
        else if (id === 'mobile') {
            const numericValue = value.replace(/\D/g, '').slice(0, 10);
            setCredentials(prev => ({ ...prev, [id]: numericValue }));
        }
        else {
            setCredentials(prev => ({ ...prev, [id]: value }));
        }
    };

    const getModalTitle = () => {
        switch (activeForm) {
            case 'login': return "Log In";
            case 'signup': return "Sign Up";
            case 'forgot': return "Forgot Password";
            case 'otp': return "Verify OTP";
            case 'newPassword': return "Set New Password";
            default: return "Authentication";
        }
    };

    return (
        <>
            <Button variant="outline-primary" onClick={handleShow} className="rounded-4">
                <FaRegCircleUser className="me-3 fs-5" />Sign in
            </Button>

            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
                    <Modal.Title>{getModalTitle()}</Modal.Title>
                    <button type="button" onClick={handleClose} className="bg-transparent border-0">
                        <AiOutlineCloseCircle className="fs-4" />
                    </button>
                </Modal.Header>

                <Modal.Body>
                    {/* Login Form */}
                    {activeForm === 'login' && (
                        <form className="row g-3 p-3" onSubmit={handleLogin}>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    onChange={handleChange}
                                    value={credentials.email}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    onChange={handleChange}
                                    value={credentials.password}
                                    required
                                />
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-primary w-100 fw-semibold fs-5 mb-2" type="submit">Login</button>
                                <span
                                    className='text-primary cursor-pointer'
                                    onClick={() => setActiveForm('forgot')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Forgot password?
                                </span>
                            </div>
                            <hr className="my-2" />
                            <div className="col-12 text-center">
                                <button
                                    className="btn btn-danger w-75 fw-semibold"
                                    type="button"
                                    onClick={() => setActiveForm('signup')}
                                >
                                    Create an account
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Sign Up Form */}
                    {activeForm === 'signup' && (
                        <form className="row g-3 p-3" onSubmit={handleSignup}>
                            <div className="col-12">
                                <label htmlFor="fullname" className="form-label">Full name</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                    id="fullname"
                                    onChange={handleChange}
                                    value={credentials.fullname}
                                    required
                                />
                                {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    onChange={handleChange}
                                    value={credentials.email}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="mobile" className="form-label">Mobile</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                                    id="mobile"
                                    onChange={handleChange}
                                    value={credentials.mobile}
                                    maxLength={10}
                                    required
                                />
                                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="country" className="form-label">Country</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                    id="country"
                                    onChange={handleChange}
                                    value={credentials.country}
                                    required
                                />
                                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    onChange={handleChange}
                                    value={credentials.password}
                                    required
                                />
                                <small className="text-muted">Password must be at least 6 characters</small>
                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-danger w-100 fw-semibold fs-5 mb-2" type="submit">Sign Up</button>
                            </div>

                            <hr className="my-2" />

                            <div className="col-12 text-center">
                                <button
                                    className="btn btn-primary w-75 fw-semibold"
                                    type="button"
                                    onClick={() => setActiveForm('login')}
                                >
                                    Already have an account? Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Forgot Password Form */}
                    {activeForm === 'forgot' && (
                        <form className="row g-3 p-3" onSubmit={handleForgotPassword}>
                            <div className="col-12">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                    onChange={handleChange}
                                    value={credentials.email}
                                    required
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-primary w-100 fw-semibold fs-5 mb-2" type="submit">Reset Password</button>
                            </div>
                            <hr className="my-2" />
                            <div className="col-12 text-center">
                                <button
                                    className="btn btn-dark w-75 fw-semibold"
                                    type="button"
                                    onClick={() => setActiveForm('login')}
                                >
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    )}

                    {/* OTP Verification Form */}
                    {activeForm === 'otp' && (
                        <form className="row g-3 p-3" onSubmit={handleOtpVerify}>
                            <div className="col-12">
                                <label htmlFor="otp" className="form-label">Enter OTP</label>
                                <div className="d-flex justify-content-between mb-3">
                                    {[0, 1, 2, 3, 4, 5].map((index) => (
                                        <input
                                            key={index}
                                            type="text"
                                            className={`form-control text-center mx-1 ${errors.otp ? 'is-invalid' : ''}`}
                                            style={{ width: '50px', height: '50px', fontSize: '1.2rem' }}
                                            maxLength={1}
                                            inputMode="numeric"
                                            pattern="[0-9]"
                                            value={credentials.otp[index] || ''}
                                            onChange={(e) => {
                                                // Allow only numbers
                                                const value = e.target.value.replace(/\D/g, '');

                                                // Update the OTP value
                                                const newOtp = credentials.otp.split('');
                                                newOtp[index] = value;
                                                setCredentials(prev => ({ ...prev, otp: newOtp.join('') }));

                                                // Auto-focus to next input
                                                if (value && index < 5) {
                                                    document.getElementById(`otp-${index + 1}`)?.focus();
                                                }
                                            }}
                                            onKeyDown={(e) => {
                                                // Handle backspace to move to previous input
                                                if (e.key === 'Backspace' && !credentials.otp[index] && index > 0) {
                                                    document.getElementById(`otp-${index - 1}`)?.focus();
                                                }
                                            }}
                                            id={`otp-${index}`}
                                        />
                                    ))}
                                </div>
                                <small className="text-muted">Check your email for the OTP</small>
                                {errors.otp && <div className="invalid-feedback d-block">{errors.otp}</div>}
                            </div>

                            <div className="col-12 text-center">
                                <button
                                    className="btn btn-success w-100 fw-semibold fs-5 mb-2"
                                    type="submit"
                                    disabled={credentials.otp.length !== 6}
                                >
                                    Verify OTP
                                </button>
                            </div>
                        </form>
                    )}

                    {/* New Password Form */}
                    {activeForm === 'newPassword' && (
                        <form className="row g-3 p-3" onSubmit={handleNewPassword}>
                            <div className="col-12">
                                <label htmlFor="newPassword" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                    id="newPassword"
                                    onChange={handleChange}
                                    value={credentials.newPassword}
                                    required
                                    minLength={6}
                                />
                                <small className="text-muted">Minimum 6 characters</small>
                                {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
                            </div>

                            <div className="col-12">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                    id="confirmPassword"
                                    onChange={handleChange}
                                    value={credentials.confirmPassword}
                                    required
                                    minLength={6}
                                />
                                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                            </div>

                            <div className="col-12 text-center">
                                <button className="btn btn-success w-100 fw-semibold fs-5 mb-2" type="submit">Set New Password</button>
                            </div>
                        </form>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Login;