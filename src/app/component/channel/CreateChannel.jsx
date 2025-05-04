'use client';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';

function CreateChannel() {
    const { data: session, status } = useSession();

    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        banner: "",
        profile: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [preview, setPreview] = useState({
        banner: null,
        profile: null
    });

    const [credentials, setCredentials] = useState({
        name: "",
        description: "",
        banner: null,
        profile: null
    });
    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    }

    const handleClose = () => {
        setShow(false);
        setApiError("");
        setErrors({
            name: "",
            description: "",
            banner: "",
            profile: ""
        });
        setPreview({
            banner: null,
            profile: null
        });
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setCredentials(prev => ({ ...prev, [name]: files[0] }));

            // Create preview
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(prev => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        }
    };

    const handleChannel = async (e) => {
        e.preventDefault();
        setApiError("");

        const newErrors = {};
        if (!credentials.name.trim()) newErrors.name = "Channel name is required";
        if (!credentials.description.trim()) newErrors.description = "Description is required";
        if (!credentials.banner) newErrors.banner = "Banner image is required";
        if (!credentials.profile) newErrors.profile = "Profile image is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append("userId", session.user.id);
                formData.append("name", credentials.name);
                formData.append("description", credentials.description);
                formData.append("banner", credentials.banner);
                formData.append("profile", credentials.profile);

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_APIVERSION}/channel`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                // Reset form
                setCredentials({
                    name: "",
                    description: "",
                    banner: null,
                    profile: null
                });
                setPreview({
                    banner: null,
                    profile: null
                });

                handleClose();

                toast.success('channel created successfully. You may login again!!');
                handleLogout();
            } catch (error) {
                console.error('Error creating channel:', error);
                setApiError(error.response?.data?.message || "Failed to create channel");
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <span className="text-primary cursor-pointer" onClick={() => setShow(true)}>
                Create Channel
            </span>

            <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
                    <Modal.Title>Create a Channel</Modal.Title>
                    <button type="button" onClick={handleClose} className="bg-transparent border-0">
                        <AiOutlineCloseCircle className="fs-4" />
                    </button>
                </Modal.Header>

                <Modal.Body>
                    {apiError && (
                        <div className="alert alert-danger">{apiError}</div>
                    )}
                    <form className="row g-3 p-3" onSubmit={handleChannel}>
                        <div className="col-12">
                            <label htmlFor="name" className="form-label">Channel Name</label>
                            <input
                                type="text"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                id="name"
                                name="name"
                                onChange={(e) => {
                                    setCredentials(prev => ({ ...prev, name: e.target.value }));
                                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                                }}
                                value={credentials.name}
                                maxLength={50}
                            />
                            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                            <small className="text-muted">{credentials.name.length}/50 characters</small>
                        </div>

                        <div className="col-12">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                name="description"
                                id="description"
                                placeholder="Tell viewers about your channel"
                                onChange={(e) => {
                                    setCredentials(prev => ({ ...prev, description: e.target.value }));
                                    if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
                                }}
                                value={credentials.description}
                                maxLength={500}
                                rows={3}
                            />
                            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                            <small className="text-muted">{credentials.description.length}/500 characters</small>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="banner" className="form-label">Banner Image</label>
                            <input
                                type="file"
                                className={`form-control ${errors.banner ? 'is-invalid' : ''}`}
                                id="banner"
                                name="banner"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {errors.banner && <div className="invalid-feedback">{errors.banner}</div>}
                            {preview.banner && (
                                <div className="mt-2">
                                    <img
                                        src={preview.banner}
                                        alt="Banner preview"
                                        className="img-fluid rounded"
                                        style={{ maxHeight: '150px' }}
                                    />
                                </div>
                            )}
                            <small className="text-muted">Recommended size: 1280x720 pixels</small>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="profile" className="form-label">Profile Image</label>
                            <input
                                type="file"
                                className={`form-control ${errors.profile ? 'is-invalid' : ''}`}
                                id="profile"
                                name="profile"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {errors.profile && <div className="invalid-feedback">{errors.profile}</div>}
                            {preview.profile && (
                                <div className="mt-2">
                                    <img
                                        src={preview.profile}
                                        alt="Profile preview"
                                        className="img-fluid rounded-circle"
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                </div>
                            )}
                            <small className="text-muted">Square image recommended</small>
                        </div>

                        <div className="col-12 text-center mt-4">
                            <button
                                className="btn btn-primary px-4 py-2 fw-semibold"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Creating...
                                    </>
                                ) : 'Create Channel'}
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default CreateChannel;