import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { observable } from "mobx";

@inject("favestore")
@observer
class Favourites extends Component {
  async componentDidMount() {
    let images = await this.props.favestore.GetFavList();
    console.log(images);
    await this.setState({ images: images });
  }

  constructor() {
    super();
    this.state = {
      images: [],
      newDesc: "",
      editModeEnabled: false
    };
  }
  /////////////
  handleEditClick() {
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
  }

  updateDescInpt = e => {
    this.setState({
      newDesc: e.target.value
    });
  };

  saveNewDesc(e) {
    let url = e.target.getAttribute("value");
    let newDesc = this.state.newDesc;
    this.props.favestore.EditDesc(url, newDesc);
    this.setState({ editModeEnabled: !this.state.editModeEnabled });
    this.setState({ newDesc: "" });
  }
  //////////////

  openFavImage = async e => {
    let url = e.target.getAttribute("value");
    document.getElementById("PicPopupImg").src = url;
    let PicPopup = document.getElementById("PicPopup");
    PicPopup.style.display = "block";
  };

  closePic = async () => {
    let modal = document.getElementById("PicPopup");
    modal.style.display = "none";
  };

  removeFavImage = async e => {
    await this.props.favestore.RemoveFav(e.target.getAttribute("value"));
    this.setState({ editModeEnabled: false });
  };

  render() {
    return (
      <div
        className="favouriteBox"
        style={{ height: `${this.state.images.length * 5 + (0.5 * this.state.images.length)+  6}vw` }}
      >
        <h2 className="favTitle">Favourites List</h2>

        {this.state.images.map(i => (
          <div className="FavItem">
            <img
              className="favPic"
              src={i.url}
              value={i.url}
              onClick={e => this.openFavImage(e)}
            ></img>
            {this.state.editModeEnabled ? (
              <div>
                <textarea
                  className="editDescBox"
                  onChange={e => this.updateDescInpt(e)}
                >
                  {this.state.newDesc}
                </textarea>
                <button
                  className="saveNewDescBtn"
                  value={i.url}
                  onClick={e => this.saveNewDesc(e)}
                >
                  Save
                </button>
              </div>
            ) : (
              <span className="DescBox" value={i.url}>
                {i.desc}
              </span>
            )}

            <div className="FavButtons">
              <i
                class="fas fa-edit"
                value={i.url}
                onClick={e => this.handleEditClick(e)}
              ></i>
              <i
                class="fas fa-trash-alt"
                value={i.url}
                onClick={e => this.removeFavImage(e)}
              ></i>
            </div>

            <div id="PicPopup" className="PicPopup">
              <div className="PicPopup-content">
                <span className="closePic" onClick={this.closePic}>
                  &times;
                </span>
                <img id="PicPopupImg" className="PicPopupImg" src={i.url}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Favourites;
