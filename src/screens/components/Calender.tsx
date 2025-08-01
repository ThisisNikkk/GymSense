import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );


  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setModalVisible(false);
    console.log('Selected date:', day.dateString);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Touchable Header */}
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={() => setModalVisible(true)}
      >
        <Image
          source={require('../../assets/icons/Calendar.png')}
          style={styles.icon}
        />
        <Text style={styles.dateText}>
          {new Date(selectedDate).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Pressable>
          <Image source={require('../../assets/icons/Scale.png')} style={{ height: 30, width: 30, resizeMode: "contain", }} />
        </Pressable>
        <Pressable style={{ marginHorizontal: 20 }}>
          <Image source={require('../../assets/icons/Camera.png')} style={{ height: 30, width: 30, resizeMode: "contain", }} />
        </Pressable>


      </View>



      {/* Modal Calendar */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: 'blue',
                },
              }}
              theme={{
                selectedDayBackgroundColor: 'blue',
                todayTextColor: 'red',
              }}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: '#fff' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CalendarComponent;
const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    padding: 8,
    backgroundColor: '#000',
    borderRadius: 8,
  },
});
