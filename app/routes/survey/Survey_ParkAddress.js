import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { sendSurveyResponses } from '../../src/survey_core';
import Button from '../../components/common/Button.js';
import { Form, InputField } from 'react-native-form-generator';
import { Actions } from 'react-native-router-flux';


class Survey_ParkAddress extends Component {
    constructor(props){
    super(props);
    this.state = {
      formData:{}
    }
  }
  handleFormChange(formData){
    this.setState({formData:formData})
    this.props.onFormChange && this.props.onFormChange(formData);
  }
  onClosePress(formData) {
      const updateValue = {};
      updateValue.title = 'suggested_park';
      updateValue.value = this.state.formData.suggested_park;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      this.sendFormData().done(() => {
        Actions.thanks();
      });
  }
  saveFormData() {
      const updateValue = {};
      updateValue.title = 'suggested_park';
      updateValue.value = this.state.formData.park_address;
      this.props.dispatch({type: 'UPDATE_SURVEY', state: updateValue});
      Actions.surveyFencedArea();
  }
  sendFormData() {
      const formData = this.props.parkForm;
      console.log(formData)
      return sendSurveyResponses(formData);
  }

    render() {
        const B = (props) => <Text style={{fontFamily: 'Source Sans Pro 600'}}>{props.children}</Text>
        return (
            <View ref='suggest_park' style={styles.container}>
                <TouchableOpacity
                    onPress={this.onClosePress.bind(this)}
                    style={{position: 'absolute', top: 30, right: 15, zIndex: 1}}
                    hitSlop={{top: 10, left: 10, bottom: 10, right: 10}}
                >
                  <Image style={{width: 20, height: 20, opacity: 0.67}} source={require('../../img/button_close.png')}/>
                </TouchableOpacity>
                <Text style={styles.question}>Where is this park <B>located</B>?</Text>
                    <Form style={styles.form} ref='SuggestedPark' onChange={this.handleFormChange.bind(this)}>
                       <InputField
                           ref='suggested_park'
                           placeholder='Park address or cross streets'
                           underlineColorAndroid='#F58120'
                           style={styles.input}
                       />
                       <View style={styles.wrapper}>
                           <Button
                             bgimage={require('../../img/transparent.png')}
                             text={"I don't know"}
                             textColor={'#8b8b8b'}
                             fontSize={15}
                             font={'Source Sans Pro 200'}
                             alignSelf={'center'}
                             onPress={this.saveFormData.bind(this)}
                         />
                          <Button
                            bgimage={require('../../img/orange-gradient-long.png')}
                            text={' OK '}
                            textColor={'#fff'}
                            alignSelf={'center'}
                            onPress={this.saveFormData.bind(this)}
                          />
                      </View>
                    </Form>
            </View>
        )
    }
  }

  var styles = StyleSheet.create({
    container: {
        padding: 30,
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    question: {
        color: '#F58120',
        fontSize: 48,
        fontFamily: 'Source Sans Pro 200',
        marginBottom: 100
    },
    form: {
        flex: 1,
        justifyContent: 'center'
    },
    // input: {
    //     flex: 1,
    //     justifyContent: 'flex-end'
    // },
    wrapper: {
        flex: 1,
        justifyContent: 'flex-end'
    }
  })


const mapStateToProps = (state) => {
  return {
    parkForm: state.getIn(['survey', 'park_form']).toJS() || {}
  }
}

export default connect(mapStateToProps)(Survey_ParkAddress);
