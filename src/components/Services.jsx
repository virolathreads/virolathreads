import React from 'react';

function Services() {
  const services = [
    {
      title: 'Fast Delivery',
      description: 'Fast delivery on all orders.',
      icon: 'assets/img/icon/services1.svg',
    },
    {
      title: '24/7 Customer Support',
      description: 'Available anytime to assist with your needs.',
      icon: 'assets/img/icon/services2.svg',
    },
    {
      title: 'Secure Payment Options',
      description: 'Multiple payment methods with secure encryption.',
      icon: 'assets/img/icon/services3.svg',
    },
    {
      title: 'Exclusive Members Offers',
      description: 'Get access to special deals and discounts for members.',
      icon: 'assets/img/icon/services4.svg',
    },
  ];

  return (
    <div className="categories-area section-padding40 gray-bg">
      <div className="container-fluid">
        <div className="row">
          {services.map((service, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
              <div
                className="single-cat mb-50 wow fadeInUp"
                data-wow-duration="1s"
                data-wow-delay={`${0.2 + index * 0.2}s`}
              >
                <div className="cat-icon">
                  <img src={service.icon} alt={service.title} />
                </div>
                <div className="cat-cap">
                  <h5>{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
