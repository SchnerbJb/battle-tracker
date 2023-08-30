import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Pressable, ScrollView, Text, View } from 'react-native';
import { Unit } from '../utils/types';



export default function ArmyScreen() {
	const data: Unit[] = require('../assets/data.json')

	const blocks = data.map((unit, index) => <UnitBlock key={index} {...unit} />)
	return (

		<ScrollView style={styles.container}>
			{blocks}
			<StatusBar style="auto" />
		</ScrollView>
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
			<Text style={styles.textStatblock}>
				M : {stat.M}
				T : {stat.T}
				SV : {stat.SV}
				W : {stat.W}
				LD : {stat.LD}
				OC : {stat.OC}
			</Text>
			{
				invulnerableSave.length > 0 ?
					<View style={styles.dropdown}>
						<Text style={styles.dropdownText}>Invulnerable Save <Text style={{ borderRadius: 4, backgroundColor: 'white', color: 'black' }}> {invulnerableSave} </Text></Text>
					</View>
					: <></>}
			<Pressable onPress={toggleRanged} style={styles.dropdown}>
				<Text style={styles.dropdownText}>Ranged Weapon <FontAwesomeIcon icon={faAngleDown} color='white' /></Text>
			</Pressable>
			<View style={showRanged ? styles.weaponView : styles.hiddenView}><WeaponStatBlock stat={ranged} /></View>

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
				<View style={styles.cell}>
					<Text>
						Name
					</Text>
				</View>
				<View style={styles.cell}>
					<Text>
						Keywords
					</Text>
				</View>
				<View style={styles.cell}>
					<Text>
						A
					</Text>
				</View>
				<View style={styles.cell}>
					<Text>
						BS
					</Text>
				</View>
				<View style={styles.cell}>
					<Text>
						<Text>S</Text>
					</Text>
				</View>
				<View style={styles.cell}>
					<Text>
						AP
					</Text>
				</View>
				<View style={styles.cell}>
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
	const coreAbilities = stat.Core.length > 0 ? <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>Core : {stat.Core.map((ability, index) => (
		<Text key={index}>
			<Text style={{ textAlign: 'center' }}>{ability}</Text>
		</Text>
	))}
	</Text> : <Text></Text>

	const factionAbilities = stat.FactionAbilities.map((ability, index) => (
		<View key={index}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{ability}</Text>
		</View>
	))

	const datasheetAbilities = stat.DatasheetAbilities.map((ability, index) => (
		<View key={index}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>{ability.Name}</Text>
			<Text style={{ textAlign: 'center' }}>{ability.Description}</Text>
		</View>
	))

	return (
		<View>
			{coreAbilities}
			{factionAbilities}
			{datasheetAbilities}
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
		flex: 1,
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
		fontSize: 16,
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
	hiddenView: {
		display: 'none',
	},
	weaponView: {
	},
	icon: {
	},
	rowHeader: {
	},
	table: {
	},
	row: {
	},
	cell: {
	}

});
