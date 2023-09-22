import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Link, Stack } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import DatePicker from 'react-native-modern-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import CustomButton from '../components/CustomButton';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import emailjs from '@emailjs/browser';

export default function form() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      lastName: "",
      firstName: "",
      description: "",
      address: "",
      postalCode: "",
      city: "",
      email: "",
      phoneNumber: "",
    },
  })
  const onSubmit = (data) => {
    console.log(data)
    sendEmail(data)
  }

  const alertingReason = [
    "Animal errant",
    "Accident",
    "Travaux",
    "Embouteillages",
    "Stationnement gênant",
    "Matériel urbain défectueux"
  ];

  alertingReason.sort();

  const [selectedDate, setSelectedDate] = useState('');

  const errorMessage = <Text style={{ color: "#CD0034" }}>*Ce champ est obligatoire.</Text>;

  const [markerPosition, setMarkerPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [findedLocation, setFindedLocation] = useState(false);

  const sendEmail = (data) => {
    
    emailjs.send('service_3o8zzmk', 'template_1w6t0kn', 
    {
        from_firstname : data.firstName,
        from_lastname : data.lastName,
        from_address : data.address,
        from_postalcode : data.postalCode,
        from_city : data.lastName,
        to_name : "WebAppli AlertSimplon",
        message: data.description,
    }
    , 'ELKMPGv8GC5Yj-3Nz')
    .then((result) => {
        console.log(result.text);
    }, (error) => {
        console.log(error.text);
    });
};

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);

      setMarkerPosition({
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      });
      if(findedLocation == false) {
        setFindedLocation(true);
      }
    })();
  }, []);
  
  const reverseGeocode = async (lat, lon) => {
    try {
      let result = await Location.reverseGeocodeAsync({
        latitude: lat,
        longitude: lon,
      });
      setValue(
        "address",
        `${result[0].name}, ${result[0].city}, ${result[0].region}`
      );
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ScrollView style={styles.scrollView}>
      <Stack.Screen options={{ title: 'Déclarer une alerte'}}/>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown
            buttonStyle={styles.input}
            renderDropdownIcon={isOpened => { return <FontAwesomeIcon icon={isOpened ? faChevronUp : faChevronDown } />}}
            data={alertingReason}
            defaultButtonText= "Type d'alerte"
            onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
            }}
            rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
            }}
          />
        )}
        name="description"
      />
      {errors.description && errorMessage}

      <DatePicker
        onSelectedChange={date => setSelectedDate(date)}
      />
      {findedLocation ? (
        <View style={styles.mapContainer}>
        <MapView style={styles.map} region={markerPosition}>
          <Marker draggable coordinate={markerPosition} title='Ma position' onDragEnd={''}></Marker>
        </MapView>
      </View>
      ) : (<View></View>)}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, { height: 150 }]}
            placeholder="Dites nous en plus..."
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            multiline={true}
            numberOfLines={4}
          />
        )}
        name="description"
      />
      {errors.description && errorMessage}
      
      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Nom"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />
      {errors.lastName && errorMessage}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      {errors.firstName && errorMessage}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Adresse"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="address"
      />
      {errors.address && errorMessage}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 5,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Code postal"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            maxLength={5}
          />
        )}
        name="postalCode"
      />
      {errors.postalCode && errorMessage}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Ville"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="city"
      />
      {errors.city && errorMessage}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email ? (
        <>
          {errors.email.type === "required" && (
            errorMessage
          )}
          {errors.email.type === "pattern" && (
            <Text style={{ color: "#CD0034" }}>*Le format d'email n'est pas correct.</Text>
          )}
        </>
      ) : null}

      <Controller
        control={control}
        rules={{
          required: true,
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Numéro de téléphone"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            maxLength={10}
          />
        )}
        name="phoneNumber"
      />
      {errors.phoneNumber && errorMessage}

      <CustomButton backgroundColor= "#32CD32" title="Valider ma déclaration" onPress={handleSubmit(onSubmit)} />
      <Link href="/" asChild>
        <CustomButton backgroundColor="#CD0034" title="Annuler" />
      </Link>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 10,
  },
  scrollView: {
    paddingHorizontal: 20,
  },
  dropdown: {
    backgroundColor: "#CD0034"
  },
  mapContainer: {
    height: 300,
    marginTop: 20,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: "#CD0034",
    fontSize: 16,
  },
});
