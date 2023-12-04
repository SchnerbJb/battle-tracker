import { faAngleDown, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Pressable, ScrollView, Text, View, Dimensions } from 'react-native';
import { Unit } from '../utils/types';
import Modal from 'react-native-modal';

function loadArmy() {
	const data = require('../Necrons.json')
	let units = []
	data.catalogue.sharedSelectionEntries.selectionEntry.filter(
		function(data: any) { return data["-type"] == "model"})
		.map((unit: any, _: any) => {
			let Name: string = unit["-name"]
			let models = unit.profiles.profile.filter(
				function(data) { return data["-typeName"] == "Unit" })
			let M: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "M" })[0]["#text"]
			let T: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "T" })[0]["#text"]
			let SV: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "SV" })[0]["#text"]
			let W: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "W" })[0]["#text"]
			let LD: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "LD" })[0]["#text"]
			let OC: string = models[0].characteristics.characteristic.filter(
				function(data) { return data["-name"] == "OC" })[0]["#text"]
			let Abilities = unit.profiles.profile.filter(
				function(data) { return data["-typeName"] == "Abilities" })
				.map(ability => ({ Name: ability["-name"], Description: ability.characteristics.characteristic["#text"] }))
			let Wargear = []
			let KeyWords = []
			let RW = []
			let MW = []
			let InvulnerableSave = Abilities.filter(
				function(data) { return data["-name"] == "Invulnerable Save" })
			if (Name.includes("[Legend]"))
			units.push({
				Name: Name,
				M: M,
				T: T,
				SV: SV,
				W: W,
				LD: LD,
				OC: OC,
				Abilities: Abilities,
				WargearAbilities: Wargear,
				KeyWords: KeyWords,
				RW: RW,
				MW: MW,
				InvulnerableSave: InvulnerableSave
			})
		})
	return units
}


export default function ArmyScreen(props: any) {
	const army = loadArmy()

	const [index, SetOpenIndex] = useState(false)

	function openIndex() {
		SetOpenIndex(!index)
	}

	// Redo the placement of the button
	return (
		<View>
			{props.data.length > 0 ?
				<ScrollView style={styles.container}>
					{props.data.map((unit, index) => <UnitBlock key={index} {...unit} />)}
				</ScrollView> : <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}></View>}
			<Modal
				style={{
					marginVertical: 30,
					borderRadius: 15,
					backgroundColor: 'white'
				}}
				isVisible={index}>
				<ScrollView>
					{
						army.length > 0 ?
							army.map((unit, index) => <IndexBlock key={index} unit={unit} callback={props.callback} data={props.data} army={army} />)
							: <></>
					}
				</ScrollView>
				<Pressable onPress={openIndex}>
					<Text style={styles.indexModal}>Close</Text>
				</Pressable>
			</Modal>
			<Pressable onPress={openIndex} style={{ alignItems: 'center', position: 'absolute', top: Dimensions.get("window").height - 200, left: Dimensions.get("window").width - 80 }}>
				<Text style={{ backgroundColor: 'skyblue', padding: 12, borderRadius: 12 }}><FontAwesomeIcon icon={faPlus} size={24} color='white' /></Text>
			</Pressable>
			<StatusBar style="auto" />
		</View>
	)
}

const IndexBlock = (props) => {
	const [alreadyIn, setAlreadyIn] = useState(false)
	function add() {
		console.log(props.unit.Name)
		setAlreadyIn(true)
		props.callback([...props.data, props.unit])
	}
	return (
		<View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', margin: 18 }}>
			<Text style={{ fontWeight: 'bold', fontSize: 24, width: '75%', padding: 8 }}>{props.unit.Name}</Text>
			<View style={{}}>
				{
					!alreadyIn ?
						<Pressable style={{ backgroundColor: 'skyblue', borderRadius: 4, padding: 8 }} onPress={add}>
							<Text style={{ textAlign: 'center' }}>
								<FontAwesomeIcon icon={faPlus} size={24} color='white' />
							</Text>
						</Pressable>
						: <View style={{ padding: 8 }}></View>
				}
			</View>
		</View>
	)
}

