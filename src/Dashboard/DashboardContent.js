import React, { useEffect, useState } from 'react'
import { isAuthenticated, Logout } from '../Auth/Helper';
import Avtar from '../Assets/avtar.png';
import CountUp from 'react-countup';
import { GetImagesCount } from './Helper';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const DashboardContent = () => {
    const [user, setUser] = useState();
    const [imgCount, setImgCount] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        setUser(isAuthenticated().user)
        GetImagesCount().then((data) => {
            setImgCount(data.images);
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    const logout = (e) => {
        e.preventDefault();
        Logout().then((data) => {
            Swal.fire({
                title: 'Success',
                text: 'Logout Successful',
                icon: 'success',
            })
            navigate('/');
        }).catch((err) => console.log(err));
    }
    return (
        <div className="content content-dashboard">
            <div className="container container-fluid">
                <div className="row p-3 pt-4">
                    <div className="col-3"><h3>Overview</h3></div>
                    <div className="col-3"></div>
                    <div className="col-6">
                        <div className="float-end">
                            <i className='bx bx-search fs-5 m-2 me-3 float-start'></i>
                            <i className='bx bxs-bell fs-5 m-2 me-3 float-start' ></i>
                            <i onClick={e => logout(e)} className='bx bx-exit fs-5 m-2 me-3 float-start'></i>
                            <img className='float-end' src={Avtar} height={40} width={40} alt="User name" />
                            <h5 className='float-end m-2'>{user?.name}</h5>
                        </div>
                    </div>
                </div>
                <div className="container container-fluid mt-2">
                    <div className="row">
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="danger text-danger"><CountUp end={imgCount} duration={2} /></h3>
                                                <span className="danger text-danger">Images</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="bx bxs-image text-danger font-large-2 float-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="text-success"><CountUp end={16} duration={2} /></h3>
                                                <span className="text-success">Unresolved</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-user text-success font-large-2 float-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="text-warning"><CountUp end={43} duration={2} /></h3>
                                                <span className="text-warning">Open</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-pie-chart text-warning font-large-2 float-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 col-12">
                            <div className="card">
                                <div className="card-content">
                                    <div className="card-body">
                                        <div className="media d-flex">
                                            <div className="media-body text-left">
                                                <h3 className="text-primary"><CountUp end={64} duration={2} /></h3>
                                                <span className="text-primary">On hold</span>
                                            </div>
                                            <div className="align-self-center">
                                                <i className="icon-support text-primary font-large-2 float-right" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContent