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

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbyZyORIbZQ7-oNuBKaa3Cpzoz2mx2PWsokE1oJTPKcYqLmsIWpo_rTdI3WrVFo8DmBz/exec";

// Engineer List
const engineerNames = [
  "Uditha Prabath",
  "Prasanga Welikala",
  "Sandaru Adithya",
  "Pasindu Maleesha",
  "Renuka Ravihansa",
  "Kusal Bandara",
  "Chamara Sandaruwan",
  "Asanga Sanjeewa"
];

// Visit Type - Subcategory Mapping
const visitTypeSubcategories = {
  "Energy Monitoring": ["Load Analysis", "Energy Audit", "Harmonic Analysis"],
  "Technical Visit": ["System Inspection", "Maintenance", "Troubleshooting"],
  "Power Panel": ["Capacitor Bank", "VFD", "Control System"],
  "Lightning arrestors": ["Installation", "Inspection", "Replacement"],
  "SPD installation": ["Surge Protector", "Grounding", "Wiring Check"],
  "Industrial Wiring": ["Machine Wiring", "Panel Wiring", "Cable Routing"],
  "Automation": ["PLC Setup", "SCADA Integration", "Sensor Calibration"],
  "Earthing": ["Ground Resistance", "Chemical Earthing", "Rod Installation"],
};

const EverboltServices = () => {
  const [form, setForm] = useState({
    date: new Date(),
    engineerName: "",
    companyName: "",
    visitType: "",  
    visitSubType: "",  
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
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

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

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setForm((prevForm) => ({
        ...prevForm,
        date: selectedDate, // Update the form state with the new date
      }));
    }
    setShowPicker(false); // Hide picker after selection
  };

  const handleChange = (key, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [key]: value || "",
    }));

    if (key === "visitType") {
      setFilteredSubcategories(visitTypeSubcategories[value] || []); 
      setForm((prevForm) => ({ ...prevForm, visitSubType: "" })); 
    }
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
      form.engineerName.trim() === "" ||
      form.companyName.trim() === "" ||  
      form.visitType.trim() === "" ||
      form.visitSubType.trim() === "" ||
      form.visitDetails.trim() === "" ||
      form.remarks.trim() === ""
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      console.log("Sending data to API...");
  
      const response = await axios.post(GOOGLE_SHEET_URL, form, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Response:", response.data);
  
      if (response.status === 200) {
        alert("Data submitted successfully!");
        setForm({
          date: new Date(),
          engineerName: "",
          companyName: "",
          visitType: "",
          visitSubType: "",
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
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <Image source={require("../../assets/serviceslogo.png")} style={styles.logo} resizeMode="contain" />
            <Text style={styles.text}>Mark Your Visit</Text>

             {/* Date Picker */}
             <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateInput}>
              <Text style={styles.dateText}>{formatDate(form.date)}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={form.date}
                mode="date"
                display="default"
                onChange={handleDateChange} // Corrected function
              />
            )}
            
            {/* Engineer Name Picker */}
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => Platform.OS === "ios" ? showIOSPicker("engineerName", engineerNames) : null}
            >
              {Platform.OS === "android" ? (
                <Picker
                  selectedValue={form.engineerName}
                  onValueChange={(itemValue) => handleChange("engineerName", itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Engineer Name" value="" />
                  {engineerNames.map((name) => (
                    <Picker.Item key={name} label={name} value={name} />
                  ))}
                </Picker>
              ) : (
                <Text style={styles.dateText}>{form.engineerName || "Select Engineer"}</Text>
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
              onPress={() => Platform.OS === "ios" ? showIOSPicker("visitType", Object.keys(visitTypeSubcategories)) : null}
            >
              {Platform.OS === "android" ? (
                <Picker
                  selectedValue={form.visitType}
                  onValueChange={(itemValue) => handleChange("visitType", itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Select Visit Type" value="" />
                  {Object.keys(visitTypeSubcategories).map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              ) : (
                <Text style={styles.dateText}>{form.visitType || "Select Visit Type"}</Text>
              )}
            </TouchableOpacity>

            {/* Subcategory Picker (only if a visit type is selected) */}
            {filteredSubcategories.length > 0 && (
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => Platform.OS === "ios" ? showIOSPicker("visitSubType", filteredSubcategories) : null}
              >
                {Platform.OS === "android" ? (
                  <Picker
                    selectedValue={form.visitSubType}
                    onValueChange={(itemValue) => handleChange("visitSubType", itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Subcategory" value="" />
                    {filteredSubcategories.map((sub) => (
                      <Picker.Item key={sub} label={sub} value={sub} />
                    ))}
                  </Picker>
                ) : (
                  <Text style={styles.dateText}>{form.visitSubType || "Select Subcategory"}</Text>
                )}
              </TouchableOpacity>
            )}

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

export default EverboltServices;
