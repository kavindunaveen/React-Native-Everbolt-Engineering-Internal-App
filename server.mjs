import React, { useState, useRef, useEffect } from 'react';
const { useState, useRef, useEffect } = require('react');


import {
  StyleSheet,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import moment from 'moment';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

export default function Example() {
  const swiper = useRef();
  const [value, setValue] = useState(new Date());
  const [week, setWeek] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [meetingDetails, setMeetingDetails] = useState('');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchBookedSlots();
  }, []);

  const fetchBookedSlots = async () => {
    try {
      const response = await fetch('http://localhost:5000/booked-slots');
      const data = await response.json();
      setBookedSlots(data);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleBookSlot = async () => {
    if (selectedSlot && meetingDetails.trim() !== '') {
      const bookedSlot = {
        date: moment(value).format('YYYY-MM-DD'),
        slot: selectedSlot,
        meeting: meetingDetails,
      };
      saveBookedSlot(bookedSlot);
      setMeetingDetails('');
      setSelectedSlot(null);
      setRefresh(!refresh);
    }
  };

  const saveBookedSlot = async (bookedSlot) => {
    try {
      const response = await fetch('http://localhost:5000/book-slot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookedSlot),
      });
      const data = await response.json();
      console.log('Booked slot inserted with ID:', data.id);
      fetchBookedSlots(); // Refresh booked slots after successful booking
    } catch (error) {
      console.error('Error inserting booked slot:', error);
    }
  };

  const weeks = React.useMemo(() => {
    const start = moment().add(week, 'weeks').startOf('week');

    return [-1, 0, 1].map((adj) => {
      return Array.from({ length: 7 }).map((_, index) => {
        const date = moment(start).add(adj, 'week').add(index, 'day');

        return {
          weekday: date.format('ddd'),
          date: date.toDate(),
        };
      });
    });
  }, [week]);

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let i = 7; i <= 18; i++) {
      const slot = `${i < 10 ? '0' + i : i}:00`;
      const isBooked = bookedSlots.some(
        (slotItem) =>
          slotItem.date === moment(value).format('YYYY-MM-DD') && slotItem.slot === slot
      );
      timeSlots.push(
        <TouchableOpacity
          key={slot}
          style={[
            styles.timeSlot,
            selectedSlot === slot && styles.selectedSlot,
            isBooked && styles.bookedSlot,
          ]}
          onPress={() => setSelectedSlot(slot)}
          disabled={isBooked}
        >
          <Text style={styles.timeSlotText}>{slot}</Text>
          {isBooked && (
            <Text style={styles.meetingDetails}>{bookedSlots.find(
              (slotItem) =>
                slotItem.date === moment(value).format('YYYY-MM-DD') && slotItem.slot === slot
            ).meeting}</Text>
          )}
        </TouchableOpacity>
      );
    }
    return timeSlots;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Schedule</Text>
        </View>

        <View style={styles.picker}>
          <Swiper
            index={1}
            ref={swiper}
            loop={false}
            showsPagination={false}
            onIndexChanged={(ind) => {
              if (ind === 1) {
                return;
              }
              setTimeout(() => {
                const newIndex = ind - 1;
                const newWeek = week + newIndex;
                setWeek(newWeek);
                setValue(moment(value).add(newIndex, 'week').toDate());
                swiper.current.scrollTo(1, false);
              }, 100);
            }}
          >
            {weeks.map((dates, index) => (
              <View
                style={[styles.itemRow, { paddingHorizontal: 16 }]}
                key={index}
              >
                {dates.map((item, dateIndex) => {
                  const isActive = value.toDateString() === item.date.toDateString();
                  return (
                    <TouchableWithoutFeedback
                      key={dateIndex}
                      onPress={() => setValue(item.date)}
                    >
                      <View
                        style={[
                          styles.item,
                          isActive && {
                            backgroundColor: '#111',
                            borderColor: '#111',
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.itemWeekday,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.weekday}
                        </Text>
                        <Text
                          style={[
                            styles.itemDate,
                            isActive && { color: '#fff' },
                          ]}
                        >
                          {item.date.getDate()}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            ))}
          </Swiper>
        </View>

        <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
          <Text style={styles.subtitle}>{value.toDateString()}</Text>
          <View style={styles.timeSlotContainer}>{renderTimeSlots()}</View>
          {selectedSlot && (
            <View style={styles.meetingInput}>
              <TextInput
                style={styles.input}
                placeholder="Enter meeting details"
                value={meetingDetails}
                onChangeText={(text) => setMeetingDetails(text)}
              />
              <TouchableOpacity onPress={handleBookSlot}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Schedule</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 24,
  },
  header: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 12,
  },
  picker: {
    flex: 1,
    maxHeight: 74,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#999999',
    marginBottom: 12,
  },
  footer: {
    marginTop: 'auto',
    paddingHorizontal: 16,
  },
  item: {
    flex: 1,
    height: 50,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e3e3e3',
    flexDirection: 'column',
    alignItems: 'center',
  },
  itemRow: {
    width: width,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  itemWeekday: {
    fontSize: 13,
    fontWeight: '500',
    color: '#737373',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111',
  },
  timeSlotContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlot: {
    width: 70,
    height: 30,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#999',
    backgroundColor: '#fff',
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111',
  },
  selectedSlot: {
    borderColor: '#007aff',
  },
  bookedSlot: {
    backgroundColor: '#ddd',
    borderColor: '#ddd',
  },
  meetingInput: {
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#007aff',
    borderColor: '#007aff',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
  meetingDetails: {
    fontSize: 10,
    color: '#555',
  },
});
