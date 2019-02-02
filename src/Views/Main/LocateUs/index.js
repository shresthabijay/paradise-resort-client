import React, { Component } from "react";
import "../../../Static/contact.css";

import AOS from "aos";
import "../../../../node_modules/aos/dist/aos.css";
//install npm aos
class Map extends Component {
  constructor(props, context) {
    super(props, context);
    AOS.init();
  }

  componentWillReceiveProps() {
    AOS.refresh();
  }
  render() {
    return (
      <div>
        <article>
          <div className="contact">
            <div className="contact_map">
              <iframe
                width="100%"
                height="800"
                src="https://maps.google.com/maps?width=100%&amp;height=800&amp;hl=en&amp;coord=27.61866315,85.53822628&amp;q=Kathmandu%20University%2C%20Dhulikhel+(Paradise%20Resort)&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
              >
                <a href="https://www.maps.ie/map-my-route/">Map a route</a>
              </iframe>
              {/* <img src="https://pix6.agoda.net/hotelImages/271/271771/271771_15072410370032940612.jpg?s=1024x768" /> */}
            </div>

            <br />
            <div className="contact_text">
              <center>
                <h2>Headquarters</h2>
                <h6>
                  <p> Paradise Resort </p>
                  <p> PO Box 1234 KU </p>
                  <p> Kavre – 1 | 1234 | Nepal </p>
                  <p> T: +977 123 | F: +977 123 </p>
                </h6>
              </center>
            </div>
            <div className="contact_foreground ">
              <img src="https://openclipart.org/image/2400px/svg_to_png/279086/Tropical-Foliage-Silhouette.png" />

              <div
                class="top-left"
                data-aos="fade-right"
                data-aos-duration="3000"
              >
                <p>
                  <h3>Address:</h3>
                  <br />
                  <h4>Kavre – 1 | 1234 | Nepal</h4>
                </p>
              </div>
              <div
                class="top-right"
                data-aos="fade-left"
                data-aos-duration="3000"
              >
                <h3>Phone No</h3>
                <br />
                <h4>+977-9696969696</h4>
              </div>

              <div
                class="centered"
                data-aos="fade-down"
                data-aos-duration="3000"
              >
                <h3>E-mail</h3>
                <br />
                <h4>parasort7@gmail.com</h4>
              </div>
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default Map;

//https://openclipart.org/image/2400px/svg_to_png/279086/Tropical-Foliage-Silhouette.png
