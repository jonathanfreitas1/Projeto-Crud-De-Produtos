import React, { Component } from 'react';

import { FaPlus, FaProductHunt } from 'react-icons/fa';
import api from '../../services/api';

import { Container, Form, SubmitButton } from './styles';

class CadastrarProduto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      valor_produto: '',
      valor_produto_prom: '',
    };
  }

  handleInputChangeName = (e) => {
    this.setState({ name: e.target.value });
  };

  handleInputChangeValorProduto = (e) => {
    this.setState({ valor_produto: e.target.value });
  };

  handleInputChangeValorProdutoProm = (e) => {
    this.setState({ valor_produto_prom: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, valor_produto, valor_produto_prom } = this.state;
    const response = await api.post('produtos', {
      name,
      valor_produto,
      valor_produto_prom,
    });
    if (response.status === 200) {
      alert('cadastrado');
    } else {
      alert('Error ao cadastrar');
    }
  };

  render() {
    const { name, valor_produto, valor_produto_prom } = this.state;
    return (
      <Container>
        <h1>
          <FaProductHunt />
          Adicionar Produtos
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Nome do produto"
            value={name}
            onChange={this.handleInputChangeName}
          />
          <input
            type="number"
            placeholder="Valor do produto"
            value={valor_produto}
            onChange={this.handleInputChangeValorProduto}
          />
          <input
            type="number"
            placeholder="Valor do produto em promoção"
            value={valor_produto_prom}
            onChange={this.handleInputChangeValorProdutoProm}
          />
          <SubmitButton>
            Adicionar
            <FaPlus color="#FFF" size={14} />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

export default CadastrarProduto;
