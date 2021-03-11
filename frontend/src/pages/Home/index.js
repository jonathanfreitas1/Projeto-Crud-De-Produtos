import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import { ProductList } from './styles';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.handleGetProduct();
  }

  handleGetProduct = async () => {
    const response = await api.get('produtos');
    this.setState({ products: response.data });
  };

  handleAddProduct = (product) => {
    const { addToCart } = this.props;
    addToCart(product);
  };

  handleDelete = async (produtoId) => {
    const response = await api.delete(`produtos/${produtoId}`);
    if (response.status === 200) {
      alert('Deletado');
      this.handleGetProduct();
    } else {
      alert('Error ao cadastrar');
    }
  };

  render() {
    const { products } = this.state;
    return (
      <ProductList>
        {products.map((product) => (
          <li key={product.id}>
            <h1>{product.name}</h1>
            <span>{formatPrice(product.valor_produto_prom)}</span>
            <button
              type="button"
              onClick={() => this.handleAddProduct(product)}
            >
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
            <button
              className="corButton"
              type="button"
              onClick={() => this.handleDelete(product.id)}
            >
              <span>Excluir</span>
            </button>
            {/* <Link to={`editarProduto/${product.id}`}>
              <span>Editar</span>
            </Link> */}
          </li>
        ))}
        <li>
          <h1>Aqui você pode cadastrar um novo produto</h1>
          <Link to="/cadastrarProduto">
            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#FFF" />
              </div>
              <span>Cadastrar novo produto</span>
            </button>
          </Link>
        </li>
      </ProductList>
    );
  }
}

Home.propTypes = {
  addToCart: PropTypes.func,
};

Home.defaultProps = { addToCart: () => {} };

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(null, mapDispatchToProps)(Home);
