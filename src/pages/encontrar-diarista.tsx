import React, {useEffect} from "react";
import { useTheme } from "react-native-paper";
import { ScrollView } from "react-native";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import TextInput from "ui/components/inputs/TextInput/TextInput";
import { TextInputMask } from "react-native-masked-text";
import Button from "ui/components/inputs/Button/Button";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import {
  FormContainer,
  TextContainer,
  ErrorText,
  ResponseContainer,
} from "ui/styles/pages/encontrar-diaristas.styled";
import useIndex from "data/hooks/pages/useindex.page";
import useEncontrarDiaristas from "data/hooks/pages/useEncontrarDiarista.page.mobile";

const EncontrarDiaristas: React.FC = () => {
  const { colors } = useTheme();
  const {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristaRestantes,
  } = useIndex(),
  { cepAutomatico } = useEncontrarDiaristas(); 

  useEffect(() =>{
    if(cepAutomatico && !cep){
      setCep(cepAutomatico);
      buscarProfissionais(cepAutomatico)
    }
  }, [cepAutomatico])

  return (
    <ScrollView>
      <PageTitle
        title={"Conheça os Profissionais"}
        subtitle={
          "Preencha Seu Endereço e veja todos os profissioanis da sua localidade"
        }
      />
      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep}
          type={"custom"}
          options={{
            mask: "99.999-999",
          }}
          customTextInput={TextInput}
          customTextInputProps={{
            label: "Digite seu Cep",
          }}
        />

        {erro ? <ErrorText>{erro}</ErrorText> : null}

        <Button
          mode={"contained"}
          style={{ marginTop: 32 }}
          color={colors.accent}
          disabled={!cepValido || carregando}
          onPress={() => buscarProfissionais(cep)}
          loading={carregando}
        >
          Buscar
        </Button>
      </FormContainer>

      {buscaFeita &&
        (diaristas.length > 0 ? (
          <ResponseContainer>
            {diaristas.map((item, index) => (
              <UserInformation
                key={index}
                name={item.nome_completo}
                rating={item.reputacao || 0}
                picture={item.foto_usuario || ''}
                description={item.cidade}
                darker={index % 2 === 1}
              />
            ))}

            {diaristaRestantes > 0 && (
              <TextContainer>
                ...e mais {diaristaRestantes}{" "}
                {diaristaRestantes > 1
                  ? "Profissionais atendem"
                  : "Profissionais atende"}{" "}
                ao seu endereço.
              </TextContainer>
            )}

            <Button color={colors.accent} mode={"contained"}>
              Contratar um Profissional
            </Button>
          </ResponseContainer>
        ) : (
          <TextContainer>
            Ainda não temos nenhuma diarista disponivel em sua Região
          </TextContainer>
        ))}
    </ScrollView>
  );
};

export default EncontrarDiaristas;
