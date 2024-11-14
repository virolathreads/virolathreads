import React from "react";
 // You can use this to add custom CSS for further styling

export default function Header() {
  return (
    <header>
      <div className="header-area">
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="menu-wrapper d-flex align-items-center justify-content-between">
              <div className="header-left d-flex align-items-center">
                <div className="logo">
                  <a href="/">
                    <img
                      src="https://res.cloudinary.com/dd0mdsb3h/image/upload/v1731457982/ef3tnweirfwsvvd1djwc.png"
                      className="logo-img"
                      alt="Logo"
                    />
                  </a>
                </div>

                <div className="main-menu d-none d-lg-block">
                  <nav>
                    <ul id="navigation">
                      <li>
                        <a href="/">Home</a>
                      </li>
                      <li>
                        <a href="/shop">Shop</a>
                      </li>
                      <li>
                        <a href="/about">About</a>
                      </li>
                      <li>
                        <a href="#">Blog</a>
                        <ul className="submenu">
                          <li>
                            <a href="/blog">Blog</a>
                          </li>
                          <li>
                            <a href="/blog-details">Blog Details</a>
                          </li>
                          <li>
                            <a href="/elements">Elements</a>
                          </li>
                          <li>
                            <a href="/product_details">Product Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="header-right1 d-flex align-items-center">
                <div className="header-social d-none d-md-block">
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://bit.ly/sai4ull">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#">
                    <i className="fab fa-pinterest-p"></i>
                  </a>
                </div>

                <div className="search d-none d-md-block">
                  <ul className="d-flex align-items-center">
                    <li className="mr-15">
                      <div className="nav-search search-switch">
                        <i className="ti-search"></i>
                      </div>
                    </li>
                    <li>
                      <div className="card-stor">
                        <img src="assets/img/gallery/card.svg" alt="Cart" />
                        <span>0</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
