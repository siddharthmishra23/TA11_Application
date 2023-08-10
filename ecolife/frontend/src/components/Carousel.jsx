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
    content:
      "Begin by entering a name for the device. This can be any descriptive name of your choice.",
  },
  {
    id: 2,
    content:
      "Select the type of emission the device produces, as well as the source of the emission.",
  },
  {
    id: 3,
    content:
      "Specify the number of hours you use the device daily. The range is between 1 and 24 hours.",
  },
  {
    id: 4,
    content:
      "Provide information about the device, which can typically be found on the product's rear side.",
  },
  {
    id: 5,
    content:
      "Add all your devices to calculate their cumulative emissions for an entire year.",
  },
  {
    id: 6,
    content:
      "Once added, compare your device's emissions with those from other suburbs.",
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
