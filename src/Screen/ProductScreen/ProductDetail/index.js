import React from 'react';
import { ScrollView, Image, View, Text, TouchableOpacity, Modal, TouchableHighlight, NativeEventEmitter, NativeModules } from 'react-native';
import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-simple-toast';
import Icon from "react-native-vector-icons/Ionicons";
import { Calendar } from 'react-native-calendars';
import Tts from 'react-native-tts';
import styles from './styles';
import { COLORS } from '../../../utils/color';
import { useAppDispatch } from '../../../redux/hooks';
import { fetchAppointment } from '../../../redux/slice/ProductReducer';

const ProductDetail = ({route, navigation}) => {
    const [app_data, setAppData] = React.useState({})
    const [data, setData] = React.useState({})
    const [shop_name, setShopName] = React.useState({})
    const [shop_id, setShopId] = React.useState('')
    const [token, setToken] = React.useState('')
    const [loading, setLoading] = React.useState(true)
    const [data2, setData2] = React.useState([])
    const [data3, setData3] = React.useState([])
    const [image, setImage] = React.useState([])
    const [data4, setData4] = React.useState([])
    const [selectedItems, setSelectedItems] = React.useState([])
    const [is_appointment, setIsAppointment] = React.useState(false)
    const [modalVisible, setModalVisible] = React.useState(false)
    const [weekoff, setWeekoff] = React.useState([])
    const [slots, setSlots] = React.useState([])
    const [day, setDay] = React.useState("")
    const [date, setDate] = React.useState("")
    const [timeslot, setTimeslot] = React.useState("")
     const dispatch = useAppDispatch()

    const { url } = route.params;
    React.useEffect(() => {
        getObject(url)
    }, [])

    const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
	ee.addListener('tts-start', () => {});
	ee.addListener('tts-finish', () => {});
	ee.addListener('tts-cancel', () => {});


    async function getAppointment(s) {
        // setLoading(true);
        await axios.get(`http://100.26.11.43/shops/appointmentduration/` + s.shop_name + '/')
            .then(async(res) => {

                console.log('appointment res',res)
              
                if (res.data[0]) {
                    const weekoff = res.data[0].weekoff;
                    const dur = res.data[0].appointments_in_one_slot;
                    const tot = res.data[0].total_slot_in_day;
                    const shop_id = res.data[0].shop_id;
                    let slotlist = [];
                    for (let i = 1; i <= dur * tot; i++) {
                        slotlist.push(i);

                    }
                    setIsAppointment(true);
                    setAppData(res.data[0]);
                    setWeekoff(JSON.parse(weekoff));
                    setSlots(slotlist);
                    setShopId(shop_id);
                    
                }
            })
            .catch(err => { console.log(err); });
    }

    async function getObject(url) {
        let res = await axios.get(url);
        setData(res.data);
        setShopName(res.data.shop_name);
        image.push(res.data.product_image);
        setToken(token);
        let res2 = await axios.get(res.data.content_category);
        setData2(res2.data);
        let res3 = await axios.get(res.data.images);
        setData3(res3.data);
        let res4 = await axios.get(res.data.taxes);
        setData4(res4.data);
        imagePushHandler();
        setLoading(false);
       
       await getAppointment(res.data.shop_name);
    //    setLoading(false);
       
    }

   

    const createAppointment = async () => {
        console.log(day, date, shop_id, "pom")
        const data = {
                "appointment_date": day.toString,
                "appointment_time": timeslot,
                "appointment_booked": true,
                "shop": shop_id
        }

        dispatch(fetchAppointment(data))
        // await axios.post(`http://100.26.11.43/shops/appointment/`,
        //     {
        //         "appointment_date": day.toString,
        //         "appointment_time": timeslot,
        //         "appointment_booked": true,
        //         "shop": shop_id
        //     },
        //     {
        //         headers: { Authorization: token }
        //     })
            .then(res => {

                console.log(res.data, "vinni")
                // AsyncStorage.setItem('appointment_id', JSON.stringify(res.data.id))
                addTOCArtHandler()
            })
            .catch(err => { console.log(err) })
    }

    const imagePushHandler = async () => {
        let arr = image
        return data3.map((t, key) => {
            return (
                arr.push(t.image),
                setImage(arr)
            )
        })
    }

    const LocationSpeakHandler = () => {
        Tts.speak("Aisle Number" + data.Aisle_number + "Shelf Number" + data.Shelf_number + data.Shelf_side + "side")
    }

    const addTOCArtHandler = async () => {
        setLoading(true)
        // let token = await AsyncStorage.getItem('token');
        // alert(token)
        if (token) {
            if (data2.length === 0) {
                let res = await axios.get(data.add_to_cart + "?data=" + selectedItems,
                    {
                        headers: {
                            Authorization: token
                        }
                    },
                    {
                        params: {
                            "options": selectedItems
                        }
                    }
                )
                setLoading(false)
                // Toast.show(res.data.message)
               Tts.speak(res.data.message)

            } else {
                setLoading(false)
                const { url } = route.params;
                navigation.navigate('productContent', { url: url })
            }
        } else {
            const { url } = route.params;
            navigation.navigate('productContent', { url: url })
        }
    }

        return (
            <View style={styles.fullContainer}>
                <View style={{ width: "100%", flexDirection: "row"}}>
                    <Icon style={{ color: COLORS.black, padding: 12 }}
                        size={25} name="arrow-back-outline"
                        onPress={() => navigation.goBack()} />
                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.centeredView}>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(false)
                                }}>
                                <ScrollView contentContainerStyle={styles.centeredView}>

                                    <View style={styles.modalView}>
                                        <Text style={{ fontSize: 16, color: "#17baa1" }}>Add Appointment</Text>
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ fontSize: 15, color: "orange" }}> Weekly Off </Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                                {weekoff.map((item, index) => item.Weeklyoff ? <Text style={{ color: '#000' }} key={index}> {item.name}</Text> : null)}
                                            </View>
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ fontSize: 15, color: "orange" }}> Select Date </Text>
                                            <Calendar
                                                onDayPress={(day) => setDay(day.dateString)}
                                                style={styles.calendar}
                                                hideExtraDays
                                                // markedDates={{ [this.state.selected]: { selected: true } }}
                                                theme={{
                                                    selectedDayBackgroundColor: 'green',
                                                    todayTextColor: 'green',
                                                    arrowColor: 'green',
                                                }}
                                            />
                                            <Text style={{ marginVertical: 5, color:"#000" }}>Selected Date : {day}</Text>
                                        </View>
                                        <View style={{ margin: 10 }}>
                                            <Text style={{ fontSize: 15, color: "orange" }}> Select Time slot </Text>
                                            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                                                {slots.map((i) =>
                                                    <TouchableOpacity
                                                        key={i}
                                                        onPress={() => setTimeslot("Slot " + i)}
                                                        style={{ padding: 5, backgroundColor: "#17baa1", borderRadius: 5, margin: 5 }}
                                                    >
                                                        <Text> Slot {i}</Text>
                                                    </TouchableOpacity>
                                                )}
                                            </View>
                                            <Text style={{ marginVertical: 5, color:"#000" }}>Selected Time : {timeslot}</Text>
                                        </View>
                                        <TouchableHighlight
                                            style={{ ...styles.openButton, backgroundColor: '#2196F3', marginTop: 10 }}
                                            onPress={() => {
                                                createAppointment()
                                                setModalVisible(false);
                                            }}>
                                            <Text style={styles.textStyle}>Create</Text>
                                        </TouchableHighlight>
                                    </View>
                                </ScrollView>
                            </Modal>
                        </View>
                        <View style={styles.imgStyle}>
                            <Image style={styles.imgStyle} 
									source={{uri: image[0]}}/>
                        </View>
                        <View style={{ padding: 5 }}>
                            <Text style={styles.nameStyle}>
                                {data.product_name}
                            </Text>
                            <Text style={styles.priceStyle}>
                                ${data.product_price}
                            </Text>
                            <Text style={styles.shopStyle}>
                                {shop_name.shop_name}
                            </Text>
                            <Text style={{}} >
                                {data.description}
                            </Text>

                            <Text style={{ fontSize: 15, fontStyle: "italic", color: "orange" }} onPress={() => LocationSpeakHandler()}>
                                Aisle Number:{data.Aisle_number} ,
                                Shelf Number:{data.Shelf_number} ,
                                {data.Shelf_side} Side
                            </Text>

                        </View>

                    </View>

                </ScrollView>

                {!is_appointment ? <TouchableOpacity style={styles.buttonStyle} onPress={() => setModalVisible(true)}>
                    <Text style={{ fontSize: 20, color: "#fff" }}>
                        ADD APPOINTMENT
                    </Text>
                </TouchableOpacity>
                    :
                    <TouchableOpacity style={styles.buttonStyle} onPress={() => addTOCArtHandler()}>
                        {data2.length === 0 ? <Text style={{ fontSize: 20, color: "#fff" }}>
                            ADD TO CART
                        </Text> :
                            <Text style={{ fontSize: 20, color: "#fff" }}>
                                CREATE
                            </Text>
                        }
                    </TouchableOpacity>}
            </View>
        )
    }

export default ProductDetail;
