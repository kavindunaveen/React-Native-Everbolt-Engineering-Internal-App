import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, 
  FlatList, ActivityIndicator, Image, KeyboardAvoidingView, 
  Platform, ScrollView, Keyboard, TouchableWithoutFeedback, 
  ActionSheetIOS
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { FIREBASE_DB } from "../../FirebaseConfig";  
import { ref, get } from "firebase/database";
import axios from "axios";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyzGvbVLoxZqW-WHCnaZ1faopCgneGQ-p4fVhYNKG4k8rQvHlWE3Xbh2Vj6kpYfuEht/exec";

const EverboltEngineering = () => {
  const [form, setForm] = useState({
    date: new Date(),
    salesOfficerName: "",
    companyName: "",
    visitType: "",
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

  const salesOfficers = [
    "Ramitha Thimanka",
    "Udara Lakshitha",
    "Pasindu Janith",
    "Sasindu Chamika",
    "Shanka Sachith",
    "Widura Bandara"
  ];

  const visitTypes = [
    "Delivery",
    "Technical Visit",
    "Sales Visit",
    "Payment Collection",
    "Scheduled Visit",
    "Customer Requested Visit"
  ];

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
    if (text.trim() === "") {
      setFilteredCompanies([]);
      setDropdownVisible(false);
      return;
    }
    const filtered = companies.filter((company) =>
      company.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCompanies(filtered);
    setDropdownVisible(filtered.length > 0); 
  };

  const handleSelectCompany = (company) => {
    setForm({ ...form, companyName: company });
    setQuery(company);
    setDropdownVisible(false);
  };

  const formatDate = (date) => date ? date.toISOString().split("T")[0] : "";

  const handleChange = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value || "",
    }));
  };

  const showIOSPicker = (key, options) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [...options, "Cancel"],
        cancelButtonIndex: options.length,
      },
      (buttonIndex) => {
        if (buttonIndex < options.length) {
          handleChange(key, options[buttonIndex]);
        }
      }
    );
  };

  const handleSubmit = async () => {
    if (
      form.salesOfficerName.trim() === "" ||
      form.companyName.trim() === "" ||  
      form.visitType.trim() === "" ||
      form.visitDetails.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(GOOGLE_SHEET_URL, form, {
        headers: { 
          "Content-Type": "application/json" 
        }
      });

      if (response.status === 200) {
        alert("Data submitted successfully!");
        setForm({
          date: new Date(),
          salesOfficerName: "",
          companyName: "",
          visitType: "",
          visitDetails: "",
          remarks: "",
        });
        setQuery("");
        setDropdownVisible(false);
        Keyboard.dismiss();
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
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
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

            {/* Sales Officer Picker */}
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => Platform.OS === "ios" ? showIOSPicker("salesOfficerName", salesOfficers) : null}
            >
              {Platform.OS === "android" ? (
                <Picker
                  selectedValue={form.salesOfficerName}
                  onValueChange={(itemValue) => handleChange("salesOfficerName", itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Sales Officer" value="" />
                  {salesOfficers.map((officer, index) => (
                    <Picker.Item key={index} label={officer} value={officer} />
                  ))}
                </Picker>
              ) : (
                <Text style={styles.dateText}>{form.salesOfficerName || "Select Sales Officer"}</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.dropdownContainer}>
              <TextInput
              style={styles.input}
              placeholder="Search or Type Company"
              value={query}
              onChangeText={(text) => {
              setQuery(text);  
              setForm((prevForm) => ({ ...prevForm, companyName: text }));  
              filterCompanies(text); 
            }}
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

            {/* Visit Type Picker */}
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => Platform.OS === "ios" ? showIOSPicker("visitType", visitTypes) : null}
            >
              {Platform.OS === "android" ? (
                <Picker
                  selectedValue={form.visitType}
                  onValueChange={(itemValue) => handleChange("visitType", itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Visit Type" value="" />
                  {visitTypes.map((type, index) => (
                    <Picker.Item key={index} label={type} value={type} />
                  ))}
                </Picker>
              ) : (
                <Text style={styles.dateText}>{form.visitType || "Select Visit Type"}</Text>
              )}
            </TouchableOpacity>

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
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 80 : 40, // More top padding for iOS
  },
  logo: { 
    width: "80%", 
    height: Platform.OS === "ios" ? 130 : 150, 
    marginBottom: 10 
  },
  text: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: Platform.OS === "ios" ? 15 : 10 
  },
  dateInput: { 
    width: "90%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 10,
    shadowColor: Platform.OS === "ios" ? "#000" : "transparent", 
    shadowOpacity: Platform.OS === "ios" ? 0.2 : 0,
    shadowRadius: Platform.OS === "ios" ? 3 : 0,
    shadowOffset: Platform.OS === "ios" ? { width: 0, height: 2 } : { width: 0, height: 0 },
  },
  dateText: { 
    fontSize: 16, 
    color: "#000" 
  },
  pickerContainer: { 
    width: "90%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    justifyContent: "center", 
    marginBottom: 10,
    paddingLeft: Platform.OS === "ios" ? 15 : 0, // Moves selected name forward ONLY on iOS
  },
  picker: { 
    width: "100%", 
    height: 50, 
  },
  dropdownContainer: { 
    width: "90%", 
    position: "relative" 
  },
  dropdown: { 
    position: "absolute", 
    top: 50, 
    left: 0, 
    right: 0, 
    backgroundColor: "white", 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    maxHeight: 150, 
    zIndex: 10 
  },
  dropdownItem: { 
    padding: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ddd" 
  },
  input: { 
    width: "90%", 
    height: 50, 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    fontSize: 16, 
    backgroundColor: "#fff", 
    marginBottom: 10,
    textAlign: Platform.OS === "ios" ? "center" : "left", // Center text ONLY on iOS
  },
  button: { 
    backgroundColor: Platform.OS === "ios" ? "green" : "green", 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 8, 
    width: "90%", 
    alignItems: "center", 
    marginTop: 10 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});

export default EverboltEngineering;