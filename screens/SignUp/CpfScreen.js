import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import {
  Container,
  Item,
  Label,
  Input,
  Content,
  Header,
  Title,
  Body,
  Toast,
} from 'native-base';
import ContinueButton from '../../components/SignUp/ContinueButton';
import Instructions from '../../components/SignUp/Instructions';
import Colors from '../../constants/Colors';
import MyHeader from '../../components/MyHeader'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props){
    super(props);

    this.state = {
      cpf: '',
    }

    this.handleNext = this.handleNext.bind(this)
  }

  handleNext(){
    console.log(cpf)
    let { cpf } = this.state;
    if(cpf.length != 11){
      Toast.show({
        text: 'O CPF digitado não é válido',
        buttonText: 'OK',
        type: 'warning',
        style: {
          marginBottom: 100,
        },
        duration: 10000,
      })
      return;
    }
    fetch(`http://ec2-52-23-254-48.compute-1.amazonaws.com/api/v1/usuario/verificadocumento/${cpf}`, 
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then((data) => {
      console.log('passei por aqui')
      console.log(data.situacao)
      if(data.situacao === 'inexistente') {
        Toast.show({
          text: 'Cadastro autorizado...',
          buttonText: 'OK',
          type: 'success',
          style: {
            marginBottom: 100,
          },
          duration: 3000,
        })
        this.props.navigation.navigate('SignUpPersonal')
      }
      console.log('passei por aqui')
    })
    .catch((err) => alert(err))
  }

  render() {
    return (
      <Container>
        <MyHeader 
          buttonColor={Colors.weirdGreen}
          goBack={() => this.props.navigation.goBack()}
          cancel={() => this.props.navigation.navigate('Login')}
          headerAndroid={Colors.dark}
          statusBarAndroid={Colors.lighterDark}/>
        <Content>
          <View style={styles.inputsContainer}>
            <View style={{height: 10}} />
            <Instructions
              title="Informe seu"
              subtitle="CPF"
              colors={{ title: Colors.dark, subtitle: Colors.weirdGreen }} />
            <Item floatingLabel >
              <Label>CPF</Label>
              <Input 
              value={this.state.cpf}
              onChangeText={(cpf) => this.setState({ cpf })}/>
            </Item>
          </View>
        </Content>
        <ContinueButton
          handler={this.handleNext}
          colors={{ button: Colors.lemonGreen, container: Colors.dark }} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  inputsContainer: {
    flex: 1,
    width: '89%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  }
});

