import React from 'react';
import {View, ScrollView, Animated, Easing} from 'react-native';
import { connect } from 'react-redux';
import Button from './common/Button.js';
import ParkListDetail from './ParkListDetail.js';


const ParkList = (props) => {
  this.slideValue = new Animated.Value(0);

  this.slideIn = () => {
    Animated.timing(
        this.slideValue,
        {
          toValue: 1,
          duration: 1500,
          easing: Easing.elastic(1)
        }
    ).start()
  }

  this.slideOut = () => {
    Animated.timing(
        this.slideValue,
        {
          toValue: 0,
          duration: 1500,
          easing: Easing.elastic(1)
        }
    ).start()
  }

  const bottom = this.slideValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-400, 0]
  });

  this.onDetailPress = (title) => {
    props.dispatch({type: 'UPDATE_SElECTED_PARK', state: title});
    props.navigator.push({name:'parkdetail'});
  }

  renderParkListDetails = (props) => {
    return props.parks.map(park => <ParkListDetail onPress={() => this.onDetailPress(park.title)} touchable={true} navigator={props.navigator} key={park.title} title={park.title} address={park.address} address_display={park.address_display} distance={park.distance} amenities={park.amenities}/>)
  };

  return (
    <View style={styles.scrollConainer}>
    <Button bgcolor={'#fff'} text={' See Parks List '} onPress={this.slideIn}/>
      <Animated.View
          style={ { position: 'absolute', zIndex: 2, bottom, left: 0, right: 0, }}
      >
        <ScrollView bounces={false} style={styles.scrollView}>
          <Button bgcolor={'#fff'} text={'Close'} onPress={this.slideOut}/>
          {renderParkListDetails(props)}
        </ScrollView>
      </Animated.View>
      </View>
  )
};

const styles = {
  scrollView : {
    height: 300,
    backgroundColor: '#fff'
  },
  scrollConainer: {
    alignSelf: 'stretch',
    padding: 5
  }
};


const mapStateToProps = (state) => {
  return {
    parks: state.getIn(['location', 'parks'])
  }
}

export default connect(mapStateToProps)(ParkList);

