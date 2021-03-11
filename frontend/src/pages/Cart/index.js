import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

import { Container, Total, ProductTable } from './styles';

function Cart({ total, cart, removeFromCart, updateAmount }) {
  function increment(product) {
    updateAmount(product.id, product.amount + 1);
  }

  function decrement(product) {
    updateAmount(product.id, product.amount - 1);
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th>Qtd</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <h1>{product.name}</h1>
              </td>
              <td>
                <strong>Promoção</strong>
                <span>De: {formatPrice(product.valor_produto)}</span>
                <span>Por: {formatPrice(product.valor_produto_prom)}</span>
              </td>
              <td>
                <div>
                  <button type="button" onClick={() => decrement(product)}>
                    <MdRemoveCircleOutline size={20} color="#7159c1" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button" onClick={() => increment(product)}>
                    <MdAddCircleOutline size={20} color="#7159c1" />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id)}
                >
                  <MdDelete size={20} color="#7159c1" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  );
}
Cart.propTypes = {
  cart: PropTypes.func,
};

Cart.defaultProps = { cart: () => {} };

Cart.propTypes = {
  removeFromCart: PropTypes.func,
};

Cart.defaultProps = { removeFromCart: () => {} };

Cart.propTypes = {
  total: PropTypes.number,
};

Cart.defaultProps = { total: 0 };

Cart.propTypes = {
  updateAmount: PropTypes.func,
};

Cart.defaultProps = { updateAmount: () => {} };

const mapStateToProps = (state) => ({
  cart: state.cart.map((product) => ({
    ...product,
    subtotal: formatPrice(product.valor_produto_prom * product.amount),
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.valor_produto_prom * product.amount,
      0
    )
  ),
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
