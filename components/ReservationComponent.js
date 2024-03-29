import React from 'react'
import { StyleSheet, Picker, Switch, Button, Text, View, Alert, Modal } from "react-native";
import DatePicker from 'react-native-datepicker';
import { Component } from 'react';
import * as Animatable from 'react-native-animatable'
import { Card } from 'react-native-elements';
import { Permissions, Notifications } from 'expo'
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
    state = {
        guests: 1,
        smoking: false,
        date: '',
        showModal: false
    }
    zoomIn = {
        0: {
            opacity: 0,
            scale: 0,
        },
        0.5: {
            opacity: 1,
            scale: 0.3,
        },
        1: {
            opacity: 1,
            scale: 1,
        },
    };
    static navigationOptions = {
        title: 'Reserve Table'
    }
    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal })
    }
    handleReservation() {
        console.log(JSON.stringify(this.state))
        console.log(`Number of Guests: ${this.state.guests} \nSmoking? ${this.state.smoking ? 'Yest' : 'No'}\nDate and Time: ${this.state.date}`)
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests} \nSmoking? ${this.state.smoking ? 'Yes' : 'No'}\nDate and Time: ${this.state.date}`,
            [
                {text: 'Cancel', onPress: () => this.resetForm(), style: 'cancel'},
                {
                    text: 'OK', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.addReservationToCalendar(this.state.date);
                        this.resetForm();
                    }
                },
            ],
            { cancelable: false }
          )
        //this.toggleModal()
    }
    async obtainCalenderPermission() {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            return true
        }
        return false;        
    }
    async addReservationToCalendar(date) {
        if(this.obtainCalenderPermission()) {
            Calendar.createEventAsync(Calendar.DEFAULT, {
                title: 'Con Fusion Table Reservation',
                timeZone: 'Asia/Hong_Kong',
                startDate: Date(Date.parse(date)),
                endDate: Date(Date.parse(date) * (2*60*60*1000)),
                location: '121, Clear Water Bay Road, Clear Water Bay, Knwloon, Hong Kong'
            })
        }
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
        })
    }
    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if( permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for '+date+' requested',
            ios: {
                sound: true,
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        })
    }
    render() {
        let body = (
            <Modal 
                animationType="slide"
                transparent={true}
                visible = {this.state.showModal}
                onDismiss = {() => this.toggleModal() }
                onRequestClose = {() => this.toggleModal() }
                style={{ width: '100%' }}
            >
                <View style = {styles.modal}>
                    <Text style = {styles.modalTitle}>Your Reservation</Text>
                    <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                    <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                    <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                    <Button 
                        onPress = {() =>{this.toggleModal(); this.resetForm();}}
                        color="#512DA8"
                        title="Close" 
                        />
                </View>
            </Modal>
        )
        if(!this.state.showModal) {
            body = (
                <Animatable.View
                    animation={this.zoomIn} 
                    duration={1000}
                >
                    <Card>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Number of Guests</Text>
                            <Picker
                                style={styles.formItem}
                                selectedValue={this.state.guests}
                                onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue})}
                            >
                                <Picker.Item label='1' value='1' />
                                <Picker.Item label='2' value='2' />
                                <Picker.Item label='3' value='3' />
                                <Picker.Item label='4' value='4' />
                                <Picker.Item label='5' value='5' />
                                <Picker.Item label='6' value='6' />
                            </Picker>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                            <Switch
                                style={styles.formItem}
                                value={this.state.smoking}
                                onTintColor='#512DA8'
                                onValueChange={(value) => this.setState({ smoking: value })}
                            >
                            </Switch>
                        </View>
                        <View style={styles.formRow}>
                            <Text style={styles.formLabel}>Date and Time</Text>
                            <DatePicker
                                style={{ flex: 2, marginRight: 20 }}
                                date={this.state.date}
                                format=''
                                mode='datetime' 
                                placeholder='Select date and Time'
                                onDateChange={(value) => this.setState({ date: value })}
                                minDate={ new Date().toLocaleString() }
                                confirmBtnText='Confirm'
                                cancelBtnText='Cancel'
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.formRow}>
                        <Button 
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this Purple Button'
                        />
                    </View>
                    </Card>
                </Animatable.View>
            )
        }
        return body
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flex: 1,
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation