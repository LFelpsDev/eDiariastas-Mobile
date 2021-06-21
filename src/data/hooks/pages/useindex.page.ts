import { useState, useMemo } from "react";
import { UserShortInterface } from "data/@types/UserInterface";
import { ValidationService } from "data/services/ValidationService";
import { ApiService } from "data/services/ApiService";

export default function useIndex() {
  const [cep, setCep] = useState(""),
    cepValido = useMemo(() => {
      return ValidationService.cep(cep);
    }, [cep]),
    [erro, setError] = useState(""),
    [buscaFeita, setBuscaFeita] = useState(false),
    [carregando, setCarregando] = useState(false),
    [diaristas, setDiaristas] = useState([] as UserShortInterface[]),
    [diaristaRestantes, setDiaristaRestantes] = useState(0);

    async function buscarProfissionais(cep: string) {
      setBuscaFeita(false);
      setCarregando(true);
      setError('');

      try {
       const { data } = await ApiService.get<{
         diaristas: UserShortInterface[],
         quantidade_diaristas: number
       }>('/api/diaristas-cidade?cep='+cep.replace(/\D/g,''))
        setDiaristaRestantes(data.quantidade_diaristas)
        setDiaristas(data.diaristas)
        setBuscaFeita(true);
        setCarregando(false);
      }catch (erro) {
        setError('CEP não Encontrado');
        setCarregando(false)
      }


      setBuscaFeita(true);
    } 

  return {
    cep,
    setCep,
    cepValido,
    buscarProfissionais,
    erro,
    diaristas,
    buscaFeita,
    carregando,
    diaristaRestantes,
  };
}
