import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import React, {useState} from 'react';

export default function Task(props) {
  const [check, setCheck] = useState(false);
  const press = {
    style: check ? styles.circularCheck : styles.circular,
  };
  const handleCheck = () => {
    if (check) setCheck(false);
    else setCheck(true);
  };

  return (
    <View style={styles.task}>
      <View style={styles.taskLeft}>
        <View style={styles.header}></View>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.text}>
          {props.dateStart} ---> {props.dateEnd}
        </Text>
      </View>
      <TouchableHighlight underlayColor={'none'} onPress={() => handleCheck()}>
        <View {...press}></View>
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  task: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    height: 24,
    width: 24,
    backgroundColor: '#92cbdf',
    borderRadius: 5,
    marginRight: 20,
    opacity: 0.8,
  },
  text: {
    marginRight: 20,
    maxWidth: '80%',
  },
  circular: {
    width: 13,
    height: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
  },
  circularCheck: {
    width: 13,
    height: 13,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: 'red',
  },
});
