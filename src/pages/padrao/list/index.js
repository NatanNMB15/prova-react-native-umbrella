import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { getAllPadrao } from '~/database/crud';

import {
  InfoContainer,
  Container,
  List,
  Title,
  Description,
  Button,
  ButtonText,
} from '~/components/styles';

export default function PadraoList({ navigation }) {
  const [padroes, setPadroes] = useState([]);

  useEffect(() => {
    var collection = [];
    function getData() {
      collection = getAllPadrao();
      setPadroes(
        JSON.parse(
          JSON.stringify(
            Array.prototype.slice.call(collection, 0, collection.length)
          )
        )
      );
    }
    function initRealmListener() {
      collection = getAllPadrao();
      collection.addListener(getData);
    }
    function RemoveRealmListener() {
      collection.removeListener(getData);
    }
    initRealmListener();

    return () => {
      RemoveRealmListener();
    };
  }, []);

  return (
    <Container>
      <List>
        <FlatList
          data={padroes}
          keyExtractor={(item) => String(item.id)}
          extraData={padroes}
          renderItem={({ item: animal }) => (
            <InfoContainer>
              <Title>{animal.nome}</Title>
              <Description>
                Acesse os padrões de monitoramento para {animal.nome}
              </Description>
              <Button
                onPress={() => navigation.navigate('PadraoRead', { animal })}
              >
                <ButtonText>Acessar</ButtonText>
              </Button>
            </InfoContainer>
          )}
        />
      </List>
    </Container>
  );
}
