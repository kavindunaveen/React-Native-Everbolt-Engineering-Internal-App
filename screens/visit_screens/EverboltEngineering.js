import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Image, KeyboardAvoidingView, 
  Platform, ScrollView, Keyboard, TouchableWithoutFeedback 
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { FIREBASE_DB } from "../../FirebaseConfig";  
import { ref, get } from "firebase/database";
import axios from "axios";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbz9XGju0aZ1s4YhfihO3uRQQz7UOoJ0_Zbm8igZlWdn86h71fvjNKSh4uqHSMDMcroZ/exec";

const EverboltEngineering = () => {
  const [form, setForm] = useState({
    date: new Date(),
    salesOfficerName: "",
    companyName: "",
    visitDetails: "",
    remarks: "",
  });

  const [showPicker, setShowPicker] = useState(false);
  const [query, setQuery] = useState("");
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const snapshot = await get(ref(FIREBASE_DB, "companies"));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const companyList = Object.keys(data).map((key) => data[key].name);
          setCompanies(companyList);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  const filterCompanies = (text) => {
    setQuery(text);
    if (text) {
      const filtered = companies.filter((company) =>
        company.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCompanies(filtered);
      setDropdownVisible(true);
    } else {
      setFilteredCompanies([]);
      setDropdownVisible(false);
    }
  };

  const handleSelectCompany = (company) => {
    setForm({ ...form, companyName: company });
    setQuery(company);
    setDropdownVisible(false);
  };

  const formatDate = (date) => date ? date.toISOString().split("T")[0] : "";

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.salesOfficerName || !form.companyName || !form.visitDetails) {
      alert("Please fill in all required fields.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const response = await axios.post(GOOGLE_SHEET_URL, form, {
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.status === 200) {
        alert("Data submitted successfully!");
        setForm({
          date: new Date(),
          salesOfficerName: "",
          companyName: "",
          visitDetails: "",
          remarks: "",
        });
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80} // Adjusts keyboard position properly
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1 }} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image source={require("../../assets/logo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.text}>Mark Your Visit</Text>

            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>{formatDate(form.date)}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={form.date}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    handleChange("date", selectedDate);
                  }
                }}
              />
            )}

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={form.salesOfficerName}
                onValueChange={(itemValue) => handleChange("salesOfficerName", itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Sales Officer" value="" />
                <Picker.Item label="Ramitha Thimanka" value="Ramitha Thimanka" />
                <Picker.Item label="Udara Lakshitha" value="Udara Lakshitha" />
                <Picker.Item label="Pasindu Janith" value="Pasindu Janith" />
                <Picker.Item label="Sasindu Chamika" value="Sasindu Chamika" />
                <Picker.Item label="Shanka Sachith" value="Shanka Sachith" />
              </Picker>
            </View>

            <View style={styles.dropdownContainer}>
              <TextInput
                style={styles.input}
                placeholder="Search or Select Company"
                value={query}
                onChangeText={filterCompanies}
              />
              {loading ? (
                <ActivityIndicator size="small" color="blue" />
              ) : (
                dropdownVisible && (
                  <FlatList
                    data={filteredCompanies}
                    keyExtractor={(item, index) => index.toString()}
                    style={styles.dropdown}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => handleSelectCompany(item)} style={styles.dropdownItem}>
                        <Text>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                )
              )}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Visit Details"
              value={form.visitDetails}
              onChangeText={(text) => handleChange("visitDetails", text)}
              multiline
            />

            <TextInput
              style={styles.input}
              placeholder="Remarks"
              value={form.remarks}
              onChangeText={(text) => handleChange("remarks", text)}
              multiline
            />

            <TouchableOpacity
              style={[styles.button, isSubmitting && { backgroundColor: "gray" }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Text>
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
    justifyContent: "flex-start", // Shift content upwards
    alignItems: "center", 
    backgroundColor: "#f5f5f5", 
    paddingHorizontal: 20,
    paddingTop: 70, // Adds slight spacing from the top
  },
  logo: { width: "80%", height: 150, marginBottom: 10 }, // Reduced height slightly
  text: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  dateInput: { 
    width: "90%", height: 50, borderWidth: 1, 
    borderColor: "#ccc", borderRadius: 8, 
    backgroundColor: "#fff", justifyContent: "center", 
    alignItems: "center", marginBottom: 10 
  },
  dateText: { fontSize: 16, color: "#000" },
  pickerContainer: { 
    width: "90%", height: 50, borderWidth: 1, 
    borderColor: "#ccc", borderRadius: 8, 
    backgroundColor: "#fff", justifyContent: "center", 
    marginBottom: 10 
  },
  picker: { width: "100%", height: 50 },
  dropdownContainer: { width: "90%", position: "relative" },
  dropdown: { 
    position: "absolute", top: 50, left: 0, right: 0, 
    backgroundColor: "white", borderWidth: 1, borderColor: "#ccc", 
    borderRadius: 8, maxHeight: 150, zIndex: 10 
  },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  input: { 
    width: "90%", height: 50, borderWidth: 1, 
    borderColor: "#ccc", borderRadius: 8, paddingHorizontal: 15, 
    fontSize: 16, backgroundColor: "#fff", marginBottom: 10 
  },
  button: { 
    backgroundColor: "darkgreen", paddingVertical: 12, 
    paddingHorizontal: 20, borderRadius: 8, 
    width: "90%", alignItems: "center", marginTop: 10 
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default EverboltEngineering;