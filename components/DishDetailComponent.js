import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

const RenderDish = (props) => {
    const dish = props.dish;
    if(dish)
        return <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl+dish.image }}
                >
                <Text style={{ margin:10 }} >{dish.description}</Text>
                <Icon 
                    raised 
                    reverse 
                    name={ props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome' 
                    color='#f50' 
                    onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress() } 
                />
            </Card>
    else 
        return <View />
}
const RenderComments = (props) => {
    const comments = props.comments;
    const renderCommentItem = ({item,index}) => {
        return (
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Text style={{fontSize:12}}>{item.rating} Stars</Text>
                <Text style={{fontSize:12}}>{'-- '+item.author+', '+new Intl.DateTimeFormat('en-US',{ year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(item.date))) }</Text>
            </View>
        )
    }
    return (
        <Card title="Comments">
            <FlatList data={comments} renderItem={renderCommentItem} keyExtractor={item => item.id.toString()} />
        </Card>
    )
}

class DishDetail extends Component {
    state = {
        favorites: []
    }
    markFavorite(dishId) {
        this.setState( prevState => ({ favorites: prevState.favorites.concat(dishId) }) )
    }
    static navigationOptions = {
        title: 'DishDetails'
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','')
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={ this.state.favorites.some(el => el === dishId) }
                    onPress={ () => this.markFavorite(dishId) }
                />
                <RenderComments comments={this.props.comments.comments.filter( comment => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps,null)(DishDetail)