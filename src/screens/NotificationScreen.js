import React from 'react';
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Image } from 'react-native';
import BackHeader from '../components/BackHeader';

const NotificationScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader label={'Notification'} onPress={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.swiming}>
                    <Text style={styles.swimingTxt} >New Scheme Alert: Pradhan Mantri Jan Arogya Yojana</Text>
                    <Text style={styles.txt}>PM-JAY refers to a specialised health insurance policy, which is available to all economically-challenged citizens of India. One such household can claim medical insurance coverage of up to Rs.5 lakh per year by paying premiums of Rs.30 annually.
                    </Text>
                    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}} >
                        <Text style={{color:'#4586FF'}} >20/8/2022</Text>
                        <Text style={{color:'#4586FF'}}>10:00 AM</Text>
                    </View>
                </View>
                <View style={styles.swiming}>
                    <Text style={styles.swimingTxt} >Your Follow-up with Dr. John Doe is next week.Book your appointment now.</Text>
                </View>
                <View style={[styles.secondSection]}>
                    <Image style={{
                        width: 100,
                        height: 150,
                        borderRadius: 15
                    }} source={require('../assets/images/FarCry6.png')} />
                    <View style={styles.leftSection}>
                        <Text style={styles.swimingTxt}>Anaerobic exercise: What it is and how it affects the body</Text>
                        <Text style={styles.txt}>You’ve most likely heard of anaerobic exercise before, but how much do you know about the science behind this vital aspect of your physical fitness? Enhancing your comprehension of the anaerobic energy system is a sure-fire way to empower yourself and give your workouts a boost.</Text>
                    </View>
                </View>
                <View >
                <Image style={styles.banner} source={require('../assets/images/departmentHospital.png')} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    poolimg: {
        width: '100%',
        height: 100,
        alignSelf: 'center',
        borderRadius: 20
    },
    swiming: {
        height: 'auto', width: '95%', justifyContent: 'center',
        backgroundColor: '#fff', padding: 10,
        alignSelf: 'center', borderRadius: 10, shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
        marginTop: 10
    },
    swimingTxt: {
        color: '#4584FF',
        fontFamily: 'Roboto-Medium',
        marginBottom: 5
    },
    txt: {
        color: 'black',
        fontSize: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondSection:{
        height: 'auto',
         width: '95%',
         backgroundColor: '#fff', 
         padding: 10,
        alignSelf: 'center', 
        borderRadius: 10, 
        shadowColor: 'blue',
        elevation: 7,
        shadowRadius: 10,
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        alignItems:'center'
        
      },
      leftSection:{
        height: 'auto', width: '75%', padding: 10,
      },
      banner:{
        width:'95%',height:150,borderRadius:10,alignSelf:'center'
      }
})

export default NotificationScreen;
