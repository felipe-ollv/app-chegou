import { View, Text, Pressable } from 'react-native';
import colors from '../../../colors-app/colors';
import styles from './styles';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePathname } from 'expo-router';

type HeaderComponentProps = {
	logoText: string,
	slogan: string
}

export default function HeaderComponent({ logoText, slogan }: HeaderComponentProps) {
	const pathName = usePathname();
	return (
		<View style={styles.header}>
			<View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
				{
					pathName === '/signup/page' &&
					<Pressable
						// style={styles.backButton}
						onPress={() => router.push('/')}
					>
						<Ionicons name="arrow-back" size={24} color={colors.white} />
					</Pressable>
				}
				<Text style={styles.logoText}>
					{logoText}<Text style={{ color: colors.green }}>App!</Text>
				</Text>
			</View>
			{/* <Text style={styles.logoText}> */}
			{/* {logoText}<Text style={{ color: colors.green }}>App!</Text> */}
			{/* </Text> */}
			{/* <Text style={styles.slogan}>{slogan}</Text> */}
		</View>
	)
}