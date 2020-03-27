import React, { Component } from 'react';
import { View, Platform, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import{ Icon } from 'react-native-elements'
import * as Animatable from 'react-native-animatable'

import Menu from './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactUsComponent';
import Dishdetail from './DishDetailComponent';
import AddComment from './AddCommentComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoritesComponent';
import Login from './LoginComponent';

import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from "../redux/ActionCreators";
import { connect } from 'react-redux';

const HomeNavigator = createStackNavigator({
  Home: { screen: Home }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24} color='#4630EB' 
                  onPress={() => navigation.toggleDrawer()}
                />
  })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff",
      headerLeft: <Icon name="menu" size={24} color='#4630EB' 
                    onPress={() => navigation.toggleDrawer()}
                  />
    })
});

const ReservationNavigator = createStackNavigator({
  Reservation: { screen: Reservation }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24} color='#4630EB' 
                  onPress={() => navigation.toggleDrawer()}
                />
  })
});

const FavoritesNavigator = createStackNavigator({
  Favorites: { screen: Favorites }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24} color='#4630EB' 
                  onPress={() => navigation.toggleDrawer()}
                />
  })
});

const LoginNavigator = createStackNavigator({
    Login: Login
  }, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }} 
      onPress={ () => navigation.toggleDrawer() } />    
  })
});

const AboutNavigator = createStackNavigator({
  About: { screen: About }
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
        backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
        color: "#fff"            
    },
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24} color='#4630EB' 
                  onPress={() => navigation.toggleDrawer()}
                />    
  })
});

const MenuNavigator = createStackNavigator({
  Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
          headerLeft: <Icon 
                    name="menu" 
                    size={24} 
                    color='#4630EB' 
                    onPress={() => navigation.toggleDrawer()}
                  />
        })
      },
  Dishdetail: { screen: Dishdetail },
  AddComment: { screen: AddComment }
},{
  initialRouteName: 'Menu',
  navigationOptions: {
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
          color: "#fff"
      }
  }
});

const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView 
      style={styles.container}
      forceInset={{ top:'always', horizontal: 'never' }}
    >
      <View style={styles.drawerHeader}>
        <View style={{ flex:1 }}>
          <Image source={require('./images/logo.png')} style={styles.drawerImage} />
        </View>
        <View style={{flex:2}}>
          <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
)
const MainNavigator = createAppContainer(createDrawerNavigator({
  Login: 
  { 
    screen: LoginNavigator,
    navigationOptions: {
      title: 'Login',
      drawerLabel: 'Login',
      drawerIcon: ({ tintColor }) => (
        <Icon name='sign-in' type='font-awesome' size={24} color={tintColor} />
      )
    }
  },
  Home: 
    { screen: HomeNavigator,
      navigationOptions: {
        title: 'Home',
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon name='home' type='font-awesome' size={24} color={tintColor} />
        )
      }
    },
  About: 
  { screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us',
      drawerIcon: ({ tintColor }) => (
        <Icon name='info-circle' type='font-awesome' size={24} color={tintColor} />
      )      
    }, 
  },
  Menu: 
    { screen: MenuNavigator,
      navigationOptions: {
        title: 'Menu',
        drawerLabel: 'Menu',
        drawerIcon: ({ tintColor }) => (
          <Icon name='list' type='font-awesome' size={24} color={tintColor} />
        )
      },
    },
  Contact: 
    { screen: ContactNavigator,
      navigationOptions: {
        title: 'Contact Us',
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
          <Icon name='address-card' type='font-awesome' size={22} color={tintColor} />
        )
      }, 
    },
  Reservation: 
    { screen: ReservationNavigator,
      navigationOptions: {
        title: 'Reserve Table',
        drawerLabel: 'Reserve Table',
        drawerIcon: ({ tintColor }) => (
          <Icon name='cutlery' type='font-awesome' size={24} color={tintColor} />
        )
      }, 
    },
  Favorites: { 
    screen: FavoritesNavigator,
    navigationOptions: {
      title: 'My Favorites',
      drawerLabel: 'My Favorites',
      drawerIcon: ({ tintColor }) => (
        <Icon 
          name='heart' 
          type='font-awesome' 
          size={24} 
          color={tintColor} 
        />
      )
    }, 
  }      
}, {
  initialRouteName: 'Home',
  drawerBackgroundColor: '#D1C4E9',
  contentComponent: CustomDrawerContentComponent
}));

class Main extends Component {
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchLeaders();
    this.props.fetchPromos();
  }
  render() {
    return (
      <View style={{flex:1, paddingTop: 10 }}>
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  fetchPromos: () => dispatch(fetchPromos())
})

export default connect(null, mapDispatchToProps)(Main);