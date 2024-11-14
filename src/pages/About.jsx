import React from "react";
import Layout from "../layouts/Layout";
import Collections from "./Collections";
import Services from "../components/Services";
export default function About() {
  return (
    <Layout>
      <main>
        <div class="page-notification">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb justify-content-center">
                    <li class="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="/about">about</a>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div class="about-area">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="section-tittle mb-60 text-center pt-10">
                  <h2>Our Story</h2>
                  <p class="pera">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="about-img pb-bottom">
                  <img
                    src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731582475/1731158072971_je7sxd.png"
                    alt=""
                    class="w-100"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="section-tittle mb-60 text-center pt-10">
                  <h2>Journey start from</h2>
                  <p class="pera">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="about-img pb-bottom">
                  <img
                    src="assets/img/gallery/about2.png"
                    alt=""
                    class="w-100"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-content-center">
              <div class="col-lg-10">
                <div class="section-tittle mb-60 text-center pt-10">
                  <h2>2020</h2>
                  <p class="pera">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Collections />

        <Services />
      </main>
    </Layout>
  );
}
