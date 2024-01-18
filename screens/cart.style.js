import { StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#102A43',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#486581',
    marginTop: 100,
    fontStyle: 'italic',
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    shadowColor: '#102A43',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#CBD2D9',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#334E68',
  },
  productPrice: {
    fontSize: 16,
    color: '#486581',
  },
  productQuantity: {
    fontSize: 16,
    color: '#9FB3C8',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#102A43',
    textAlign: 'center',
    marginVertical: 20,
  },
  cartFooter: {
    borderTopWidth: 1,
    borderColor: '#CBD2D9',
    paddingTop: 10,
  },
  placeOrderButton: {
    backgroundColor: '#4C9AFF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  placeOrderButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  quantityButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  
  quantityButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  productQuantity: {
    fontSize: 16,
    marginHorizontal: 5, 
  },
  
});

export default styles;
