import React from 'react'
import {
    View, Text, TextInput, Button, TouchableOpacity,
    Image, Pressable, ScrollView, StyleSheet, PermissionsAndroid, Platform, GestureResponderEvent
} from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import ImagePicker from 'react-native-image-crop-picker'
import { RadioButton } from 'react-native-paper'
import { Dropdown } from 'react-native-element-dropdown'
import { useDispatch } from 'react-redux'
import { createUser } from '../../Redux/Slice/userData'
import { useNavigation } from '@react-navigation/native'

const validationSchema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    gender: yup.string().required('Gender is required'),
    phoneNumber: yup.string().matches(/^[0-9]{10}$/, 'Phone number must be 10 digits').required('Phone Number is required'),
    address: yup.string().required('Address is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    profileImage: yup.string().required('Profile Image is required'),
    interestedSports: yup.string().required('Please select one sport'),
})

export const Registration = () => {
    const [openPickerOption, setOpenPickerOption] = React.useState(false)
    const [isFocus, setIsFocus] = React.useState(false)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const dropdownData = [
        { label: 'Football', value: 'Football' },
        { label: 'Cricket', value: 'Cricket' },
        { label: 'Badminton', value: 'Badminton' },
        { label: 'Table Tennis', value: 'Table Tennis' },
    ];

    const handleImagePicker = () => {
        setOpenPickerOption(true)
    }

    const handleCamera = async (setFieldValue: Function) => {
        try {
            setOpenPickerOption(false)
            const cameraPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'This app needs access to your camera.',
                    buttonPositive: 'OK',
                }
            );

            const storagePermission = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            ])

            if (
                cameraPermission === PermissionsAndroid.RESULTS.GRANTED &&
                storagePermission['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED &&
                storagePermission['android.permission.WRITE_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
            ) {
                ImagePicker.openCamera({
                    width: 300,
                    height: 400,
                    cropping: true,
                }).then((image: any) => {
                    setFieldValue('profileImage', image.path)
                })
            } else {
                console.log('Permissions denied');
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    const handleGallery = (setFieldValue: Function) => {
        setOpenPickerOption(false)
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then((image: any) => {
            setFieldValue('profileImage', image.path)
        })
    }

    const handleRemoveImage = (setFieldValue: Function) => {
        setOpenPickerOption(false)
        setFieldValue('profileImage', '')
    }

    return (
        <TouchableOpacity onPress={() => setOpenPickerOption(false)} activeOpacity={1}
            style={{ flex: 1, backgroundColor: openPickerOption ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    gender: '',
                    phoneNumber: '',
                    address: '',
                    email: '',
                    profileImage: '',
                    interestedSports: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    dispatch(createUser(values))
                    // navigation.navigate('Dashboard')
                }}
            >
                {({ handleChange, handleBlur, values, errors, touched, setFieldValue, handleSubmit }) => (
                    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 20 }}>
                        <View style={{ marginVertical: 20 }}>
                            <TextInput
                                onChangeText={handleChange('firstName')}
                                onBlur={handleBlur('firstName')}
                                value={values.firstName}
                                placeholder="First Name"
                                style={{
                                    borderWidth: 1, borderRadius: 6, fontSize: 16,
                                    lineHeight: 20, letterSpacing: 0.5, color: 'black',
                                }}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                            />
                            {touched.firstName && errors.firstName &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.firstName}</Text>}
                        </View>

                        <View>
                            <TextInput
                                onChangeText={handleChange('lastName')}
                                onBlur={handleBlur('lastName')}
                                value={values.lastName}
                                placeholder="Last Name"
                                style={{
                                    borderWidth: 1, borderRadius: 6, fontSize: 16,
                                    lineHeight: 20, letterSpacing: 0.5, color: 'black'
                                }}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                            />
                            {touched.lastName && errors.lastName &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.lastName}</Text>}
                        </View>

                        <RadioButton.Group onValueChange={value => setFieldValue('gender', value)} value={values.gender}>
                            <RadioButton.Item label="Male" value="Male" style={{ marginTop: 15 }} />
                            <RadioButton.Item label="Female" value="Female" />
                        </RadioButton.Group>
                        {touched.gender && errors.gender &&
                            <Text style={{
                                fontSize: 12, color: 'red',
                                fontWeight: '600', marginHorizontal: 5, marginTop: 5
                            }}>
                                {errors.gender}</Text>}

                        <View style={{ marginVertical: 20 }}>
                            <TextInput
                                onChangeText={handleChange('phoneNumber')}
                                onBlur={handleBlur('phoneNumber')}
                                value={values.phoneNumber}
                                placeholder="Phone number"
                                style={{
                                    borderWidth: 1, borderRadius: 6, fontSize: 16,
                                    lineHeight: 20, letterSpacing: 0.5, color: 'black',
                                }}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                                keyboardType="phone-pad"
                            />
                            {touched.phoneNumber && errors.phoneNumber &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.phoneNumber}</Text>}
                        </View>

                        <View style={{ marginVertical: 20 }}>
                            <TextInput
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                                placeholder="Address"
                                multiline={true}
                                numberOfLines={4}
                                style={{
                                    borderWidth: 1, borderRadius: 6, fontSize: 16,
                                    lineHeight: 20, letterSpacing: 0.5, color: 'black',
                                }}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                            />
                            {touched.address && errors.address &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.address}</Text>}
                        </View>

                        <View>
                            <TextInput
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Email"
                                keyboardType="email-address"
                                style={{
                                    borderWidth: 1, borderRadius: 6, fontSize: 16,
                                    lineHeight: 20, letterSpacing: 0.5, color: 'black',
                                }}
                                placeholderTextColor={'rgba(0,0,0,0.5)'}
                            />
                            {touched.email && errors.email &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.email}</Text>}
                        </View>

                        <View style={{ marginVertical: 20, alignItems: 'center' }}>

                            {values.profileImage ?
                                <Image source={{ uri: values.profileImage }}
                                    style={{
                                        width: 75, height: 75, borderRadius: 75,
                                        marginBottom: 15, borderWidth: 1, borderColor: 'gray'
                                    }}
                                    resizeMode='contain' />
                                : null}
                            <Pressable onPress={handleImagePicker}>
                                <Text style={{
                                    fontSize: 16, lineHeight: 20, letterSpacing: 0.5,
                                    color: 'black', textDecorationLine: 'underline'
                                }}>
                                    Choose Profile Image</Text>
                            </Pressable>
                            {touched.profileImage && errors.profileImage &&
                                <Text style={{
                                    fontSize: 12, color: 'red',
                                    fontWeight: '600', marginHorizontal: 5, marginTop: 5
                                }}>
                                    {errors.profileImage}</Text>}
                        </View>

                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownData}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select sport' : '...'}
                            searchPlaceholder="Search..."
                            value={values.interestedSports}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setFieldValue('interestedSports', item.value)
                                setIsFocus(false)
                            }}
                            dropdownPosition='auto'
                        />
                        {touched.interestedSports && errors.interestedSports &&
                            <Text style={{
                                fontSize: 12, color: 'red',
                                fontWeight: '600', marginHorizontal: 5, marginTop: 5
                            }}>
                                {errors.interestedSports}</Text>}

                        <View style={{ width: '50%', alignSelf: 'center', marginVertical: 20 }}>
                            <Button onPress={() => handleSubmit()} title="Submit" />
                        </View>

                        {openPickerOption ?
                            <View style={{
                                position: 'absolute', backgroundColor: 'white',
                                alignSelf: 'center', top: '40%', width: '70%', alignItems: 'center',
                                borderRadius: 10
                            }}>
                                <Text style={{
                                    color: 'black', fontSize: 18, fontWeight: '500',
                                    marginTop: 18, marginBottom: 8, flex: 1, textDecorationLine: 'underline'
                                }}
                                    onPress={() => handleCamera(setFieldValue)}>
                                    Camera</Text>
                                <Text style={{
                                    color: 'black', fontSize: 18, fontWeight: '500',
                                    marginVertical: 18, flex: 1, textDecorationLine: 'underline'
                                }}
                                    onPress={() => handleGallery(setFieldValue)}>
                                    Gallery</Text>
                                <Text style={{
                                    color: 'black', fontSize: 18, fontWeight: '500',
                                    marginBottom: 18, marginTop: 8, flex: 1, textDecorationLine: 'underline'
                                }}
                                    onPress={() => handleRemoveImage(setFieldValue)}>
                                    Remove</Text>
                            </View>
                            : null}
                    </ScrollView>
                )}
            </Formik>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})