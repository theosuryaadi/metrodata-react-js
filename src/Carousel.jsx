import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  // menampilkan gambar default, apabila img dari parent component tidak ada (line 15)
  static defaultProps = {
    image: ["http://pets-image.dev-apis.com/pets/none.jgp"],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state; // asalnya dari komponen ini sendiri
    const { images } = this.props; // asalnya dari parent component

    return (
      <div className="carousel">
        <img src={images[active]} alt="pet" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              key={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="pet thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
