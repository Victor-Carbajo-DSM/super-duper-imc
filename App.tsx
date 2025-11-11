import React, { JSX, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default function App(): JSX.Element {
  const [peso, setPeso] = useState<string>("");
  const [altura, setAltura] = useState<string>("");
  const [imc, setImc] = useState<number | null>(null);
  const [classificacao, setClassificacao] = useState<string>("");
  const [cor, setCor] = useState<string>("#000");

  function filtrarNumero(texto: string): string {
    return texto.replace(/[^0-9.]/g, "");
  }

  function classificarIMC(valor: number): { texto: string; cor: string } {
    if (valor < 18.5) {
      return { texto: "Abaixo do Peso", cor: "#F4D03F" };
    } else if (valor < 25) {
      return { texto: "Peso Normal", cor: "#2ECC71" };
    } else if (valor < 30) {
      return { texto: "Sobrepeso", cor: "#F1C40F" };
    } else if (valor < 35) {
      return { texto: "Obesidade Grau I", cor: "#E67E22" };
    } else if (valor < 40) {
      return { texto: "Obesidade Grau II", cor: "#E74C3C" };
    } else {
      return { texto: "Obesidade Grau III", cor: "#922B21" };
    }
  }

  function calcular(): void {
    const pesoNum = Number(peso);
    const alturaNum = Number(altura);

    if (!peso || !altura || alturaNum === 0 || isNaN(pesoNum) || isNaN(alturaNum)) {
      alert("Por favor, digite valores numéricos válidos.");
      return;
    }

    const valorIMC = pesoNum / (alturaNum * alturaNum);
    setImc(Number(valorIMC.toFixed(2)));

    const resultado = classificarIMC(valorIMC);
    setClassificacao(resultado.texto);
    setCor(resultado.cor);
  }

  function limpar(): void {
    setPeso("");
    setAltura("");
    setImc(null);
    setClassificacao("");
    setCor("#000");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={(texto) => setPeso(filtrarNumero(texto))}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={(texto) => setAltura(filtrarNumero(texto))}
      />

      <Button title="Calcular IMC" onPress={calcular} />

      {imc !== null && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.resultado}>IMC: {imc}</Text>
          <Text style={[styles.classificacao, { color: cor }]}>
            {classificacao}
          </Text>
        </View>
      )}

      <View style={{ marginTop: 20 }}>
        <Button title="Limpar" onPress={limpar} color="#808080" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultado: {
    fontSize: 22,
    fontWeight: "bold",
  },
  classificacao: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },
});