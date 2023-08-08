import React from 'react'

const Navbar = () => {
    return (
        <div  >
            <nav className="navbar navbar-expand-lg bg-body-tertiary  bg-dark " data-bs-theme="dark">
                <div className="container-fluid mx-5">
                    <a className="navbar-brand" href=" "><i className="fa-solid fa-file-video mx-2"></i>VidConvert</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active " aria-current="page" href=" ">Home</a>
                            </li>
                           
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href=" " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                   Convert
                                </a>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href=" "> MP4 to WEBM</a></li>
                                    <li><a className="dropdown-item" href=" ">WEBM to MP4</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href=" ">Other</a></li>
                                </ul>
                            </li>
                            
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2 " type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
