import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useDB } from "../context";
import {
  FlatList,
  TouchableOpacity,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";

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
const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
  font-weight: 400;
`;
const Separator = styled.View`
  height: 10px;
`;

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Home = ({ navigation: { navigate } }) => {
  const realm = useDB();
  const [emotions, setEmotions] = useState([]);
  useEffect(() => {
    const emotions = realm.objects("Diary");
    emotions.addListener((emotions, changes) => {
      LayoutAnimation.spring();
      setEmotions(emotions.sorted("_id"));
    });
    return () => {
      emotions.removeAllListeners();
    };
  }, []);

  const onDelete = (id) => {
    realm.write(() => {
      const emotion = realm.objectForPrimaryKey("Diary", id);
      realm.delete(emotion);
    });
  };
  return (
    <SafeView>
      <View>
        <Title>My Diary</Title>
        <FlatList
          data={emotions.map((emotion) => emotion)}
          contentContainerStyle={{ paddingVertical: 10 }}
          keyExtractor={(emotion) => emotion._id + ""}
          ItemSeparatorComponent={Separator}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => onDelete(item._id)}>
              <Record>
                <Emotion>{item.emotion}</Emotion>
                <Message>{item.message}</Message>
              </Record>
            </TouchableOpacity>
          )}
        />
        <Btn onPress={() => navigate("Write")}>
          <Ionicons name="add" color="white" size={40} />
        </Btn>
      </View>
    </SafeView>
  );
};

export default Home;
