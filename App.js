
import React, {useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import axios from 'axios';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

const App = () => {

  const [ moneda, guardarMoneda ] = useState(''); 
  const [ criptomoneda, guardarCriptomoneda ] = useState('');
  const [ consultarAPI, guardarConsultarAPI ] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando ] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    guardarMoneda('');
    guardarCriptomoneda('');
    guardarConsultarAPI(false);
    guardarResultado({});
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() =>{
    const cotizarCriptomoneda = async ()=> {
      if(consultarAPI){
        // consultar api para obtener la cotizacion
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(url);
        
        guardarCargando(true);
        //Ocultar el spinner y mostrar resultado
        setTimeout(()=>{
          guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda])
          guardarConsultarAPI(false);
          guardarCargando(false);
        },3000)

      }
    }
    cotizarCriptomoneda();
  },[consultarAPI])

  //mostrando el spinner
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2"/> :  <Cotizacion resultado={resultado}/>

  return (
    <>
    <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
       <Header/>

       <Image 
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
       />
       <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            criptomoneda={criptomoneda}
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda}
            guardarConsultarAPI={guardarConsultarAPI}
          /> 
       </View>
       <View style={styles.coti}> 
          {componente}
       </View>
    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen:{
    width:'100%',
    height: 150,
    alignItems: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  },
  coti: {
    marginTop: 40
  },
});

export default App;
