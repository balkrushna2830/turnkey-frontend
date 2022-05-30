import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { AddNewImage, DeleteImage, GetAllImages, UpdateImage } from './Helper';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';

const ImagesContent = () => {
    const navigate = useNavigate();
    const [img, setImg] = useState({
        name: '',
        data: '',
    });
    const [reloadData, setReloadData] = useState(false);
    const [images, setImages] = useState([]);
    const [editData, setEditData] = useState({
        name: '',
        data: '',
        id: ''
    })
    const setDataForEdit = (e, id, name, data) => {
        e.preventDefault();
        setEditData({
            name: name,
            data: data,
            id: id
        })
    }
    useEffect(() => {
        GetAllImages().then((data) => {
            var Images = [];
            data.images.map((image, index) => {
                Images.push({
                    id: image._id,
                    src: process.env.REACT_APP_HOST+`${image.data}`,
                    caption: image.name
                })
            })
            setImages(Images)
        }).catch((err) => {
            console.log(err);
        })
    }, [reloadData])
    const handleChange = (name, event) => {
        event.preventDefault();
        if (name === "data") {
            setImg({ ...img, error: false, data: event.target.files[0] })
        } else {
            setImg({ ...img, error: false, [name]: event.target.value })
        }
    }
    const addImg = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('name', img.name);
        formData.append('data', img.data);
        AddNewImage(formData).then((data) => {
            if (data.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Image Added Successfully',
                    icon: 'success',
                })
                setImg({
                    name: '',
                    data: ''
                })
            } else {
                Swal.fire({
                    title: 'Fail',
                    text: 'Failed to add image',
                    icon: 'error',
                })
            }
            $('#close-btn').click();
            setReloadData(!reloadData);
        }).catch((err) => {
            console.log(err);
        })
    }
    const updateImg = (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('name', img.name);
        formData.append('data', img.data);
        UpdateImage(formData, editData.id).then((data) => {
            if (data.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Image Updated Successfully',
                    icon: 'success',
                })
                setImg({
                    name: '',
                    data: ''
                })
            } else {
                Swal.fire({
                    title: 'Fail',
                    text: 'Failed to update image',
                    icon: 'error',
                })
            }
            $('#close-btn').click();
            setReloadData(!reloadData);
        }).catch((err) => {
            console.log(err);
        })
    }
    const deleteImage = (id, name, e) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to delete" + name + " ?",
            showDenyButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                DeleteImage(id).then((data) => {
                    if (data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Image Added Successfully',
                            icon: 'success',
                        })
                        setImg({
                            name: '',
                            data: ''
                        })
                        setReloadData(!reloadData);
                    } else {
                        Swal.fire({
                            title: 'Fail',
                            text: 'Failed to add image',
                            icon: 'error',
                        })
                    }
                })
            }
        })
    }
    return (
        <div className="content content-dashboard">
            <div className="container container-fluid">
                <div className="row p-3 pt-4">
                    <div className="col-4"><h3>Images</h3></div>
                    <div className="col-4"></div>
                    <div className="col-4">
                        <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-image">Add Image <i className='bx bx-image-add fs-5' style={{ verticalAlign: 'middle' }} ></i></button>
                    </div>
                </div>
            </div>
            <section className="">
                <div className="row m-3">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                <div
                                    className="bg-image hover-overlay ripple shadow-1-strong rounded"
                                    data-ripple-color="light"
                                >
                                    <img
                                        src={image.src}
                                        className="w-100 h-100 m-2"
                                        alt={image.caption}
                                    />
                                    <br></br>
                                    <div className="row">
                                        <h4 className="col" style={{ textAlign: 'center' }}>{image.caption}</h4>
                                        <div className="col btn-group" role="group" aria-label="Basic example">
                                            <button type="button" onClick={e => setDataForEdit(e, image.id, image.name, image.data)} data-bs-toggle="modal" data-bs-target="#update-image" className="btn btn-primary"><i className='bx bxs-pencil m-1'></i></button>
                                            <button type="button" onClick={e => deleteImage(image.id, image.caption, e)} className="btn btn-danger"><i className='bx bxs-trash m-1' ></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </section>
            <div className="modal fade" style={{ width: '100%' }} id="add-image" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={addImg} encType='multipart/form-data'>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Add Image</h5>
                                <button type="button" id='close-btn' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name" className="form-label">Name</label>
                                <div className="input-group mb-3">
                                    <input style={{ height: '100%' }} type="text" maxLength={30} className="form-control" id="name" onChange={e => handleChange("name", e)} required />
                                </div>
                                <label htmlFor="imgFile" className="form-label">Select File</label>
                                <div className="input-group mb-3">
                                    <input accept=".png, .jpg, .jpeg" style={{ height: '100%' }} type="file" className="form-control" id="imgFile" onChange={e => handleChange("data", e)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-success" type="submit">Add Image</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="modal fade" style={{ width: '100%' }} id="update-image" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <form onSubmit={updateImg} encType='multipart/form-data'>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Update Image</h5>
                                <button type="button" id='close-btn' className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <label htmlFor="name" className="form-label">Name</label>
                                <div className="input-group mb-3">
                                    <input style={{ height: '100%' }} type="text" maxLength={30} className="form-control" id="name" onChange={e => handleChange("name", e)} required />
                                </div>
                                <label htmlFor="imgFile" className="form-label">Select File</label>
                                <div className="input-group mb-3">
                                    <input accept=".png, .jpg, .jpeg" style={{ height: '100%' }} type="file" className="form-control" id="imgFile" onChange={e => handleChange("data", e)} required />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button className="btn btn-success" type="submit">Update Image</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ImagesContent