import * as CounterState from './CounterState';
import * as NavigationState from '../../modules/navigation/NavigationState';
import React, {PropTypes} from 'react';
import Calendar from 'react-native-calendar';
import {
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
  TextInput,
  View
} from 'react-native';

const CounterView = React.createClass({
  propTypes: {
    suburb: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  handleChange(event) {
    this.props.dispatch(CounterState.change(event.nativeEvent.text));
  },
  handleSubmit() {
    this.props.dispatch(CounterState.submit(this.props.suburb));

    this.props.dispatch(NavigationState.pushRoute({
      key: 'Color',
      title: 'Color Screen'
    }));
  },

  render() {
    const loadingStyle = this.props.loading
      ? {backgroundColor: '#eee'}
          : null;

    return (
      <View style={styles.container}>

        <Text style={styles.title}>
          Search for a Suburb
        </Text>
        <TextInput
          onChange={this.handleChange} 
          style={styles.searchInput}
        />
        <TouchableHighlight
            style={styles.button}
            onPress={this.handleSubmit}
            underlayColor="white">
            <Text style={styles.linkButton}> Submit </Text>
        </TouchableHighlight>

      </View>
    );
  }
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    color: 'black'
  },
  linkButton: {
    textAlign: 'center',
    color: '#CCCCCC',
    marginBottom: 10,
    padding: 5
  }
});

export default CounterView;
