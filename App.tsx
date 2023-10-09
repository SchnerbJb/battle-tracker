import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ArmyScreen from './components/Army';
import FightScreen from './components/Fight';
import StratagemsScreen from './components/Stratagems';
import { useState } from 'react';

export default function App() {

	const Tab = createBottomTabNavigator();
	const [data, setData] = useState([])

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName: string;

						if (route.name === 'Army') {
							iconName = focused
								? 'people'
								: 'people-outline'
						} else if (route.name === 'Fight') {
							iconName = focused
								? 'flame'
								: 'flame-outline'
						} else if (route.name === 'Stratagems') {
							iconName = focused
								? 'map'
								: 'map-outline'
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					}
				})}>
				<Tab.Screen name="Army"
					children={() => <ArmyScreen data={data} callback={setData} />}
				/>
				<Tab.Screen name="Fight"
					children={() => <FightScreen data={data} callback={setData} />}
				/>
				<Tab.Screen name="Stratagems"
					children={() => <StratagemsScreen />}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}


