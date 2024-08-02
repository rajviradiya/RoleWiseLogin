import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
export default function Details() {
    const route = useRoute();
    const { role } = route.params;
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>{role === "client" ? `Client Login` : role === "employee" ? `Employee Login` : `Admin Login`}</Text>

        </View>
    )
}
