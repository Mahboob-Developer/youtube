import React from 'react'
import { FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function CreateVideo() {
    const { data: session, status } = useSession();
    const [type, settype] = useState('video');
    const [show, setShow] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
        description: "",
        thumbnail: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState("");
    const [preview, setPreview] = useState({
        thumbnail: null,
    });

    const [credentials, setCredentials] = useState({
        title: "",
        description: "",
        thumbnail: "",
    });
    const handleClose = () => {
        setShow(false);
        setApiError("");
        setErrors({
            title: "",
            description: "",
            thumbnail: "",
            userId: null
        });
        setPreview({
            thumbnail: null,
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
    const handlePlaylist = async (e) => {
        e.preventDefault();
        setApiError("");

        const newErrors = {};
        if (!credentials.title.trim()) newErrors.title = "Channel name is required";
        if (!credentials.description.trim()) newErrors.description = "Description is required";
        if (!credentials.thumbnail) newErrors.thumbnail = "thumbnail image is required";

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            try {
                const formData = new FormData();
                formData.append("userId", session.user.id);
                formData.append("title", credentials.title);
                formData.append("description", credentials.description);
                formData.append("thumbnail", credentials.thumbnail);

                const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_APIVERSION}/playlist`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

                // Reset form
                setCredentials({
                    title: "",
                    description: "",
                    thumbnail: null,
                });
                setPreview({
                    thumbnail: null,
                });

                handleClose();

                toast.success('Playlist created successfully');
            } catch (error) {
                console.error('Error creating channel:', error);
                setApiError(error.response?.data?.message || "Failed to create channel");
            } finally {
                setIsLoading(false);
            }
        }
    }
    return (
        <>
            {/* <IoIosPlay className="border border-black" /><span className="ms-2">Upload video</span> */}
            <span className={` dropdown-item flex items-center px-4 py-2 cursor-pointer `} onClick={() => setShow(true)}>
                <FiPlus className="border border-black" /><span className="ms-2"> Create Playlist</span>
            </span>
            <Modal show={show} onHide={handleClose} backdrop="static" size="lg">
                <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
                    <Modal.Title>Create a Video</Modal.Title>
                    <button type="button" onClick={handleClose} className="bg-transparent border-0">
                        <AiOutlineCloseCircle className="fs-4" />
                    </button>
                </Modal.Header>
            
                <Modal.Body>
                    {type === 'video' && <>
                        {apiError && (
                            <div className="alert alert-danger">{apiError}</div>
                        )}
                        <form className="row g-3 p-3" onSubmit={handlePlaylist}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="title"
                                    name="title"
                                    onChange={(e) => {
                                        setCredentials(prev => ({ ...prev, title: e.target.value }));
                                        if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                                    }}
                                    value={credentials.title}
                                    maxLength={50}
                                    required
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                <small className="text-muted">{credentials.title.length}/50 characters</small>
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
                                    required
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                <small className="text-muted">{credentials.description.length}/500 characters</small>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="thumbnail" className="form-label">thumbnail Image</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.thumbnail ? 'is-invalid' : ''}`}
                                    id="thumbnail"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.thumbnail && <div className="invalid-feedback">{errors.thumbnail}</div>}
                                {preview.thumbnail && (
                                    <div className="mt-2">
                                        <img
                                            src={preview.thumbnail}
                                            alt="thumbnail preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '150px' }}
                                        />
                                    </div>
                                )}
                                <small className="text-muted">Recommended size: 1280x720 pixels</small>
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
                                    ) : 'Create Playlist'}
                                </button>
                            </div>
                        </form>
                    </>}
                    {type === 'playlist' && <>
                        {apiError && (
                            <div className="alert alert-danger">{apiError}</div>
                        )}
                        <form className="row g-3 p-3" onSubmit={handlePlaylist}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">title</label>
                                <input
                                    type="text"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    id="title"
                                    name="title"
                                    onChange={(e) => {
                                        setCredentials(prev => ({ ...prev, title: e.target.value }));
                                        if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
                                    }}
                                    value={credentials.title}
                                    maxLength={50}
                                    required
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                                <small className="text-muted">{credentials.title.length}/50 characters</small>
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
                                    required
                                />
                                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                                <small className="text-muted">{credentials.description.length}/500 characters</small>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="thumbnail" className="form-label">thumbnail Image</label>
                                <input
                                    type="file"
                                    className={`form-control ${errors.thumbnail ? 'is-invalid' : ''}`}
                                    id="thumbnail"
                                    name="thumbnail"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    required
                                />
                                {errors.thumbnail && <div className="invalid-feedback">{errors.thumbnail}</div>}
                                {preview.thumbnail && (
                                    <div className="mt-2">
                                        <img
                                            src={preview.thumbnail}
                                            alt="thumbnail preview"
                                            className="img-fluid rounded"
                                            style={{ maxHeight: '150px' }}
                                        />
                                    </div>
                                )}
                                <small className="text-muted">Recommended size: 1280x720 pixels</small>
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
                                    ) : 'Create Playlist'}
                                </button>
                            </div>
                        </form>
                    </>}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CreateVideo