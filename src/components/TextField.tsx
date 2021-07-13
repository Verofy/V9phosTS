import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { textField } from '../styles/styles';

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  onTextChange,
}) => {
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsPassword(isSecure);
  }, []);

  return (
    <View style={textField.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='grey'
        //keyboardType='phone-pad'
        //placeholder="phone number"
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={isPassword}
        onChangeText={(text) => onTextChange(text)}
        style={textField.textField}
      />
    </View>
  );
};
