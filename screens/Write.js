import React, { useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0px 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 15px;
  padding: 10px 20px;
  font-size: 18px;
  elevation: 10;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.btnColor};
  margin-top: 30px;
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;
const Emotions = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
  justify-content: space-between;
`;
const Emotion = styled.TouchableOpacity`
  background-color: white;
  elevation: 10;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  border-width: ${(props) => (props.selected ? "2px" : "0px")};
  border-color: rgba(0, 0, 0, 0.5);
`;
const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ["🤯", "🥲", "🤬", "🥰", "😊", "🤩"];

const Write = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [input, setInput] = useState("");
  const onSubmit = () => {
    if (input === "" || selectedEmotion === null) {
      return Alert.alert("Please complete the form");
    }
  };
  return (
    <View>
      <Title>How do you feel today</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            selected={emotion === selectedEmotion}
            onPress={() => setSelectedEmotion(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        value={input}
        onChangeText={(text) => setInput(text)}
        placeholder="Write your feelings..."
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
