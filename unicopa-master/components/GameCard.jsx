import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { teamLogos } from '../constants/teamLogos';

export default function GameCard({ game, isFavorito, onToggleFavorito }) {

  return (
    <View style={styles.jogo}>

      <View style={styles.cabecalho}>
        <Text style={styles.grupo}>
          GRUPO {game.grupo}  {game.confronto}
        </Text>
        <TouchableOpacity onPress={onToggleFavorito} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.coracao, isFavorito && styles.coracaoAtivo]}>
            {isFavorito ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaPrincipal}>

        <View style={styles.time}>
          <Image
            style={styles.bandeira}
            source={teamLogos[game.sigla_casa?.toLowerCase()]}
          />
          <Text style={styles.sigla}>{game.sigla_casa}</Text>
        </View>

        <View style={styles.horario}>
          <Text style={styles.hora}>{game.hora_brasilia}</Text>
          <Text style={styles.subTitulo}>VS</Text>
        </View>

        <View style={styles.time}>
          <Text style={styles.sigla}>{game.sigla_fora}</Text>
          <Image
            style={styles.bandeira}
            source={teamLogos[game.sigla_fora?.toLowerCase()]}
          />
        </View>

      </View>

      <View style={styles.local}>
        <Text style={styles.subTitulo}>{game.estadio}</Text>
        <Text style={styles.subTitulo}>
          {game.cidade} • {game.pais}
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  jogo: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1e2d3d',
    paddingBottom: 15,
  },
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  grupo: {
    color: '#8fa3b8',
    fontSize: 12,
  },
  coracao: {
    fontSize: 20,
    color: '#8fa3b8',
  },
  coracaoAtivo: {
    color: '#f2cc2f',
  },
  linhaPrincipal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  bandeira: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  sigla: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  horario: {
    alignItems: 'center',
  },
  hora: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  local: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitulo: {
    color: '#8fa3b8',
    fontSize: 12,
  },
});