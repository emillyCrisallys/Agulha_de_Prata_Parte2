import ProductModel from './ProductModel';
import InventoryModel from './InventoryModel';
import CartModel from './CartModel';
import UserModel from './UserModel';

// Relacionamento Product → Inventory
ProductModel.hasOne(InventoryModel, { foreignKey: 'productId' });
InventoryModel.belongsTo(ProductModel, { foreignKey: 'productId' });

// Relacionamento User → Cart
UserModel.hasMany(CartModel, { foreignKey: 'userId' });
CartModel.belongsTo(UserModel, { foreignKey: 'userId' });

// Relacionamento Product → Cart
ProductModel.hasMany(CartModel, { foreignKey: 'productId' });
CartModel.belongsTo(ProductModel, { foreignKey: 'productId' });
