import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  h1: {
    fontSize: 50,
    paddingTop: 100,
    fontWeight: 'bold'
  },
  input: {
    padding: 10
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  boldText: {
    fontWeight: 'bold'
  },
  debugButton: {
    flex: 1,
    width: 250,
    padding: 20
  }
});

export const containers = StyleSheet.create({});

export const textField = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 15
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: '#000'
  }
});

export const debug = StyleSheet.create({
  inputSection: {
    flex: 1,
    alignItems: 'center'
  },
  input: {
    borderWidth: 1,
    width: 250,
    color: 'black'
  }
});

export const button = StyleSheet.create({
  btn: {
    flex: 1,
    display: 'flex',
    maxHeight: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20
  }
});

export const navigationStyles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
});
