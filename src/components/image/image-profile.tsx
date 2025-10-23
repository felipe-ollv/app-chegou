import React, { useEffect, useState } from "react";
import { View, Image, Alert, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import colors from "../../../colors-app/colors";
import api from "../../interceptor/axios-config";
import { useUser } from "../../context/user.context";
import ToastComponent from "../toast/component";
import { Buffer } from 'buffer';
import BasicLoading from "../loading/basic-loading";

interface ProfileImageProps {
  uri: string;
}

export default function ProfileImageComponent({ uri }: ProfileImageProps) {
	const { userData } = useUser();
	const [loading, setLoading] = useState(false);
	const [currentImage, setCurrentImage] = useState<string>(uri);

	useEffect(() => {
		getProfileImage(uri);
  }, [uri]);

	const getProfileImage = async (data: string) => {
		try {
			const response = await api.get(data, { responseType: 'arraybuffer' });
			const base64 = `data:image/jpeg;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
      setCurrentImage(base64);
		} catch (error) {
			return error;
		}
	}

	const pickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (status !== "granted") {
			Alert.alert("Permissão necessária", "Precisamos de acesso à galeria.");
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ["images"],
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.8,
		});

		if (!result.canceled) {
			uploadImage(result.assets[0].uri);
		}
	};

	const uploadImage = async (uri: string) => {
		setLoading(true);
		const manipResult = await ImageManipulator.manipulateAsync(
			uri,
			[{ resize: { width: 512, height: 512 } }],
			{ compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
		);

		try {
			const formData = new FormData();

			formData.append("file", {
				uri: manipResult.uri,            // caminho local da imagem manipulada
				type: "image/jpeg",              // tipo do arquivo
				name: "profile.jpg",             // nome do arquivo
			} as any);

			formData.append('uuidUserProfile', userData.ps);

			const result = await api.post('/user-profile/image-user-profile', formData, {
				headers: { "Content-Type": "multipart/form-data" }
			})

			if (result.data.code === 200) {
				getProfileImage(result.data.value);
				ToastComponent({ type: 'success', text1: 'Sucesso!', text2: result.data.message })
			} else {
				ToastComponent({ type: 'warning', text1: 'Falha!', text2: result.data.message })
			}

		} catch (error) {
			ToastComponent({ type: 'error', text1: 'Erro!', text2: 'Erro interno, aguarde alguns instantes' })
		} finally {
			setLoading(false);
		}
	}

	return (
		<View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
				{loading ? 
					<View style={{ width: 200, height: 200, borderRadius: 100 }}>
						<BasicLoading /> 
					</View>
				:
					currentImage ?
						<Image
							source={{ uri: currentImage }}
							style={{ width: 200, height: 200, borderRadius: 100 }}
						/> 
						:
						<Image
							source={ require('../../../assets/images/11539820.png') }
							style={{ width: 200, height: 200, borderRadius: 100 }}
						/> 
				}
			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'flex-end',
					marginBottom: 20
				}}
			>
				<View style={{
					width: '70%',
				}}
				/>
				<Pressable
					onPress={pickImage}
					style={{
						width: 50,
						height: 50,
						borderRadius: 25,
						backgroundColor: colors.green,
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: -20,
					}}
				>
					<MaterialCommunityIcons name="image-edit-outline" size={24} color={colors.white} />
				</Pressable>
			</View>
		</View>
	);
}
