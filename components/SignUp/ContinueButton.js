import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Platform,
} from 'react-native';
import {

} from 'native-base';

export default (props) => {
  const { colors } = props;
  return (
    <View style={[styles.buttonContainer, { backgroundColor: colors.container }]}>
      <TouchableHighlight
        onPress={props.handler}
        style={[styles.button, { backgroundColor: colors.button }]}
        underlayColor={colors.highlight} >
        <Text style={styles.text}>
          Continuar
            </Text>
      </TouchableHighlight>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 50,
    borderRadius: 3,
  },
  text: {
    fontWeight: '500',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    padding: 7
  },
  buttonContainer: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: Platform.OS === 'ios' ? 100 : 80,
    maxHeight: Platform.OS === 'ios' ? 100 : 80,
  }
})
