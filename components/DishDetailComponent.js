import React, { Component } from "react";
import { View, Text, ScrollView, FlatList } from "react-native";
import { Card, Icon, Rating } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorites } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorites(dishId))
})

const RenderDish = (props) => {
    const dish = props.dish;
    if(dish)
        return <Card
                featuredTitle={dish.name}
                image={{ uri: baseUrl+dish.image }}
                >
                <Text style={{ margin:10 }} >{dish.description}</Text>
                <View style={{ height:100, alignContent:'center', justifyContent:'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon 
                            raised 
                            reverse 
                            name={ props.favorite ? 'heart' : 'heart-o' }
                            type='font-awesome' 
                            color='#f50' 
                            onPress={() => props.favorite ? console.log('Already Favorite') : props.onPress() } 
                        />
                        <Icon 
                            raised 
                            reverse 
                            name='pencil'
                            type='font-awesome' 
                            color='purple' 
                            onPress={() => props.navigate('AddComment', { dishId: dish.id } ) } 
                        />
                    </View>
                </View>            
            </Card>
    else 
        return <View />
}
const RenderComments = (props) => {
    const comments = props.comments;
    const renderCommentItem = ({item,index}) => {
        return (
            <View key={index} style={{margin:10, alignItems:'flex-start', }}>
                <Text style={{fontSize:14}}>{item.comment}</Text>
                <Rating imageSize={10} readonly startingValue={item.rating} />
                {/* <Text style={{fontSize:12}}>{item.rating} Stars</Text> */}
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
    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }
    static navigationOptions = {
        title: 'DishDetails'
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','')
        const { navigate } = this.props.navigation
        return (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={ this.props.favorites.some(el => el === dishId) }
                    onPress={ () => this.markFavorite(dishId) }
                    navigate={ navigate }
                />
                <RenderComments comments={this.props.comments.comments.filter( comment => comment.dishId === dishId)} />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail)