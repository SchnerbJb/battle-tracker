import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { Unit } from "../utils/types"
import { useState } from "react"



export default function FightScreen() {
	const Phases = ['Commandment', 'Movemment', 'Shoot', 'Fight']
	const data: Unit[] = require('../assets/data.json')
	const [currentPhase, setCurrentPhase] = useState(0)

	var currentScreen = <Text>Nothing to see here</Text>

	// TODO: Add Counter of Commandment Points

	switch (currentPhase) {
		case 0:
			currentScreen = <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Commandment Phase</Text>
			break;
		case 1:
			currentScreen = <MovementPhase army={data} />
			break;
		case 2:
			currentScreen = <ShootPhase army={data} />
			break;
		case 3:
			currentScreen = <MeleePhase army={data} />
			break;
		default:
			currentScreen = <Text>Nothing to see here</Text>
			break;
	}

	function NextPhase() {
		if (currentPhase != Phases.length - 1) {
			setCurrentPhase(currentPhase + 1)
		} else {
			setCurrentPhase(0)
		}
	}
	function PreviousPhase() {
		if (currentPhase != 0) {
			setCurrentPhase(currentPhase - 1)
		} else {
			setCurrentPhase(Phases.length - 1)
		}
	}
	function OpenBattleShock() {
	}

	return (
		<View style={styles.container}>
			<ScrollView style={styles.content}>
				{currentScreen}
			</ScrollView>
			<Pressable onPress={PreviousPhase} style={styles.previous}>
				<Text>Previous</Text>
			</Pressable>
			<Pressable onPress={OpenBattleShock} style={styles.battleshock}>
				<Text>BattleShock Test</Text>
			</Pressable>
			<Pressable onPress={NextPhase} style={styles.next}>
				<Text>Next</Text>
			</Pressable>
		</View>
	)
}

const MovementPhase = ({ army }) => {

	const movements = <View>{army.map((unit, index) => (
		<View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			<Text style={{ fontSize: 24 }}>{unit.Name}</Text>
			<Text style={{ fontSize: 24 }}>{unit.M}</Text>
		</View>
	))}</View>

	return (
		<View>
			<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Movement Phase</Text>
			<View style={styles.block}>{movements}</View>
		</View>
	)
}


const ShootPhase = ({ army }) => {

	const weapons = <View>{army.map((unit, index) => (
		<View key={index}>
			{unit.RW.map(
				(weapon, index) => (
					<View key={index}>
						<Text>{weapon.Name}</Text>
						<View style={{ flexDirection: 'row' }}>
							{
								weapon.KeyWords.length > 0 ? weapon.KeyWords.map((keyword, index) => (
									<Text key={index}>{keyword}</Text>
								))
									: <Text></Text>
							}
							<Text>{weapon.Range}</Text>
							<Text>{weapon.A}</Text>
							<Text>{weapon.BS}</Text>
							<Text>{weapon.S}</Text>
							<Text>{weapon.AP}</Text>
							<Text>{weapon.D}</Text>
						</View>
					</View>
				)
			)}
		</View>
	))}</View>
	return (
		<View>
			<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Shoot Phase :</Text>
			<Text style={styles.block}>{weapons}</Text>
		</View>
	)
}

// TODO: Maybe merge ShootPhase and MeleePhase Component Together
const MeleePhase = ({ army }) => {

	const weapons = <View>{army.map((unit, index) => (
		<View key={index}>
			{unit.MW.map(
				(weapon, index) => (
					<View key={index}>
						<Text>{weapon.Name}</Text>
						<View style={{ flexDirection: 'row' }}>
							{weapon.KeyWords.length > 0 ? weapon.KeyWords.map((keyword, index) => (
								<Text key={index}>{keyword}</Text>
							)) : <Text></Text>}
						</View>
						<Text>{weapon.A}</Text>
						<Text>{weapon.BS}</Text>
						<Text>{weapon.S}</Text>
						<Text>{weapon.AP}</Text>
						<Text>{weapon.D}</Text>
					</View>
				)
			)}
		</View>
	))}</View>
	return (
		<View>
			<Text style={{ textAlign: 'center', fontWeight: 'bold' }}>Melee Phase</Text>
			<Text style={styles.block}>{weapons}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	block: {
		textAlign: 'center',
		paddingTop: 20,
	},
	previous: {
		borderRadius: 12,
		backgroundColor: 'skyblue',
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		alignItems: 'center',
		width: 100,
		position: 'absolute',
		left: 12,
		bottom: 12
	},
	battleshock: {
		borderRadius: 12,
		backgroundColor: 'skyblue',
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		alignItems: 'center',
		width: 150,
		position: 'absolute',
		bottom: 12
	},
	next: {
		borderRadius: 12,
		backgroundColor: 'skyblue',
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 4,
		alignItems: 'center',
		width: 100,
		position: 'absolute',
		right: 12,
		bottom: 12
	},
	content: {
		width: '75%',
	},
})
