import React, { useRef, useEffect } from "react";
import {
	Modal,
	ScrollView,
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableWithoutFeedback,
	Animated,
	PanResponder,
} from "react-native";

export default function ModalTermsAndPrivacy({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) {
	const translateY = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		if (visible) {
			translateY.setValue(0);
		}
	}, [visible]);

	const panResponder = useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (_, gesture) => gesture.dy > 5,
			onPanResponderMove: (_, gesture) => {
				if (gesture.dy > 0) {
					translateY.setValue(gesture.dy);
				}
			},
			onPanResponderRelease: (_, gesture) => {
				if (gesture.dy > 120) {
					Animated.timing(translateY, {
						toValue: 600,
						duration: 200,
						useNativeDriver: true,
					}).start(onClose);
				} else {
					Animated.spring(translateY, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	return (
		<Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
			<View style={styles.backdrop}>
				<TouchableWithoutFeedback onPress={onClose}>
					<View style={StyleSheet.absoluteFillObject} />
				</TouchableWithoutFeedback>

				<Animated.View style={[styles.card, { transform: [{ translateY }] }]} {...panResponder.panHandlers}>
					<View style={styles.grabberWrap}>
						<View style={styles.grabber} />
					</View>

					<ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator>
						{/* --- TERMOS DE USO --- */}
						<Text style={styles.title}>Termos de Uso</Text>
						<Text style={styles.normal}>Versão 1.2 – Vigência: 30 de setembro de 2025</Text>

						<Text style={styles.subTitle}>Bem-vindo ao ChegouApp!</Text>
						<Text style={styles.normal}>
							Ao acessar ou usar este aplicativo, você concorda integralmente com estes Termos
							de Uso e com nossa Política de Privacidade. Caso não concorde, não utilize o App.
						</Text>

						<Text style={styles.subTitle}>1. Aceitação dos Termos</Text>
						<Text style={styles.normal}>
							Ao criar uma conta ou utilizar o App, você declara ter lido, compreendido e aceitado
							estes Termos e a Política de Privacidade.
						</Text>

						<Text style={styles.subTitle}>2. Descrição do Serviço</Text>
						<Text style={styles.normal}>
							O App é uma ferramenta de comunicação entre moradores e administradores de
							condomínios para registrar e notificar o recebimento de encomendas.
							{"\n\n"}O App não gerencia, armazena, transporta, fiscaliza ou se responsabiliza
							por encomendas, extravios, danos, atrasos, trocas ou qualquer outra situação
							física relacionada às mercadorias.
						</Text>

						<Text style={styles.subTitle}>3. Cadastro e Conta</Text>
						<Text style={styles.normal}>
							O usuário deve fornecer dados verdadeiros e atualizados. Cada usuário é responsável
							pelas informações cadastradas.
						</Text>

						<Text style={styles.subTitle}>4. Uso Permitido</Text>
						<Text style={styles.normal}>
							O App deve ser utilizado apenas para comunicação sobre o recebimento de encomendas.
							É proibido:
							{"\n"}- Cobrar valores ou realizar transações financeiras;
							{"\n"}- Resolver disputas comerciais ou pessoais;
							{"\n"}- Garantir retirada, troca, devolução ou entrega de encomendas;
							{"\n"}- Publicar conteúdo ilegal, ofensivo ou prejudicial.
						</Text>

						<Text style={styles.subTitle}>5. Conteúdo e Limitação</Text>
						<Text style={styles.normal}>
							As informações inseridas pelos usuários são de responsabilidade exclusiva de quem as
							publicou. O App não valida, aprova ou garante a veracidade dessas informações.
						</Text>

						<Text style={styles.subTitle}>6. Propriedade Intelectual</Text>
						<Text style={styles.normal}>
							O App, suas marcas, código, design e identidade visual são de propriedade
							exclusiva da Empresa.
						</Text>

						<Text style={styles.subTitle}>7. Isenção e Limitação de Responsabilidade</Text>
						<Text style={styles.normal}>
							O App não se responsabiliza por problemas, perdas, danos, extravios, atrasos ou
							defeitos relacionados a encomendas.
							{"\n\n"}Qualquer disputa sobre encomendas deve ser resolvida diretamente entre os
							envolvidos (usuários, administradores, transportadoras, síndico etc.), sem envolver
							o App.
						</Text>

						<Text style={styles.subTitle}>8. Encerramento</Text>
						<Text style={styles.normal}>
							O App pode suspender ou encerrar contas que violem estes Termos. O cancelamento não
							remove registros históricos, conforme legislação e Política de Privacidade.
						</Text>

						<Text style={styles.subTitle}>9. Lei Aplicável e Foro</Text>
						<Text style={styles.normal}>
							Estes Termos são regidos pela legislação brasileira. Eventuais disputas serão
							resolvidas no foro da cidade/estado do condomínio.
						</Text>

						<Text style={styles.subTitle}>10. Contato</Text>
						<Text style={styles.normal}>Dúvidas: felipe@app-chegou.com.br</Text>

						<Text style={styles.subTitle}>Resumo</Text>
						<Text style={styles.normal}>
							O ChegouApp! é apenas uma ferramenta de comunicação. Não nos
							responsabilizamos por qualquer questão física ou logística das encomendas. O uso do App
							implica aceitação total desta isenção.
						</Text>

						{/* --- POLÍTICA DE PRIVACIDADE --- */}
						<Text style={[styles.title, { marginTop: 12 }]}>Política de Privacidade</Text>
						<Text style={styles.normal}>Versão 1.2 – Vigência: 30 de setembro de 2025</Text>

						<Text style={styles.subTitle}>1. Coleta de Informações</Text>
						<Text style={styles.normal}>
							Coletamos apenas dados essenciais para operação do App:
							{"\n"}- Cadastro: nome, sobrenome, bloco e apartamento;
							{"\n"}- Histórico de notificações sobre encomendas.
							{"\n\n"}Não coletamos informações sobre conteúdo, valor, transportadora, rastreamento
							externo ou ciclo de vida das encomendas.
						</Text>

						<Text style={styles.subTitle}>2. Uso das Informações</Text>
						<Text style={styles.normal}>
							Os dados são usados exclusivamente para comunicação interna sobre o recebimento de
							encomendas, sem qualquer intermediação logística, financeira ou física.
						</Text>

						<Text style={styles.subTitle}>3. Compartilhamento</Text>
						<Text style={styles.normal}>
							Os dados não serão repassados a terceiros fora do contexto do condomínio.
						</Text>

						<Text style={styles.subTitle}>4. Armazenamento e Segurança</Text>
						<Text style={styles.normal}>
							Os dados são armazenados de forma segura, conforme a legislação brasileira de
							proteção de dados. O App não mantém informações sobre movimentação física das encomendas.
						</Text>

						<Text style={styles.subTitle}>5. Cookies e Tecnologias</Text>
						<Text style={styles.normal}>
							Usamos cookies apenas para garantir funcionalidades básicas do App. Não há rastreamento
							de encomendas.
						</Text>

						<Text style={styles.subTitle}>6. Direitos do Titular</Text>
						<Text style={styles.normal}>
							Você pode consultar, corrigir ou solicitar a exclusão de seus dados pelo e-mail:
							felipe@app-chegou.com.br
						</Text>

						<Text style={styles.subTitle}>7. Crianças</Text>
						<Text style={styles.normal}>O App não é destinado a menores de 18 anos.</Text>

						<Text style={styles.subTitle}>8. Alterações</Text>
						<Text style={styles.normal}>
							Podemos alterar esta Política a qualquer momento. Usuários serão notificados via App
							ou e-mail.
						</Text>

						<Text style={styles.subTitle}>9. Contato</Text>
						<Text style={styles.normal}>
							Para dúvidas sobre privacidade: felipe@app-chegou.com.br
						</Text>

						<Text style={styles.subTitle}>Resumo</Text>
						<Text style={styles.normal}>
							O ChegouApp! é apenas uma ferramenta de comunicação. Não nos responsabilizamos por
							perdas, danos ou atrasos relacionados a encomendas. O uso do App implica ciência e
							aceitação desta Política.
						</Text>
					</ScrollView>
				</Animated.View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.35)",
		justifyContent: "flex-end",
	},
	card: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		maxHeight: "85%",
		overflow: "hidden",
	},
	grabberWrap: {
		alignItems: "center",
		paddingTop: Platform.OS === "ios" ? 12 : 8,
		paddingBottom: 4,
	},
	grabber: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#D0D5DD",
	},
	scrollContent: {
		paddingHorizontal: 16,
		paddingBottom: 36,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
		marginTop: 10
	},
	subTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginBottom: 4,
		marginTop: 8,
	},
	normal: {
		fontSize: 14,
		marginBottom: 12,
		lineHeight: 20,
	},
});
