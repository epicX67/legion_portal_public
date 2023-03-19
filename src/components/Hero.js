import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.scss";
import HeroCard from "./HeroCard";
import { useState } from "react";

export default function Hero({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // fade: true,
    // autoplaySpeed: 3000,
    // autoplay: true,
  };

  const [show, setShow] = useState(false);

  return (
    <div>
      <Slider className="heroSlider" {...settings}>
        {data.map((item, key) => (
          <HeroCard key={key} item={item} show={show} setShow={setShow} />
        ))}
      </Slider>
    </div>
  );
}
