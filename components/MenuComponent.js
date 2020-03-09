import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { ListItem, Card } from "react-native-elements";
import { DISHES } from "../shared/dishes";

class Menu extends Component {
    state = {
        dishes: DISHES
    }
    static navigationOptions = {
        title: 'Menu'
    }
    render() {
        const renderMenuItem = ({item,index}) => {
            return (
                <ListItem
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true}
                    onPress={() => navigate('Dishdetail', { dishId: item.id })}
                    leftAvatar={{ source: require('./images/uthappizza.png') }}
                />
            )
        }
        const { navigate } = this.props.navigation
        return (
            <Card>
                <FlatList 
                    data={this.state.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        )
    }
}

export default Menu