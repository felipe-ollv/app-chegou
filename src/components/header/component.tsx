import { View, Text, Pressable } from 'react-native';
import colors from '../../../constants/colors';
import styles from './styles';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type HeaderComponentProps = {
	logoText: string,
	slogan: string
}

export default function HeaderComponent({logoText, slogan}: HeaderComponentProps) {
    return (
			<View style={styles.header}>
				<Pressable
					style={styles.backButton}
					onPress={() => router.back()}
				>
					<Ionicons name="arrow-back" size={24} color={colors.white}/>
				</Pressable>
				<Text style={styles.logoText}>
					{logoText}<Text style={{ color: colors.green }}>App!</Text>
				</Text>
				<Text style={styles.slogan}>{slogan}</Text>
			</View>
    )
}