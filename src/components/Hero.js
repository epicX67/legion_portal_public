import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Hero.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const HeroCard = dynamic(() => import("./HeroCard"), { ssr: false });

export default function Hero({ data }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // fade: true,
    autoplaySpeed: 3000,
    autoplay: true,
  };

  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Slider className="heroSlider" {...settings}>
        {data.map((item, key) => (
          <HeroCard
            onPlay={() => router.push(`/game/${item.name.toLowerCase()}`)}
            key={key}
            item={item}
            show={show}
            setShow={setShow}
          />
        ))}
      </Slider>
    </div>
  );
}
