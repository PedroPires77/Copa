import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { teamLogos } from '../constants/teamLogos';

export default function GameCard({ game, isFavorito, onToggleFavorito }) {

  const logo = (sigla) => teamLogos[sigla?.toLowerCase()];

  return (
    <View style={styles.jogo}>

      <View style={styles.cabecalho}>
        <Text style={styles.grupo}>
          GRUPO {game.grupo}{'  '}{game.confronto}
        </Text>
        <TouchableOpacity onPress={onToggleFavorito} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={[styles.coracao, isFavorito && styles.coracaoAtivo]}>
            {isFavorito ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.linhaPrincipal}>

        <View style={styles.time}>
          {logo(game.sigla_casa) ? (
            <Image style={styles.bandeira} source={logo(game.sigla_casa)} />
          ) : (
            <View style={styles.bandeiraPlaceholder} />
          )}
          <Text style={styles.sigla}>{game.sigla_casa}</Text>
        </View>

        <View style={styles.horario}>
          <Text style={styles.hora}>{game.hora_brasilia}</Text>
          <Text style={styles.vs}>VS</Text>
        </View>

        <View style={[styles.time, styles.timeDireita]}>
          <Text style={styles.sigla}>{game.sigla_fora}</Text>
          {logo(game.sigla_fora) ? (
            <Image style={styles.bandeira} source={logo(game.sigla_fora)} />
          ) : (
            <View style={styles.bandeiraPlaceholder} />
          )}
        </View>

      </View>

      <View style={styles.local}>
        <Text style={styles.subTitulo}>{game.estadio}</Text>
        <Text style={styles.subTitulo}>{game.cidade} • {game.pais}</Text>
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
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    flexShrink: 1,
    marginRight: 8,
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
    flex: 1,
  },
  timeDireita: {
    justifyContent: 'flex-end',
  },
  bandeira: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  bandeiraPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1e2d3d',
  },
  sigla: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  horario: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  hora: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vs: {
    color: '#8fa3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  local: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subTitulo: {
    color: '#8fa3b8',
    fontSize: 11,
  },
});