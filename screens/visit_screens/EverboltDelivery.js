import React, { useState } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity,
  ScrollView, KeyboardAvoidingView, Platform, Image,
  TouchableWithoutFeedback, Keyboard
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import * as Location from "expo-location";
import axios from "axios";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbznJR701EuDSPGcxBQ-YZq3MYpYVBSeWjXqL1O5L3yJdHxygN59sJFRoXu6R8Dh8hU_/exec";

const driverNameList = [
  "Chaminda Gunasinghe", "Manjula Prasad", "Keith De Silva",
  "Sumith Jayasiri", "Asanga Sanjeewa"
];

const EverboltDelivery = () => {
  const [form, setForm] = useState({
    date: new Date(),
    time: "",
    driverName: "",
    deliveryDetails: "",
    address: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setForm({ ...form, date: selectedDate });
    }
    setShowPicker(false);
  };

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const getAddressFromCoords = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Location permission is required for attendance.");
        return "";
      }

      const location = await Location.getCurrentPositionAsync({});
      const [address] = await Location.reverseGeocodeAsync(location.coords);
      return `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.country}`;
    } catch (error) {
      console.error("Location Error:", error);
      return "";
    }
  };

  const handleSubmit = async () => {
    if (!form.driverName || !form.deliveryDetails) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Get current time in 24-hour format
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const currentTime = `${hours}:${minutes}`;

      console.log("Getting address...");
      const address = await getAddressFromCoords();
      console.log("Got address:", address);

      const payload = {
        date: form.date.toISOString().split("T")[0],
        time: currentTime,
        driverName: form.driverName,
        deliveryDetails: form.deliveryDetails,
        address: address,
      };

      console.log("Payload to be sent:", payload);

      const res = await axios.post(GOOGLE_SHEET_URL, payload, {
        headers: { "Content-Type": "application/json" }
      });

      console.log("API response:", res.data);

      if (res.status === 200) {
        alert("Visit marked successfully!");
        setForm({
          date: new Date(),
          time: "",
          driverName: "",
          deliveryDetails: "",
          address: "",
        });
      } else {
        alert("Failed to submit data.");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("An error occurred while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.text}>Mark Your Delivery Visit: </Text>

            <View style={styles.dateInput}>
              <Text style={styles.dateText}>
                {form.date.toISOString().split("T")[0]}
                </Text>
                </View>
            <View style={styles.pickerContainer}>
              
              <Picker
                selectedValue={form.driverName}
                onValueChange={(value) => handleChange("driverName", value)}
                style={styles.picker}
              >
                <Picker.Item label="Select Driver Name" value="" />
                {driverNameList.map((name, idx) => (
                  <Picker.Item key={idx} label={name} value={name} />
                ))}
              </Picker>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Enter Delivery Details"
              value={form.deliveryDetails}
              onChangeText={(text) => handleChange("deliveryDetails", text)}
              multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
              <Text style={styles.buttonText}>{isSubmitting ? "Submitting..." : "Submit"}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-end",
  },
  logo: {
    width: "80%",
    height: 120,
    marginBottom: 10
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 25
  },
  dateInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 10
  },
  dateText: { fontSize: 16, color: "#000" },
  pickerContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10
  },
  picker: { width: "100%", height: 50 },
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 10,
    textAlignVertical: "top"
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 8,
    width: "90%",
    alignItems: "center",
    marginTop: 220,
    top: -205
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" }
});

export default EverboltDelivery;
