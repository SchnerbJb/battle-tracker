import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Stratagems } from '../utils/types';


export default function StratagemsScreen(props) {

	const data: Stratagems[] = require('../assets/stratagems.json')

	const blocks = data.map((stratagem, index) => <StratagemBlock key={index} {...stratagem} />)
	return (
		<ScrollView style={styles.container}>
			{blocks}
		</ScrollView>
	)
}

const StratagemBlock = (strat: Stratagems) => {

	let color = 'white';
	if (strat.Turn == "Either") color = 'lightgreen';
	else if (strat.Turn == "Yours") color = 'lightblue';
	else if (strat.Turn == "Opponent's") color = 'red';


	return (
		<View style={{ marginHorizontal: 12, marginVertical: 16 }}>
			<Text style={{ textAlign: 'center', paddingVertical: 14, marginVertical: 0, fontWeight: 'bold', width: '100%', backgroundColor: color }}>{strat.Name}</Text>
			<View style={{ marginHorizontal: 32, marginVertical: 16 }}>
				<Text style={{ textAlign: 'center', marginVertical: 4 }}>Turn : {strat.Turn}</Text>
				<Text style={{ textAlign: 'center', marginVertical: 4 }}>Origin : {strat.Origin}</Text>
				<Text style={{ textAlign: 'center', marginVertical: 4 }}>When : {strat.When}</Text>
				<Text style={{ textAlign: 'center', marginVertical: 4 }}>Target : {strat.Target}</Text>
				<Text style={{ textAlign: 'center', marginVertical: 4 }}>Effet : {strat.Effect}</Text>
			</View>
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
});
