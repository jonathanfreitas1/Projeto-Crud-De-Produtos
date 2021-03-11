import Sequeliza, { Model, Sequelize } from 'sequelize';

class Produto extends Model {
  static init(sequelize){
    super.init(
      {
      name: Sequelize.STRING,
      valor_produto: Sequelize.DOUBLE,
      valor_produto_prom: Sequelize.DOUBLE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Produto;
