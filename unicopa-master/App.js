import { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, SectionList, TouchableOpacity, ScrollView } from 'react-native';
import GameCard from './components/GameCard';
import dados from './assets/dados.json';

export default function App() {

  const jogos = dados.jogos;

  const hoje = new Date();
  const hojeStr = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

  const [favoritos, setFavoritos] = useState([]);
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);

const grupos = [...new Set(jogos.map(j => j.grupo))].sort();

const toggleGrupo = (grupo) => {
  setGrupoSelecionado(prev => prev === grupo ? null : grupo);
};

  const toggleFavorito = (id) => {
    setFavoritos(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const agruparPorData = (jogos) => {
    return jogos.reduce((acc, jogo) => {
      const data = jogo.data_brasilia;
      if (!acc[data]) {
        acc[data] = [];
      }
      acc[data].push(jogo);
      return acc;
    }, {});
  };

  const jogosFiltrados = grupoSelecionado
  ? jogos.filter(j => j.grupo === grupoSelecionado)
  : jogos;

const jogosAgrupados = agruparPorData(jogosFiltrados);

  const jogosTratados = Object.keys(jogosAgrupados).map(data => ({
    title: data,
    data: jogosAgrupados[data],
    isHoje: data === hojeStr,
  }));

  return (
    <ImageBackground
      style={styles.container}
      source={require('./assets/bg-overlay.png')}
    >
      <Image
        style={styles.logo}
        source={require('./assets/unicopa.png')}
      />

     <Text style={styles.title}>CALENDÁRIO</Text>

<View style={styles.filtroContainer}>
  {grupos.map(grupo => (
    <TouchableOpacity
      key={grupo}
      style={[styles.filtroBotao, grupoSelecionado === grupo && styles.filtroBotaoAtivo]}
      onPress={() => toggleGrupo(grupo)}
    >
      <Text style={[styles.filtroTexto, grupoSelecionado === grupo && styles.filtroTextoAtivo]}>
        {grupo}
      </Text>
    </TouchableOpacity>
  ))}
</View>

     <SectionList
  style={styles.lista}
  sections={jogosTratados}
  keyExtractor={(item, index) => item + index}
        renderItem={() => null}
        renderSectionHeader={({ section }) => (
          <View style={[styles.card, section.isHoje && styles.cardHoje]}>
            <View style={styles.dataContainer}>
              <Text style={[styles.data, section.isHoje && styles.dataHoje]}>
                {section.title}
              </Text>
              {section.isHoje && (
                <View style={styles.badgeHoje}>
                  <Text style={styles.badgeHojeTexto}>HOJE</Text>
                </View>
              )}
            </View>
            {section.data.map((jogo) => (
              <GameCard
                key={jogo.id}
                game={jogo}
                isFavorito={favoritos.includes(jogo.id)}
                onToggleFavorito={() => toggleFavorito(jogo.id)}
              />
            ))}
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#040b13',
    alignItems: 'center',
  },
  logo: {
    marginTop: 20,
    width: 200,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: '700',
    color: 'white',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#0c1b2a',
    width: 320,
    borderRadius: 12,
    padding: 15,
  },
  cardHoje: {
    borderWidth: 2,
    borderColor: '#f2cc2f',
    backgroundColor: '#111f2e',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  data: {
    color: '#f2cc2f',
    fontSize: 22,
    fontWeight: 'bold',
  },
  dataHoje: {
    color: '#f2cc2f',
  },
  badgeHoje: {
    backgroundColor: '#f2cc2f',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeHojeTexto: {
    color: '#040b13',
    fontSize: 11,
    fontWeight: 'bold',
  },
  lista: {
  width: '100%',
},
filtroContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: 8,
  paddingHorizontal: 16,
  marginTop: 12,
  marginBottom: 4,
},
filtroBotao: {
  borderWidth: 1,
  borderColor: '#f2cc2f',
  borderRadius: 20,
  paddingHorizontal: 14,
  paddingVertical: 5,
},
filtroBotaoAtivo: {
  backgroundColor: '#f2cc2f',
},
filtroTexto: {
  color: '#f2cc2f',
  fontSize: 13,
  fontWeight: 'bold',
},
filtroTextoAtivo: {
  color: '#040b13',
},
});

