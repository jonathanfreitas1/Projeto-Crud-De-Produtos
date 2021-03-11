import Produto from '../models/Produto';
import * as Yup from 'yup';
import { Op, Sequelize } from 'sequelize';

class ProdutoController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      valor_produto: Yup.number().required(),
      valor_produto_prom: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validação falhou' });
    }
    const produtoExist = await Produto.findOne({
      where: { name: req.body.name },
    });
    if (produtoExist) {
      return res.status(400).json({ error: 'Produto ja existe' });
    }
    const {
      id,
      name,
      valor_produto,
      valor_produto_prom,
    } = await Produto.create(req.body);
    return res.json({
      id,
      name,
      valor_produto,
      valor_produto_prom,
    });
  }
  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      valor_produto: Yup.number(),
      valor_produto_prom: Yup.number(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validação falhou' });
    }
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não existe' });
    }

    const nameExists = await Produto.findOne({
      where: { name: { [Sequelize.Op.iLike]: req.body.name } },
    });

    if (nameExists) {
      if (produto.name !== nameExists.name) {
        return res.status(409).json({ error: 'Nome ja existe.' });
      }
    }

    const { name, valor_produto, valor_produto_prom } = await produto.update(
      req.body
    );
    return res.json({
      name,
      valor_produto,
      valor_produto_prom,
    });
  }

  async index(req, res) {
    const produtos = await Produto.findAll({
      attributes: ['id', 'name', 'valor_produto', 'valor_produto_prom'],
    });
    return res.json(produtos);
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const produto = await Produto.findByPk(id);

      if (!produto) {
        return res.status(404).json({ error: 'Produto não exite' });
      }
      return res.json(produto);
    } catch (error) {
      return res
        .status(400)
        .json({ error: 'An error occurred in the database, try again' });
    }
  }

  async delete(req, res) {
    const { id } = req.params;

    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ error: 'Produto não existe' });
    }

    await produto.destroy();

    return res.json();
  }
}

export default new ProdutoController();
