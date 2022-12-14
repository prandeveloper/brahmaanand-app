import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from 'accordion-collapse-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomHeader from '../components/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {MultiSelect} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubmitResource = ({navigation}) => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('');
  const [format, setFormat] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [upYear, setUpYear] = useState('');
  const [desc, setDesc] = useState('');
  const [comment, setComment] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [singleFile, setSingleFile] = useState('');
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [lang, setLang] = useState([]);
  const [userID, setUserID] = useState('');
  const [selected, setSelected] = useState([]);

  // console.log(selected);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        //console.log('success');
        console.log('userID', user);
        setUserID(user);
      }
    } catch (e) {
      console.log('no Value in Signup');
    }
  };

  const chooseFrontFile = type => {
    let options = {
      mediaType: 'photo',
      maxWidth: 100,
      maxHeight: 100,
      selectionLimit: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      console.log('response : ' + JSON.stringify(response));
      setSingleFile(response);
      console.log(response.assets[0].base64);
      if (response.didCancel === 'true') {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
    });
  };

  const getCategory = () => {
    axios
      .get(`http://3.7.173.138:9000/admin/getallCategory`)
      .then(response => {
        //console.log(response.data.data);
        setCatList(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getSubCategory = () => {
    // console.log(category);
    axios
      .get(`http://3.7.173.138:9000/admin/listbycategory/${category}`)
      .then(response => {
        //   console.log(response.data.data);
        setSubCatList(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getYear = () => {
    axios
      .get(`http://3.7.173.138:9000/user/allYear`)
      .then(response => {
        //console.log(response.data.data);
        setYearList(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };
  const getLanguage = () => {
    axios
      .get(`http://3.7.173.138:9000/user/allLang`)
      .then(response => {
        //console.log(response.data.data);
        setLang(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getCategory();
    getSubCategory();
    getYear();
    getLanguage();
  }, [userID, category]);

  // function submit() {
  //   resourceSubmit();
  // }

  const submit = () => {
    if (userID !== null && userID !== undefined && userID !== '') {
      if (
        url !== '' &&
        type !== '' &&
        format !== '' &&
        category !== '' &&
        subCategory !== '' &&
        topic !== '' &&
        selected != ''
      ) {
        axios
          .post(`http://3.7.173.138:9000/user/App_Sub_resrc`, {
            img: singleFile.assets[0].base64,
            link: url,
            category: category,
            sub_category: subCategory,
            type: type,
            format: format,
            topics: topic,
            language: selected,
            resTitle: title,
            creatorName: name,
            relYear: upYear,
            res_desc: desc,
            comment: comment,
            userid: userID,
          })
          .then(response => {
            console.log(response.data);
            if (response.data.message === 'success') {
              Alert.alert('Resource Submitted Successfully');
              setUrl('');
              setType('');
              setFormat('');
              setCategory('');
              setSubCategory('');
              setTopic('');
              setSelected('');
              setTitle('');
              setName('');
              setUpYear('');
              setDesc('');
              setComment('');
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        Alert.alert('Field Should not be Empty');
      }
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Resource" navigation={navigation} />
      <ScrollView style={{}}>
        <View style={styles.mainView}>
          <View style={styles.innerView}>
            <TouchableOpacity
              style={styles.buttonTouch1}
              onPress={chooseFrontFile}>
              <View style={styles.uploadView}>
                <Ionicons name="md-camera" color="#FFF" size={25} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.innerView}>
            {url !== '' ? (
              <Text style={styles.labelText}>Link</Text>
            ) : (
              <Text style={styles.labelText}>
                Link<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}

            <TextInput
              style={styles.input}
              onChangeText={setUrl}
              value={url}
              placeholder="Enter URL"
              placeholderTextColor="#000"
            />
          </View>

          <View style={styles.innerView}>
            {type !== '' ? (
              <Text style={styles.labelText}>Type</Text>
            ) : (
              <Text style={styles.labelText}>
                Type<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}

            <Picker
              style={styles.pickerInput}
              dropdownIconColor="#000"
              selectedValue={type}
              onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
              <Picker.Item label="Select Type..." />
              <Picker.Item label="Free" value="free" />
              <Picker.Item label="Paid" value="paid" />
            </Picker>
          </View>

          <View style={styles.innerView}>
            {format !== '' ? (
              <Text style={styles.labelText}>Format</Text>
            ) : (
              <Text style={styles.labelText}>
                Format<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}

            <Picker
              style={styles.pickerInput}
              dropdownIconColor="#000"
              selectedValue={format}
              onValueChange={(itemValue, itemIndex) => setFormat(itemValue)}>
              <Picker.Item label="Select Format..." />
              <Picker.Item label="Video" value="video" />
              <Picker.Item label="Text" value="text" />
              <Picker.Item label="Video & Text" value="video & text" />
            </Picker>
          </View>

          <View style={styles.innerView}>
            {category !== '' ? (
              <Text style={styles.labelText}>Category</Text>
            ) : (
              <Text style={styles.labelText}>
                Category<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}
            <Picker
              style={styles.pickerInput}
              dropdownIconColor="#000"
              selectedValue={category}
              onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
              <Picker.Item label="Select Category" />
              {catList?.map(cat => (
                <Picker.Item
                  key={cat?._id}
                  label={cat?.title}
                  value={cat?._id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.innerView}>
            {subCategory !== '' ? (
              <Text style={styles.labelText}>Sub Category</Text>
            ) : (
              <Text style={styles.labelText}>
                Sub Category<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}

            <Picker
              style={styles.pickerInput}
              dropdownIconColor="#000"
              selectedValue={subCategory}
              onValueChange={(itemValue, itemIndex) =>
                setSubCategory(itemValue)
              }>
              <Picker.Item label="Select Sub-Category" />
              {subCatList?.map(subCat => (
                <Picker.Item
                  key={subCat?._id}
                  label={subCat?.title}
                  value={subCat?._id}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.innerView}>
            {topic !== '' ? (
              <Text style={styles.labelText}>Topic</Text>
            ) : (
              <Text style={styles.labelText}>
                Topic<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}
            <TextInput
              style={styles.input}
              onChangeText={setTopic}
              value={topic}
              placeholder="Enter Topic"
              placeholderTextColor="#000"
            />
          </View>

          <View style={styles.innerView}>
            {selected != '' ? (
              <Text style={styles.labelText}>Language</Text>
            ) : (
              <Text style={styles.labelText}>
                Language<Text style={{color: 'red'}}>*</Text>
              </Text>
            )}
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              //search
              data={lang}
              labelField="language"
              itemTextStyle={{color: '#000'}}
              valueField="_id"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={selected}
              onChange={item => {
                setSelected(item);
              }}
              selectedStyle={styles.selectedStyle}
            />
          </View>
          <View style={styles.innerView}>
            <Collapse>
              <CollapseHeader>
                <View style={styles.DropInput}>
                  <Text style={{color: '#000', fontWeight: '600'}}>
                    Optional
                  </Text>
                </View>
              </CollapseHeader>
              <CollapseBody>
                <View style={styles.innerView}>
                  <Text style={styles.labelText}>Title</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setTitle}
                    value={title}
                    placeholder="Enter Title"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.labelText}>Creator Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Enter Name"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.labelText}>
                    Release year/Last updated
                  </Text>
                  <Picker
                    style={styles.pickerInput}
                    dropdownIconColor="#000"
                    selectedValue={upYear}
                    onValueChange={(itemValue, itemIndex) =>
                      setUpYear(itemValue)
                    }>
                    <Picker.Item label="Select Year" />
                    {yearList?.map(year => (
                      <Picker.Item
                        key={year._id}
                        label={year?.yrName}
                        value={year._id}
                      />
                    ))}
                  </Picker>
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.labelText}>Description</Text>
                  <TextInput
                    multiline
                    numberOfLines={10}
                    style={styles.input}
                    onChangeText={setDesc}
                    value={desc}
                    placeholder="Enter Description"
                    placeholderTextColor="#000"
                  />
                </View>
                <View style={styles.innerView}>
                  <Text style={styles.labelText}>Comments</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setComment}
                    value={comment}
                    placeholder="Enter Comment"
                    placeholderTextColor="#000"
                  />
                </View>
              </CollapseBody>
            </Collapse>
          </View>

          <View style={styles.innerView}>
            <TouchableOpacity style={styles.buttonTouch} onPress={submit}>
              <Text style={styles.ButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubmitResource;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainView: {
    marginHorizontal: 30,
    marginVertical: 30,
    marginBottom: 80,
  },
  innerView: {
    marginVertical: 10,
  },
  labelText: {
    color: '#FC9358',
    fontWeight: '700',
  },
  input: {
    color: '#000',
    height: 50,
    borderWidth: 1,
    borderColor: '#FC9358',
    padding: 10,
    backgroundColor: '#FFF',
  },
  pickerInput: {
    color: '#000',
    borderWidth: 1,

    backgroundColor: '#FFF',
  },
  DropInput: {
    height: 40,
    borderWidth: 0,
    padding: 10,
    backgroundColor: '#fff',
  },
  buttonTouch1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  uploadView: {
    backgroundColor: '#FC9358',
    padding: 30,
    borderRadius: 50,
  },
  buttonTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FC9358',
    paddingVertical: 15,
    borderRadius: 20,
  },
  ButtonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 18,
  },
  //multi select
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#000',
  },

  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },

  selectedStyle: {
    borderRadius: 10,
  },
});
