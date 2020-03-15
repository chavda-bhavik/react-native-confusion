import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Card } from 'react-native-elements';

import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from './LoadingComponent';
const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        leaders: state.leaders,
        promotions: state.promotions
    }
}

function RenderItem(props) {
    const item = props.item;
    if(props.isLoading)
        return <Loading/>
    else if(props.errMess) 
        <View>
            <Text>{props.errMess}</Text>
        </View>
    else {
        if(item!=null) {
            return <Card
                featuredTitle={item.name}
                featuredSubtitle={item.designation}
                image={{ uri: baseUrl+item.image }}
            >
                <Text style={{margin:10}}>
                    {item.description}
                </Text>
            </Card>
        } else {
            return <View></View>
        }
    }
}

class Home extends Component {
    static navigationOptions = {
        title: 'Home'
    }
    render() {
        console.log()
        return (
            <ScrollView>
                <RenderItem 
                    item={this.props.dishes.dishes[0]} 
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                />
                <RenderItem 
                    item={this.props.promotions.promotions.filter( promotion => promotion.featured )[0]} 
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}
                />
                <RenderItem 
                    item={this.props.leaders.leaders.filter( leader => leader.featured )[0]} 
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps,null)(Home)