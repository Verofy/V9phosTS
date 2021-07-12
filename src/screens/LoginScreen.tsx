import React, { useState } from 'react';
import { Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native';
import { verofyCheck } from '../helpers/verofyHelpers';
import { styles, debug } from '../styles/styles';

export interface Props {

}

interface State {
  login: string;
  pass: string;
}

export default class LoginScreen extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      login: '',
      pass: '',
    };
  }
  public handleLogin(event: any): void {
    console.info(event);
    this.setState({ login: event });
    console.info(this.state.login)
  }

  handleSubmit = () => {
    console.log(this.state.login)
    verofyCheck(this.state.login)
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView>
          <View style={styles.container}>
            <Text style={styles.h1}>V9-phos</Text>
          </View>
          <View style={debug.inputSection}>
            <TextInput
              value={this.state.login}
              style={debug.input}
              placeholderTextColor='grey'
              maxLength={30}
              keyboardType='phone-pad'
              placeholder="phone number"
              autoCorrect={false}
              autoCapitalize='none'
              onChangeText={event => this.setState({ login: event })}
            />
            <TextInput
              style={debug.input}
              placeholderTextColor='grey'
              maxLength={30}
              keyboardType='default'
              placeholder="password"
              autoCorrect={false}
              autoCapitalize='none'
            //onChangeText={this.handlePassword}
            />
            <View style={styles.debugButton}>
              <Button
                color="black"
                onPress={() => this.handleSubmit}
                title="LOGIN"
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
