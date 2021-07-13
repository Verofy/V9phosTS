import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageSourcePropType } from 'react-native';
import {button} from '../styles/styles';

interface ButtonProps {
  onTap: Function;
  width: number;
  height: number;
  title: string,
  isNoBg?: boolean
}

const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap, width, height, title, isNoBg = false }) => {

  if (isNoBg) {
    return (
      <TouchableOpacity style={[button.btn, { width, height, backgroundColor: 'transparent' }]}
        onPress={() => onTap()}
      >
        <Text style={{ fontSize: 16, color: '#3980D9' }}>{title}</Text>
      </TouchableOpacity>
    )
  } else {

    return (
      <TouchableOpacity style={[button.btn, { width, height }]}
        onPress={() => onTap()}
      >
        <Text style={{ fontSize: 16, color: '#FFF' }}>{title}</Text>
      </TouchableOpacity>
    )


  }

}

export { ButtonWithTitle }