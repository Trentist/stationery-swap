/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel";
const width = Dimensions.get("window").width;

export default class ImageSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      loading: []
    };
    this.onCurrentImagePressedHandler = this.onCurrentImagePressedHandler.bind(
      this
    );
    this.onSnap = this.onSnap.bind(this);
  }
  componentDidMount() {
    let a = [...Array(this.props.images.length).keys()].map(i => false);
  }
  onCurrentImagePressedHandler() {
    if (this.props.onCurrentImagePressed) {
      this.props.onCurrentImagePressed(this.state.currentImage);
    }
  }

  onSnap(index) {
    const { currentImageEmitter, onIndex } = this.props;
    this.setState({ currentImage: index }, () => {
      if (currentImageEmitter) currentImageEmitter(this.state.currentImage);
    });
  }
  _renderItem({ item, index }) {
    const {
      ImageComponent,
      ImageComponentStyle = {},
      sliderBoxHeight,
      disableOnPress,
      resizeMethod,
      resizeMode,
      imageLoadingColor = "#E91E63"
    } = this.props;
    return (
      <View
        style={{
          position: "relative",
          justifyContent: "center"
        }}
      >
        <Image source={item}
          resizeMethod={resizeMethod}
          resizeMode={resizeMode}
          style={{
            ...ImageComponentStyle,
            alignSelf: 'center'
          }}
          onLoadEnd={() => {
            let t = this.state.loading;
            t[index] = true;
            this.setState({ loading: t });
          }}
        />
        {!this.state.loading[index] && (
          <ActivityIndicator
            size="large"
            color={imageLoadingColor}
            style={{
              position: "absolute",
              alignSelf: "center"
            }}
          />
        )}
      </View>
    )
  }
    
  get pagination() {
    const { currentImage } = this.state;
    const {
      images,
      dotStyle,
      dotColor,
      inactiveDotColor,
      paginationBoxStyle,
      paginationBoxVerticalPadding
    } = this.props;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={currentImage}
        dotStyle={dotStyle || styles.dotStyle}
        dotColor={dotColor || colors.dotColors}
        inactiveDotColor={inactiveDotColor || colors.white}
        inactiveDotScale={0.8}
        carouselRef={this._ref}
        inactiveDotOpacity={0.8}
        tappableDots={!!this._ref}
        containerStyle={[
          styles.paginationBoxStyle,
          paginationBoxVerticalPadding
            ? { paddingVertical: paginationBoxVerticalPadding }
            : {},
          paginationBoxStyle ? paginationBoxStyle : {}
        ]}
        {...this.props}
      />
    );
  }

  render() {
    const {
      images,
      circleLoop,
      autoplay,
      parentWidth,
      loopClonesPerSide
    } = this.props;
    return (
      <View>
        <Carousel
          layout={"default"}
          data={images}
          ref={c => (this._ref = c)}
          loop={circleLoop || false}
          enableSnap={true}
          autoplay={autoplay || false}
          itemWidth={width}
          sliderWidth={width}
          loopClonesPerSide={loopClonesPerSide || 5}
          renderItem={item => this._renderItem(item)}
          onSnapToItem={index => this.onSnap(index)}
          slideStyle={{ flex: 1 }}
          containerCustomStyle={styles.carousel}
          removeClippedSubviews={false}
          {...this.props}
        />
        {images.length > 1 && this.pagination}
      </View>
    );
  }
}

const colors = {
  dotColors: "#BDBDBD",
  white: "#FFFFFF"
};

ImageSlider.defaultProps = {
  ImageComponent: Image
};

const styles = StyleSheet.create({
  carousel: {
    flex: 1,
  },
  paginationBoxStyle: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: "rgba(128, 128, 128, 0.92)"
  }
});