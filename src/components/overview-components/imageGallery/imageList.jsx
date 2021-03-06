import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { changePhoto } from '../../../actions/overview-Actions/imageGallery/imageGalleryActions';
import ImageThumbnail from './imageThumbnail';
import { zeroPad, recordClickData, OVERVIEWOWNER } from '../../../util/util';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function mapStateToProps(st) {
  const { currentStyleIndex, currentPhotoIndex } = st;
  const imageList = st.styleData.results[currentStyleIndex].photos;
  const styleName = st.styleData.results[currentStyleIndex].name;
  return {
    currentStyleIndex,
    currentPhotoIndex,
    imageList,
    styleName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleSwitchPhoto: (e, photoIndex) => {
      dispatch(changePhoto(photoIndex));
      recordClickData(e.currentTarget, OVERVIEWOWNER);
    },
  };
}

export function ImageListComponent({
  currentStyleIndex, currentPhotoIndex, imageList, styleName, handleSwitchPhoto, isExpanded,
}) {
  const display = (isExpanded) ? 'image-thumbnail-slide-expanded' : 'image-thumbnail-slide-default';
  return (
    <ul id={display}>
      <Slider
        dots={isExpanded}
        infinite={false}
        slidesToShow={7}
        slidesToScroll={1}
        focusOnSelect
      >
        {imageList.map((image, imageIndex) => {
          const key = zeroPad(currentStyleIndex, 4) + zeroPad(imageIndex, 4);
          return (
            <ImageThumbnail
              key={key}
              thisId={`thumbnail-${key}`}
              photoIndex={imageIndex}
              url={imageList[imageIndex].thumbnail_url}
              styleName={styleName}
              handleClick={handleSwitchPhoto}
              isSelected={currentPhotoIndex === imageIndex}
            />
          );
        })}
      </Slider>
    </ul>
  );
}

ImageListComponent.propTypes = {
  currentStyleIndex: PT.number.isRequired,
  currentPhotoIndex: PT.number.isRequired,
  imageList: PT.arrayOf(PT.shape({
    thumbnail_url: PT.string.isRequired,
    url: PT.string.isRequired,
  })).isRequired,
  styleName: PT.string.isRequired,
  handleSwitchPhoto: PT.func.isRequired,
  isExpanded: PT.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageListComponent);
