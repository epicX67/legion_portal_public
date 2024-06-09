"use-client";
import Slider from "react-slick";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

function ShortGameCard({ gamedata }) {
    const targetRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.5 } // Change the threshold as per your requirement
        );

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

        return () => {
            if (targetRef.current) {
                observer.unobserve(targetRef.current);
            }
        };
    }, []);

    return (
        <>
            <div className="iframewrapper" ref={targetRef}>

                {isVisible && <iframe
                    title={gamedata.name}
                    // src={"https://google.com"}
                    src={gamedata.link}
                    className="game fullscreen"
                // allowFullScreen={true}
                ></iframe>

                }


            </div>
            {/* <iframe src={url} /> */}

            <div className="play-shorts-down-bar">
                <div className="lCont">
                    <div
                        className="play-shorts-logo"
                        style={{
                            backgroundImage: `url('${gamedata.squareImage}')`,
                        }}
                    ></div>
                    <div className="play-shorts-info">{gamedata.name}</div>
                </div>

                {/* <p className="legionStamp">
                    <span>
                        <img
                            src="https://cdn.discordapp.com/attachments/961665882671677493/1084136104409714688/logo.png"
                            alt=""
                        />
                        LEGiON
                    </span>
                    Portal
                </p> */}
            </div>
        </>

    );
}

function VerticalSwipeToSlide({ data }) {
    const router = useRouter();
    const settings = {
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
        swipeToSlide: false,
        nextArrow: null,
        prevArrow: null,


        beforeChange: function (currentSlide, nextSlide) {
            console.log("before change", currentSlide, nextSlide);
        },
        afterChange: function (currentSlide) {
            console.log("after change", currentSlide);
        }
    };

    let sliderRef = useRef(null);
    const next = () => {
        sliderRef.slickNext();
    };
    const previous = () => {
        sliderRef.slickPrev();
    };


    return (
        <div className="shorts-container">
            <div className="slider-container">
                <Slider ref={slider => {
                    sliderRef = slider;
                }} {...settings}>
                    {data.map((item, key) => (
                        <div class="gameCard" key={key}>
                            <ShortGameCard gamedata={item} />
                        </div>
                    ))}
                </Slider>
            </div>

            <div className="actionPanel">
                <div>
                    <i
                        className="ri-close-fill tooltip close-btn"
                        onClick={() => router.back()}
                    ></i>
                </div>
                <div>
                    <i
                        onClick={previous}
                        //   className={`ri-arrow-up-line tooltip up-btn ${
                        //     currPoint === 0 && "disabled"
                        //   }`}

                        className={`ri-arrow-up-line tooltip up-btn`}
                    ></i>
                    <i
                        onClick={next}
                        //   className={`ri-arrow-down-line tooltip down-btn ${
                        //     currPoint === data.length - 1 && "disabled"
                        //   }`}

                        className={`ri-arrow-down-line tooltip down-btn`}
                    ></i>
                </div>
                {/* <div>
                {yourFavourite ? (
                  <i
                    onClick={() => {
                      makeFavourite(gameInfo.name, false);
                    }}
                    style={{ color: "#E886B5" }}
                    className="ri-heart-2-fill tooltip rfevorite-btn"
                    // title="Remove from favorites"
                  ></i>
                ) : (
                  <i
                    onClick={() => {
                      makeFavourite(gameInfo.name, true);
                    }}
                    className="ri-heart-2-line tooltip afevorite-btn"
                    // title="Add to favorites"
                  ></i>
                )}
                <i
                  onClick={() => {
                    setShowShareModal(true);
                  }}
                  className="ri-share-line tooltip share-btn"
                ></i>
              </div> */}
            </div>
        </div>

    );
}

export default VerticalSwipeToSlide;