import React, { useState } from "react";
import 'gestalt/dist/gestalt.css'
import { auth } from "../firebase/firebase";
import { getUser } from "../app/user";

function Header() {
    const user = auth.currentUser;

    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand">eDocument</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Trang chủ</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/document">Tài liệu</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Mẫu tài liệu</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Chứng thư</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Báo cáo</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="#">Cài đặt</a>
                    </li>
                </ul>

                <ul class="navbar-nav ml-auto mb-2 mb-lg-0" style={{paddingLeft: '10px'}}>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {user?.email}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="">Profile</a></li>
                            <li><hr class="#" /></li>
                            <li><a class="dropdown-item" href="/" onClick={() => {auth.signOut()}}>Đăng xuất</a></li>
                        </ul>
                    </li>

                    <form class="d-flex" role="search" method="POST" action="">
                    <input class="form-control me-2" name="search" type="search" placeholder="Tìm kiếm..." aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">
                        Search
                    </button>
                    </form>
                </ul>
                </div>
            </div>
            </nav>
    )
}

export default Header;