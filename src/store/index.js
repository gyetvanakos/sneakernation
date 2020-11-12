import Vue from 'vue';
import Vuex from 'vuex';
import {
  dbMenuAdd
} from '../environments/environment';
import firebase from 'firebase';
import 'firebase/firestore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    basketItems: [],
    currentItem: {},
    menuItems: [],
    currentUser: null
  },
  mutations: {
    addBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach((item) => {
          if (state.basketItems.find(itemInArray => item.id === itemInArray.id && item.size === itemInArray.size)) {
            item = state.basketItems.find(itemInArray => item.id === itemInArray.id && item.size === itemInArray.size)
            item.quantity++
          } else if (state.basketItems.find(itemInArray => item.id === itemInArray.id && item.size !== itemInArray.size)) {
            var shoes = {}
            shoes.size = item.size
            shoes.image = item.image
            shoes.price = item.price
            shoes.name = item.name
            shoes.id = item.id,
              shoes.quantity = 1
            state.basketItems.push(shoes)
          } else {
            state.basketItems.push({
              id: item.id,
              image: item.image,
              size: item.size,
              name: item.name,
              price: item.price,
              quantity: 1
            })
          }
        })
      }
    },
    removeBasketItems: (state, basketItems) => {
      if (basketItems instanceof Array) {
        basketItems.forEach((item) => {
          if (state.basketItems.find(itemInArray => item.id === itemInArray.id && item.size === itemInArray.size)) {
            console.log("rm most itt vagyok geci")
            item = state.basketItems.find(itemInArray => item.id === itemInArray.id && item.size === itemInArray.size)

            var removeIndex = state.basketItems.indexOf(item);
            console.log(removeIndex)
            if (item.quantity === 1) {
              item.quantity--
              console.log(removeIndex)
              state.basketItems.splice(removeIndex, 1)
            } else {
              item.quantity--
            }
          }
        })
      }
    },
    userStatus(state, user) {
      if (user) {
        state.currentUser = user
      } else {
        state.currentUser = null
      }
    },
    deleteAllBasketItems: state => {
      state.basketItems = []
    },
    setMenuItems: state => {
      let menuItems = []
      dbMenuAdd.onSnapshot((snapshotItems) => {
        menuItems = []
        snapshotItems.forEach((doc) => {
          var menuItemData = doc.data();
          menuItems.push({
            id: doc.id,
            sizes: menuItemData.sizes,
            name: menuItemData.name,
            color: menuItemData.color,
            price: menuItemData.price,
            image: menuItemData.image
          })
        })
        state.menuItems = menuItems
      })
    }
  },
  actions: {
    setUser(context, user) {
      context.commit('userStatus', user)
    },
    setMenuItems: context => {
      context.commit('setMenuItems')
    },
    deleteAllBasketItems: context => {
      context.commit('deleteAllBasketItems')
    }
  },
  getters: {
    getBasketItems: state => state.basketItems,
    currentUser: state => state.currentUser,
    getMenuItems: state => state.menuItems
  }
})

console.log(firebase);