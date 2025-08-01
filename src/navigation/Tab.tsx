import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AppHome from '../screens/nonAuth/AppHome';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarComponent from '../screens/components/Calender';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const Tabs = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          height: 97,
          overflow: 'hidden',
          borderWidth: 1,
        },
      }}
    >
      <Tab.Screen name='AppHome' component={AppHome}
        options={{
          header:() => <CalendarComponent/>,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../assets/icons/Notebook.png')}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)' }
                ]}
              />
              <Text style={[
                styles.tabText,
                { 
                  color: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)',
                }
              ]}>
                Journal
              </Text>
            </View>
          ),
        }}
      />
      
      <Tab.Screen name='People' component={AppHome} 
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../assets/icons/People.png')}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)' }
                ]}
              />
              <Text style={[
                styles.tabText,
                { 
                  color: focused ? 'rgba(0,128,74,1)' : '#rgba(5,5,5,1)',
                }
              ]}>
                Friends
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen name='CharacterScreen' component={AppHome} 
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../assets/icons/Chat.png')}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)' }
                ]}
              />
              <Text style={[
                styles.tabText,
                { 
                  color: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)',
                }
              ]}>
                Chat
              </Text>
            </View>
          ),
        }}
      />

      
      <Tab.Screen name='ProfileScreen' component={AppHome} 
        options={{
          headerShown:false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Image
                source={require('../assets/icons/Account.png')}
                style={[
                  styles.tabIcon,
                  { tintColor: focused ? 'rgba(0,128,74,1)' : '#rgba(5,5,5,1)' }
                ]}
              />
              <Text style={[
                styles.tabText,
                { 
                  color: focused ? 'rgba(0,128,74,1)' : 'rgba(5,5,5,1)',
                }
              ]}>
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  glassShadow: {
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  tabItem: {
    marginTop: 40,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginBottom: 4,
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 14,
    lineHeight: 16, 
  }
});

export default Tabs;