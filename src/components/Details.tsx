import React, { lazy } from "react";
import {connect} from 'react-redux';
import pet, { Photo } from "@frontendmasters/pet";
import { navigate, RouteComponentProps } from "@reach/router";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "../context/ThemeContext";

const Modal = lazy(() => import("./Modal"));
class Details extends React.Component<RouteComponentProps<{id : string , theme : string}>>{
  public state = { loading: true, showModal: false  , name : "" , animal : "" , description : "" , location : "" ,breed : "", url : "",  media : [] as Photo[]};
  public async componentDidMount() {
    if(!this.props.id){
      navigate('/');
      return;
    }
    const { animal } = await pet.animal(+this.props.id);

    this.setState({
      url: animal.url,
      name: animal.name,
      animal: animal.type,
      location: `${animal.contact.address.city} , ${animal.contact.address.state}`,
      description: animal.description,
      media: animal.photos,
      breed: animal.breeds.primary,
      loading: false,
    });
  }
  public toggleModal = () => this.setState({ showModal: !this.state.showModal });

  public adopt = () => navigate(this.state.url);

  public render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      media,
      name,
      showModal,
    } = this.state;

    const {theme}  = this.props;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
              <button
                onClick={this.toggleModal}
                style={{ backgroundColor: theme }}
              >
                Adopt {name}
              </button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would you like to adopt {name} ?</h1>
                <div className="buttons">
                  <button onClick={this.adopt}>Yes</button>
                  <button onClick={this.toggleModal}>
                    No , I am a monster
                  </button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({theme}) => ({theme})

const WrappedDetails = connect(mapStateToProps)(Details);

export default function DetailsWithErrorBoundary(props : RouteComponentProps<{id : string}>) {
  return (
    <ErrorBoundary>
      <WrappedDetails {...props} />
    </ErrorBoundary>
  );
}
