<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { HomeRouteRecord, ProfileRouteRecord } from '../Router';


</script>

<template>

    <header id="header" class="site-header header-scrolled text-black bg-light">
        <nav id="header-nav" class="navbar navbar-expand-lg px-3 mb-3">
        <div class="container-fluid">
            <router-link :to="HomeRouteRecord">
                <img src="images/main-logo.png" class="logo">
            </router-link>
            <button class="navbar-toggler d-flex d-lg-none order-3 p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar" aria-controls="bdNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <svg class="navbar-icon">
                <use xlink:href="#navbar-icon"></use>
            </svg>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="bdNavbar" aria-labelledby="bdNavbarOffcanvasLabel">
            <div class="offcanvas-header px-4 pb-0">
                <a class="navbar-brand" href="index.html">
                <img src="images/main-logo.png" class="logo">
                </a>
                <button type="button" class="btn-close btn-close-black" data-bs-dismiss="offcanvas" aria-label="Close" data-bs-target="#bdNavbar"></button>
            </div>
            <div class="offcanvas-body">
                <ul id="navbar" class="navbar-nav text-uppercase justify-content-end align-items-center flex-grow-1 pe-3">
                <li class="nav-item">
                    <a class="nav-link me-4 active" href="#billboard">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link me-4" href="#company-services">Services</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link me-4" href="#mobile-products">Products</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link me-4" href="#smart-watches">Watches</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link me-4" href="#yearly-sale">Sale</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link me-4" href="#latest-blog">Blog</a>
                </li>
                
                <li class="nav-item">
                    <div class="user-items ps-5">
                    <ul class="d-flex justify-content-between list-unstyled w-10">
                        <li class="search-item pe-3">
                        <a href="#" class="search-button">
                            <svg class="search">
                            <use xlink:href="#search"></use>
                            </svg>
                        </a>
                        </li>
                        <li class="pe-3">
                        <router-link :to="ProfileRouteRecord">
                            <svg class="user">
                            <use xlink:href="#user"></use>
                            </svg>
                        </router-link>
                        </li>
                        <li>
                        <a href="cart.html">
                            <svg class="cart">
                            <use xlink:href="#cart"></use>
                            </svg>
                        </a>
                        </li>
                    </ul>
                    </div>
                </li>
                </ul>
            </div>
            </div>
        </div>
        </nav>
    </header> 
</template>
