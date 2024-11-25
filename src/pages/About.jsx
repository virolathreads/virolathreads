import React from "react";
import Layout from "../layouts/Layout";
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
                      <a href="/about">About</a>
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
                    Virola Threads celebrates African heritage through
                    contemporary fashion. Founded to bridge tradition and
                    modernity, the brand reimagines iconic fabrics like Aso-Oke
                    and Ankara into versatile, everyday pieces. By blending
                    cultural craftsmanship with modern design. Virola Threads
                    empowers individuals to wear their roots proudly, making
                    every piece a story of identity, elegance, and innovation.
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
                  <h2>Journey start from 2019</h2>
                  <p class="pera">
                    Virola Threads began as a dream fueled by passion and
                    determination. Virtue, inspired by the beauty of African
                    fabrics and traditions, set out to create a brand that
                    celebrated her heritage while embracing modern trends.
                    Starting small with bespoke designs, she worked tirelessly
                    to perfect her craft. Today, Virola Threads bridges the gap
                    between tradition and contemporary fashion, telling stories
                    through every stitch.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* <Services /> */}
      </main>
    </Layout>
  );
}
