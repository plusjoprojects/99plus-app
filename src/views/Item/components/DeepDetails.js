import React from "react";

// Views
import { View } from "react-native";
import {Text, useTheme } from "@ui-kitten/components";
import { MaterialCommunityIcons} from "@expo/vector-icons";

// Services
import {translate} from '../../../translations'


// ------ Item Details ----- //
export default (props) => {
  let theme = useTheme()
  let { item } = props;

  let DetailsList = ({ title, icon, color = "black", value }) => (
    <View style={{ width: '50%', justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <MaterialCommunityIcons
          name={icon}
          style={{ fontSize: 22, color: theme['text-hint-color'] }}
        />
        <View style={{ width: 1 }}></View>
        {color == "black" &&
        <Text style={{ fontSize: 16 }}>{value}</Text>
        }
        {color !== "black" &&
        <View style={{ height: 10, width: 30, backgroundColor: color, borderRadius: 3 }}></View>
        }
      </View>
        <Text style={{ color:theme['text-hint-color'], textAlign: 'center' }}>{title}</Text>
    </View>
  );

  return (
    <View style={{ padding: 15 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <DetailsList icon={"invert-colors"} color={item.color} value={"أحمر"} title={translate("item.color")}/>
        <DetailsList icon={"move-resize"} value={item.size} title={translate("item.size")} />
        <DetailsList icon={"format-line-weight"} value={item.weight} title={translate("item.weight")} />
        <DetailsList icon={"package-variant"} value={item.packing} title={translate("item.package")} />
      </View>
    </View>
  );
};
