import React, { Component } from "react";
import { View, Text, ScrollView, FlatList, StyleSheet } from "react-native";
import { Card, Icon, Rating, Input, Button } from "react-native-elements";

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postComment, postFavorites } from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorites(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
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
                            onPress={() => props.toggleCommentDialog() } 
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
    state = {
        addComment: false,
        rating:3,
        author:'',
        comment: ''
    }
    addComment=()=>{
        let dishId = this.props.navigation.getParam('dishId','')
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment)
        this.toggleCommentDialog();
    }
    cancelComment=()=>{
        this.props.navigation.navigate('Dishdetail', { dishId: dishId })
    }

    toggleCommentDialog=() => {
        this.setState(prevState => ({ addComment: !prevState.addComment}))
    }
    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }
    static navigationOptions = {
        title: 'DishDetails'
    }
    render() {
        const dishId = this.props.navigation.getParam('dishId','')
        var body = (
            <ScrollView>
                <RenderDish 
                    dish={this.props.dishes.dishes[+dishId]} 
                    favorite={ this.props.favorites.some(el => el === dishId) }
                    onPress={ () => this.markFavorite(dishId) }
                    toggleCommentDialog={ () => this.toggleCommentDialog() }
                />
                <RenderComments comments={this.props.comments.comments.filter( comment => comment.dishId === dishId)} />
            </ScrollView>
        )
        if(this.state.addComment) {
            body = <View>
                    <Rating 
                        showRating 
                        fractions={1} 
                        startingValue="{3}"
                        onFinishRating={(val) => this.setState({ rating: val})} 
                    />
                    <Input
                        onChangeText={(val) => this.setState({ author: val })}
                        value={this.state.author}
                        placeholder='Author'
                        leftIcon={
                            <Icon
                                type='font-awesome' 
                                name='user-o'
                                size={20}
                                color='black'
                            />
                        }
                    />
                    <Input
                        onChangeText={(val) => this.setState({ comment: val })}
                        value={this.state.comment}
                        placeholder='Comment'
                        leftIcon={
                            <Icon
                                type='font-awesome' 
                                name='comment-o'
                                size={20}
                                color='black'
                            />
                        }
                    />
                    <Button 
                        onPress={() => this.addComment()}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: '#4630eb',
                            color: 'white',
                            margin: '3px'
                        }}
                        title="Add Comment"
                    />
                    <Button 
                        onPress={() => this.cancelComment()}
                        buttonStyle={{
                            width: '100%',
                            backgroundColor: 'grey',
                            color: 'white',
                            margin: '3px'
                        }}
                        title="Cancle"
                    />
                </View>
        }
        return body
    }
}
const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 1,
        margin: 20
    },
    addCommentBtn: {
        alignItems: 'center',
        backgroundColor: '#4630eb',
        color: 'white'
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(DishDetail)