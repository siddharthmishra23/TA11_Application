import React from "react";
import "./Carousel.scss"; // Assuming you save your CSS into a Carousel.css file

const emojis = [
  ["📺", "Television", "4KW"],
  ["🚙", "Car", "6KJ"],
  ["💻", "Computer", "3KW"],
  ["🏡", "House", "10LW"],
];

const topics = [
  {
    id: 1,
    content: "First we need to enter the device name, it can be anything.",
  },
  {
    id: 2,
    content:
      "We need to select the  type of emission it gives, the source of this emission",
  },
  {
    id: 3,
    content:
      "We need to the number of hours we use the device range for this is 1 - 24 hours",
  },
  {
    id: 4,
    content:
      "We then enter the device detail which can be found on the backside of the product.",
  },
  {
    id: 5,
    content: "We Add your devices and calculate the  emission for whole year",
  },
  {
    id: 6,
    content: "Add Device and Compare with other suburbs",
  },
];

const Carousel = () => {
  return (
    <div className="wrapper">
      <div>
        <h1 style={{ fontSize: "xx-large" }}>How does this work?</h1>
        {topics.map(({ id, content }) => (
          <div key={id} className="content">
            {content}
          </div>
        ))}
      </div>
      <div className="carousel">
        {emojis.map((emoji, index) => (
          <div key={index} className="carousel__item">
            <div className="carousel__item-head">{emoji[0]}</div>
            <div className="carousel__item-body">
              <p className="title">{emoji[1]}</p>
              <p>Unicode: {emoji[2]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
