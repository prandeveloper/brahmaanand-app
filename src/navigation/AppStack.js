import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CustomDrawer from '../components/CustomDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ProfileScreen from '../screens/ProfileScreen';
import TabNavigator from './TabNavigator';
import Membership from '../screens/DrawerPages/Membership';
import Feedback from '../screens/DrawerPages/Feedback';
import About from '../screens/DrawerPages/About';
import Contact from '../screens/DrawerPages/Contact';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OnboardingSlider from '../screens/OnboardingSlider';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OtpScreen from '../screens/OtpScreen';
import SubmitResource from '../screens/SubmitResource';
import Setting from '../screens/Setting';
import MyProfile from '../screens/settingPages/MyProfile';
import BrahmaWork from '../screens/settingPages/BrahmaWork';
import ContactUs from '../screens/settingPages/ContactUs';
import CategoryList from '../screens/HomePage/CategoryList';
import SubCategory from '../screens/HomePage/SubCategory';
import AllBlog from '../screens/blogPage/AllBlog';
import BlogDetail from '../screens/blogPage/BlogDetail';
import ResourceList from '../screens/HomePage/ResourceList';
import ResourceDetail from '../screens/HomePage/ResourceDetail';
import ProfileView from '../screens/settingPages/ProfileView';
import ReviewList from '../screens/HomePage/ReviewList';
import PromotionList from '../screens/HomePage/PromotionList';
import Bookmark from '../screens/settingPages/Bookmark';
import SearchPage from '../screens/SearchPage';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OnboardingSlider"
        component={OnboardingSlider}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={SearchPage}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Category"
        component={CategoryList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Sub-Category"
        component={SubCategory}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Resource List"
        component={ResourceList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Promotion List"
        component={PromotionList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Resource Detail"
        component={ResourceDetail}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="All Review"
        component={ReviewList}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Blogs"
        component={AllBlog}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="Blog Detail"
        component={BlogDetail}
        options={{headerShown: true}}
      />

      <Stack.Screen
        name="SubmitResource"
        component={SubmitResource}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileView}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />

      <Stack.Screen
        name="My Profile"
        component={MyProfile}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />

      <Stack.Screen
        name="BookMark"
        component={Bookmark}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="How It Works"
        component={BrahmaWork}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#4584FF',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="My Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Membership"
        component={Membership}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="card-membership" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Feedback"
        component={Feedback}
        options={{
          drawerIcon: ({color}) => (
            <MaterialIcons name="feedback" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Hospital"
        component={About}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons
              name="md-information-circle-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="contacts" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default AuthStack;
