import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";

const SafeView = styled.SafeAreaView`
  flex: 1;
  background-color: red;
`;
const View = styled.View`
  flex: 1;
  padding: 0px 50px;
  padding-top: 100px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  font-size: 38px;
  margin-bottom: 100px;
  color: ${colors.textColor};
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 10;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const Home = ({ navigation: { navigate } }) => (
  <SafeView>
    <View>
      <Title>My Diary</Title>
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="add" color="white" size={40} />
      </Btn>
    </View>
  </SafeView>
);

export default Home;
