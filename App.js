import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Button,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Task from './components/Task';

const App = () => {
  const [title, setTitle] = useState('Title');
  const [text, setText] = useState('Description');
  const [showPop, setShowPop] = useState(false);
  const [task, setTask] = useState([]);
  const [dateStart, setDateStart] = useState(new Date());
  const [dateEnd, setDateEnd] = useState(new Date());
  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  const handleAddTasks = () => {
    setTask([...task, {title, text, dateStart, dateEnd}]);
    setTitle('Title');
    setText('Description');
    setDateStart(new Date());
    setDateEnd(new Date());
    setShowPop(false);
  };

  const completeTask=(index)=>{
    let items = [...task];
    items.splice(index,1);
    setTask(items);
  } 

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <TextInput style={styles.title} multiline={true}>
          Todo App
        </TextInput>
        <View style={styles.tasks}>
          {task.map((item, index) => {
            return (
              <TouchableHighlight
                underlayColor={'none'}
                key={index}
                onPress={() => completeTask(index)}>
                <Task
                  title={item.title}
                  dateStart={item.dateStart.toLocaleDateString().split(',')[0]}
                  dateEnd={item.dateEnd.toLocaleDateString().split(',')[0]}
                />
              </TouchableHighlight>
            );
          })}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableHighlight
          style={styles.button}
          onPress={() => setShowPop(true)}>
          <Text style={styles.textButton}>Add</Text>
        </TouchableHighlight>

        <Modal transparent={true} visible={showPop}>
          <View style={styles.popup}>
            <View style={{flex: 1}}>
              <TextInput
                style={styles.title}
                multiline={true}
                onChangeText={title => setTitle(title)}>
                {title}
              </TextInput>

              <View style={styles.row}>
                <TextInput
                  style={styles.text}
                  placeholder='Description'
                  numberOfLines={8}
                  multiline={true}
                  onChangeText={text => setText(text)}></TextInput>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <TouchableHighlight
                  style={styles.buttonDate}
                  onPress={() => setOpenStart(true)}>
                  <Text style={styles.text}>Start</Text>
                </TouchableHighlight>

                <TouchableHighlight
                  style={styles.buttonDate}
                  onPress={() => setOpenEnd(true)}>
                  <Text style={styles.text}>End</Text>
                </TouchableHighlight>
              </View>

              <View style={{marginTop: -15}}>
                <View style={styles.textDate}>
                  <Text style={{color: 'red', fontSize: 18, marginLeft: 20}}>
                    Start:
                  </Text>
                  <Text style={styles.text}>{dateStart.toLocaleString()}</Text>
                </View>
                <View style={styles.textDate}>
                  <Text style={{color: 'red', fontSize: 18, marginLeft: 20}}>
                    End:
                  </Text>
                  <Text style={styles.text}>{dateEnd.toLocaleString()}</Text>
                </View>
              </View>
              <DatePicker
                modal
                testID="datePickerStart"
                open={openStart}
                date={dateStart}
                onConfirm={dateStart => {
                  setOpenStart(false);
                  setDateStart(dateStart);
                }}
                onCancel={() => {
                  setOpenStart(false);
                }}
              />
              <DatePicker
                modal
                testID="datePickerEnd"
                open={openEnd}
                date={dateEnd}
                onConfirm={dateEnd => {
                  setOpenEnd(false);
                  setDateEnd(dateEnd);
                }}
                onCancel={() => {
                  setOpenEnd(false);
                }}
              />
            </View>

            <View style={styles.footer}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => handleAddTasks()}>
                <Text style={styles.textButton}>Save</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  popup: {
    flex: 0.9,
    marginTop: 120,
    marginBottom: 30,
    marginHorizontal: 20,
    borderRadius: 15,
    backgroundColor: '#ffdada',
    paddingBottom: 20,
  },
  footer: {
    flex: 0.1,
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 27,
    fontWeight: 'bold',
    paddingTop: 10,
    paddingHorizontal: 20,
    color: 'black',
  },
  tasks: {
    marginTop: 30,
  },
  row: {
    marginTop: 30,
    backgroundColor: 'white',
    marginHorizontal: 20,
    minHeight: 200,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#92cbdf',
    height: 45,
    width: 75,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13aa52',
  },
  buttonDate: {
    margin: 20,
    opacity: 0.7,
    borderWidth: 1.5,
    borderColor: '#92cbdf',
    backgroundColor: '#1E90FF',
    height: 50,
    width: 100,
    alignItems: 'center',
    borderRadius: 15,
  },
  textButton: {
    fontWeight: '600',
    fontSize: 18,
    color: 'white',
  },
  textDate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontWeight: '600',
    color: 'black',
    fontSize: 18,
    margin: 10,
    flexWrap: 'wrap',
    textAlignVertical: 'top',
  },
});

export default App;
