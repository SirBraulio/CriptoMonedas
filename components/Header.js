import React from 'react';
import {StyleSheet,Text,Platform} from 'react-native';

const Header = () => (
    <Text style={styles.encabezado}> CriptoSEARCH</Text>
)

const styles = StyleSheet.create({
    encabezado:{
        paddingTop: 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        paddingBottom: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize:20,
        color:'#FFF',
        marginBottom:30
    }

})
export default Header