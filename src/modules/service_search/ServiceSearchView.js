import * as ServiceSearchState from './ServiceSearchState';
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

const ServiceSearchView = React.createClass({
  propTypes: {
    suburb: PropTypes.string,
    services: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  },
  handleChange(event) {
    this.props.dispatch(ServiceSearchState.change(event.nativeEvent.text));
  },
  handleSubmit() {
    this.props.dispatch(ServiceSearchState.submit(this.props.suburb));
  },

  renderResult(data) {
    <Text>hey </Text>
  },

  renderSearchResults() {
    if (!this.props.services) {
      console.log("NEIN", this.props.services)
      return null;
    }

    const results = this.props.services.map(renderResult)
    return (
        <View >
          {results}
        </View>
    );
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

export default ServiceSearchView;