const UnitBlock = (stat: Unit) => {
	const [showRanged, setShowRanged] = useState(false)

	function toggleRanged() {
		setShowRanged(!showRanged)
	}

	const [showMelee, setShowMelee] = useState(false)
	function toggleMelee() {
		setShowMelee(!showMelee)
	}

	const [showAbilities, setShowAbilities] = useState(false)
	function toggleAbilities() {
		setShowAbilities(!showAbilities)
	}

	const [showWargear, setShowWargear] = useState(false)
	function toggleWargear() {
		setShowWargear(!showWargear)
	}

	const invulnerableSave = stat.hasOwnProperty("InvulnerableSave") ? stat.InvulnerableSave : ''
	const ranged = stat.RW
	const melee = stat.MW
	const abilities = stat.Abilities
	const wargear = stat.WargearAbilities

	return (
		<View style={styles.block}>
			<Text style={styles.titleStatblock}>{stat.Name}</Text>
			<View style={{ backgroundColor: 'lightgray', width: '90%', height: 1, marginVertical: 8, borderRadius: 4 }}></View>
			<Text style={styles.textStatblock}>
				<Text>  |  </Text>
				<Text style={styles.cell}>M  </Text>
				<Text style={styles.cellAbility}>{stat.M}</Text>
				<Text> |  </Text>
				<Text style={styles.cell}>T  </Text>
				<Text style={styles.cellAbility}>{stat.T}</Text>
				<Text>  |  </Text>
				<Text style={styles.cell}>SV  </Text>
				<Text style={styles.cellAbility}>{stat.SV}</Text>
				<Text>  |  </Text>
				<Text style={styles.cell}>W  </Text>
				<Text style={styles.cellAbility}>{stat.W}</Text>
				<Text>  |  </Text>
				<Text style={styles.cell}>LD  </Text>
				<Text style={styles.cellAbility}>{stat.LD}</Text>
				<Text>  |  </Text>
				<Text style={styles.cell}>OC  </Text>
				<Text style={styles.cellAbility}>{stat.OC}</Text>
				<Text>  |  </Text>
			</Text>
			{
				invulnerableSave != "" ?
					<View style={styles.dropdown}>
						<Text style={styles.dropdownText}>Invulnerable Save <Text style={{ borderRadius: 4, backgroundColor: 'white', color: 'black' }}> {invulnerableSave} </Text></Text>
					</View>
					: <></>}
			{ranged.length > 0 ?
				<>

					<Pressable onPress={toggleRanged} style={styles.dropdown}>
						<Text style={styles.dropdownText}>Ranged Weapon <FontAwesomeIcon icon={faAngleDown} color='white' /></Text>
					</Pressable>
					<View style={showRanged ? styles.weaponView : styles.hiddenView}><WeaponStatBlock stat={ranged} /></View>

				</>
				: <Text></Text>
			}
			<Pressable onPress={toggleMelee} style={styles.dropdown}>
				<Text style={styles.dropdownText}>Melee Weapon <FontAwesomeIcon icon={faAngleDown} color='white' /></Text>
			</Pressable>
			<View style={showMelee ? styles.weaponView : styles.hiddenView}><WeaponStatBlock stat={melee} /></View>

			<Pressable onPress={toggleAbilities} style={styles.dropdown}>
				<Text style={styles.dropdownText}>Abilities <FontAwesomeIcon icon={faAngleDown} color='white' /></Text>
			</Pressable>
			<View style={showAbilities ? styles.weaponView : styles.hiddenView}><AbilityStatBlock stat={abilities} /></View>

			{wargear.length > 0 ?
				<>
					<Pressable onPress={toggleWargear} style={styles.dropdown}>
						<Text style={styles.dropdownText}>Wargear Abilities <FontAwesomeIcon icon={faAngleDown} color='white' /></Text>
					</Pressable>
					<View style={showWargear ? styles.weaponView : styles.hiddenView}>
						<WargearStatBlock stat={wargear} />
					</View>
				</>
				: <Text></Text>}
		</View >
	)
}


const WeaponStatBlock = ({ stat }) => {

	const rows = stat.map((weapon, index) => (
		<View style={styles.row} key={index}>
			<Text style={styles.cell}>
				{weapon.Name}
			</Text>
			<Text style={styles.cell}>
				{weapon.KeyWords}
			</Text>
			<Text style={styles.cell}>
				{weapon.A}
			</Text>
			<Text style={styles.cell}>
				{weapon.BS}
			</Text>
			<Text style={styles.cell}>
				{weapon.S}
			</Text>
			<Text style={styles.cell}>
				{weapon.AP}
			</Text>
			<Text style={styles.cell}>
				{weapon.D}
			</Text>
		</View>
	))

	return (
		<View style={styles.table}>
			<View style={styles.rowHeader}>
				<View style={styles.rowCell}>
					<Text>
						Name
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						Keywords
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						A
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						BS
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						S
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						AP
					</Text>
				</View>
				<View style={styles.rowCell}>
					<Text>
						D
					</Text>
				</View>
			</View>

			{rows}
		</View>
	)
}

const AbilityStatBlock = ({ stat }) => {
	const Abilities = stat.map((ability, index) => (
		<View key={index}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{ability.Name}</Text>
			<Text style={{ textAlign: 'center' }}>{ability.Description}</Text>
		</View>
	))


	return (
		<View>
			{Abilities}
		</View>
	)
}

const WargearStatBlock = ({ stat }) => {

	const datasheetAbilities = stat.map((ability, index) => (
		<View key={index}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{ability.Name}</Text>
			<Text style={{ textAlign: 'center' }}>{ability.Description}</Text>
		</View>
	))

	return (
		<View>
			{datasheetAbilities}
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
	},
	block: {
		marginTop: 8,
		marginBottom: 8,
		alignItems: 'center',
		width: '100%',
	},
	titleStatblock: {
		fontSize: 32,
		fontWeight: 'bold',
	},
	textStatblock: {
		marginVertical: 8,
		flexDirection: 'row',
		fontSize: 16,
		paddingHorizontal: 15,

	},
	dropdown: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 16,
		paddingHorizontal: 32,
		marginVertical: 8,
		borderRadius: 8,
		backgroundColor: 'black',
		width: '80%'
	},
	dropdownText: {
		fontSize: 16,
		fontWeight: 'bold',
		color: 'white',
	},
	indexModal: {
		borderRadius: 12,
		textAlign: 'center',
		backgroundColor: 'skyblue',
		paddingHorizontal: 12,
		paddingVertical: 8,
		margin: 16,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		width: 150,
		shadowColor: '#000',
	},
	hiddenView: {
		display: 'none',
	},
	weaponView: {
		width: '70%'
	},
	icon: {
	},
	rowHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	rowCell: {
	},
	table: {
	},
	row: {
	},
	cell: {
		color: 'grey'
	},
	cellAbility: {
		fontWeight: 'bold',
	}

});
