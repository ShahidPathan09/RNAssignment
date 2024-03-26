
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard, Registration } from '../Components/index'

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarActiveTintColor: 'blue',
                tabBarLabelStyle: {
                    fontSize: 16,
                    alignSelf: 'center', flex: 1, top: -10
                },
                headerShown: false,
                tabBarIcon: () => null,
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
            />
            <Tab.Screen
                name="Create User"
                component={Registration}
            />
        </Tab.Navigator>
    );
}

export default BottomTabs