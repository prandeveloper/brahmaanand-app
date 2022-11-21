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

// const data = [
//   {label: 'Item 1', value: '1'},
//   {label: 'Item 2', value: '2'},
//   {label: 'Item 3', value: '3'},
//   {label: 'Item 4', value: '4'},
//   {label: 'Item 5', value: '5'},
//   {label: 'Item 6', value: '6'},
//   {label: 'Item 7', value: '7'},
//   {label: 'Item 8', value: '8'},
// ];

const SubmitResource = ({navigation}) => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState();
  const [format, setFormat] = useState();
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState();
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [upYear, setUpYear] = useState();
  const [desc, setDesc] = useState('');
  const [comment, setComment] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [singleFile, setSingleFile] = useState('');
  const [catList, setCatList] = useState([]);
  const [subCatList, setSubCatList] = useState([]);
  const [yearList, setYearList] = useState([]);
  const [lang, setLang] = useState([]);
  const [data, setData] = useState();
  const [selected, setSelected] = useState([]);

  console.log(selected);

  const getData = async () => {
    try {
      const user = await AsyncStorage.getItem('userId');
      if (user !== null) {
        //console.log('success');
        //console.log(user);
        setData(user);
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
      .get(`http://43.205.82.226:9000/admin/getallCategory`)
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
      .get(`http://43.205.82.226:9000/admin/listbycategory/${category}`)
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
      .get(`http://43.205.82.226:9000/user/allYear`)
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
      .get(`http://43.205.82.226:9000/user/allLang`)
      .then(response => {
        console.log(response.data.data);
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
  }, [category, data]);

  function submit() {
    resourceSubmit();
  }
  const resourceSubmit = () => {
    console.log(
      singleFile.assets[0].base64,
      selected,
      type,
      format,
      category,
      subCategory,
      url,
      data,
      topic,
      title,
      name,
      upYear,
      desc,
      comment,
    );
    const data = new FormData();
    data.append('userid', data);
    data.append('link', url);
    data.append('category', category);
    data.append('sub_category', subCategory);
    data.append('type', type);
    data.append('format', format);
    data.append('language', selected);
    data.append('topics', topic);
    data.append('resTitle', title);
    data.append('creatorName', name);
    data.append('relYear', upYear);
    data.append('res_desc', desc);
    data.append('comment', comment);
    data.append('img', singleFile.assets[0].base64);
    fetch(`http://3.7.173.138:9000/user/App_Sub_resrc`, {
      method: 'post',
      headers: {'Content-Type': 'multipart/form-data'},
      body: data,
    })
      .then(response => {
        response.json().then(res => {
          console.log(res);
          // if (res.message === 'success') {
          //   Alert.alert('Image Uploaded Successfully👍');
          // } else {
          //   Alert.alert('Something went wrong');
          // }
        });
      })
      .catch(error => {
        console.log(error);
      });
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
                {/* <Text style={styles.ButtonText}>Upload Image</Text> */}
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.innerView}>
            <Text style={styles.labelText}>Link</Text>
            <TextInput
              style={styles.input}
              onChangeText={setUrl}
              value={url}
              placeholder="Enter URL"
              placeholderTextColor="#000"
            />
          </View>
          <View style={styles.innerView}>
            <Text style={styles.labelText}>Type</Text>
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
            <Text style={styles.labelText}>Format</Text>
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
            <Text style={styles.labelText}>Category</Text>
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
            <Text style={styles.labelText}>Sub-Category</Text>
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
            <Text style={styles.labelText}>Topic</Text>
            <TextInput
              style={styles.input}
              onChangeText={setTopic}
              value={topic}
              placeholder="Enter Topic"
              placeholderTextColor="#000"
            />
          </View>
          <View style={styles.innerView}>
            <Text style={styles.labelText}>Language</Text>
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
    backgroundColor: '#000',
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
