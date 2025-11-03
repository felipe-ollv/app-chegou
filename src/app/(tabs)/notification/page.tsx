import HeaderComponent from "../../../components/header/component";
import { Buffer } from "buffer";
import { Pressable, Text, View } from "react-native";
import { notificationStyles } from "../../../styles/notification-styles";
import UploadPdfComponent from "../../../components/pdf/pdf-document-note";
import { useUser } from "../../../context/user.context";
import { useEffect, useState } from "react";
import ToastComponent from "../../../components/toast/component";
import api from "../../../interceptor/axios-config";
import ModalPdfView from "../../../components/modals/modal-view-pdf";

export default function NotificationScreen() {
	const [visible, setVisible] = useState(false);
	const [notes, setNotes] = useState<any>([]);
	const [noteSelected, setNoteSelected] = useState('');
	const { userData } = useUser();

	useEffect(() => {
		fetchNoteCondominium();
	}, []);

	const fetchNoteCondominium = async () => {
    try {
      const res: any = await api.get(`/note-data/find-note-data/${userData.cs}`);
			console.log('notes', res.data)
			if (res.data) {
				setNotes(res.data);
			}
    } catch (error) {
        ToastComponent({type: 'error', text1: "Erro!", text2: "Erro interno, aguarde alguns instantes"})
    } finally {
    }
  }

	const getPdfBase64 = async (path: string) => {
		try {
			const response = await api.get(path, { responseType: "arraybuffer" });
			console.log('RESPONSE PDF', response)
			const base64 = `data:application/pdf;base64,${Buffer.from(response.data, "binary").toString("base64")}`;
			setNoteSelected(base64);
			return base64;
		} catch (error) {
			console.log("Erro ao carregar arquivo:", error);
			return null;
		}
	};

	return (
		<View style={notificationStyles.container}>
			<HeaderComponent logoText="Chegou" slogan="Avisos do condominio!" />
			<View style={notificationStyles.form}>
				{notes.length > 0 ? (
          notes.map((note, index) => (
            <Pressable
              key={index}
              style={notificationStyles.card}
              onPress={() => getPdfBase64(note.content)}
            >
              <Text
                style={{
                  fontWeight: "500",
                  fontSize: 16,
                  marginBottom: 2,
                }}
              >
                {note.title || "Novo aviso!"}
              </Text>
              <Text numberOfLines={2}>{note.description || "Clique para abrir"}</Text>
            </Pressable>
          ))
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Nenhum aviso disponível
          </Text>
        )}
				
				<ModalPdfView 
					visible= {visible}
					onClose={() => setVisible(false)}
					pdfUrl={noteSelected}
				/>

				{
					userData.ts === 'TRUSTEE' ?
					<View
						style={{
							position: "absolute",
							right: 1,
							bottom: 1,
							width: 1,
							height: 1,
							borderRadius: 28,
							justifyContent: "center",
						}}
					>
						<UploadPdfComponent />
					</View>
					: 
					null
				}
			</View>
		</View>
	)
}
