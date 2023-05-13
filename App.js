import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import store from "./Store";
import StackNavigator from "./StackNavigator";

export default function App() {
  //const store = createStore(store);
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
