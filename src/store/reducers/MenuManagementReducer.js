const initState = {
  parentMenuName: null,
  labelsData: [],
  labelsRestData: null,
  categoriesData: [],
  categoriesRestData: null,
  menuData: [],
  menuRestData: null,
  categoryLoader: false,
  editCategoryLoader: false,
  addLabelLoader: false,
  editLabelLoader: false,
  addTabLoader: false,
  editTabLoader: false,
  tabsData: [],
  addMenuLoader: false,
  importLoader: false,
  deleteLoader: false,
  parentMenus: [],
  editMenuData: [],
  couponLoader: false,
  coupons: [],
  popupLoader: false,
  popups: []
}
const MenuManage = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'POPUP_LOADER':
      return {
        ...state,
        popupLoader: payload
      }
    case 'GET_POPUPS':
      return {
        ...state,
        popups: payload
      }
    case 'COUPON_LOADER':
      return {
        ...state,
        couponLoader: payload
      }
    case 'GET_COUPONS':
      return {
        ...state,
        coupons: payload
      }
    case 'SET_PARENT_MENU_NAME':
      return {
        ...state,
        parentMenuName: payload
      }
    case 'MENU':
      return {
        ...state,
        menuData: payload
      }
    case 'EDIT_MENU':
      return {
        ...state,
        editMenuData: payload
      }
    case 'MENU_DETAILS':
      return {
        ...state,
        menuRestData: payload
      }
    case 'ALL_PARENT_MENU':
      return {
        ...state,
        parentMenus: payload
      }
    case 'ADD_MENU_SUCCESS':
      const { id, name, restaurantID, createdAt, active } = payload
      return {
        ...state,
        parentMenus: [
          ...state.parentMenus,
          { id, name, restaurantID, createdAt, active }
        ]
      }
    case 'DELETE_PARENT_MENU':
      return {
        ...state,
        parentMenus: state.parentMenus.filter(menu => menu.id !== payload)
      }
    case 'DELETE_MENU_LOADER':
      return {
        ...state,
        deleteLoader: payload
      }
    case 'DELETED_MENU': {
      return {
        ...state,
        menuData: state.menuData.filter(menu => menu.id !== payload)
      }
    }
    case 'ADDED_MENU': {
      return {
        ...state,
        menuData: [...state.menuData, payload]
      }
    }
    case 'UPDATE_MENU':
      return {
        ...state,
        menuData: state.menuData?.map(menu =>
          menu.id === payload.id ? payload : menu
        )
      }
    case 'ADD_MENU_LOADER':
      return {
        ...state,
        addMenuLoader: payload
      }
    case 'LABELS':
      return {
        ...state,
        labelsData: payload
      }
    case 'LABELS_DETAILS':
      return {
        ...state,
        labelsRestData: payload
      }
    case 'ADDED_LABEL':
      return {
        ...state,
        labelsData: [...state.labelsData, payload]
      }
    case 'DELETED_LABEL':
      return {
        ...state,
        labelsData: state.labelsData?.filter(label => label?.id !== payload)
      }
    case 'UPDATE_LABEL':
      return {
        ...state,
        labelsData: state.labelsData?.map(lab =>
          lab.id === payload.id ? payload : lab
        )
      }
    case 'TABS':
      return {
        ...state,
        tabsData: payload
      }
    case 'ADDED_TAB':
      return {
        ...state,
        tabsData: [...state.tabsData, payload]
      }
    case 'DELETED_TAB':
      return {
        ...state,
        tabsData: state.tabsData?.filter(tab => tab?.id !== payload)
      }
    case 'UPDATE_TAB':
      return {
        ...state,
        tabsData: state.tabsData?.map(tab =>
          tab.id === payload.id ? payload : tab
        )
      }
    case 'ADD_LABEL_LOADER':
      return { ...state, addLabelLoader: payload }
    case 'EDIT_LABEL_LOADER':
      return { ...state, editLabelLoader: payload }
    case 'ADD_TAB_LOADER':
      return { ...state, addTabLoader: payload }
    case 'EDIT_TAB_LOADER':
      return { ...state, editTabLoader: payload }
    case 'IMPORT_LOADER':
      return { ...state, importLoader: payload }
    case 'CATEGORIES':
      return {
        ...state,
        categoriesData: payload
      }
    case 'CATEGORIES_DETAILS':
      return {
        ...state,
        categoriesRestData: payload
      }
    case 'ADDED_CATEGORY':
      return {
        ...state,
        categoriesData: [...state.categoriesData, payload]
      }
    case 'DELETED_CATEGORY':
      return {
        ...state,
        categoriesData: state.categoriesData?.filter(cat => cat?.id !== payload)
      }
    case 'UPDATED_CATEGORY':
      return {
        ...state,
        categoriesData: state.categoriesData?.map(cat => {
          if (cat?.id === payload.id) {
            return {
              ...cat,
              categoryName: payload.categoryName,
              imageURL: payload.imageURL
            }
          }
          return cat
        })
      }

    case 'CATEGORY_LOADER':
      return {
        ...state,
        categoryLoader: payload
      }
    case 'CATEGORY_EDIT_LOADER':
      return {
        ...state,
        editCategoryLoader: payload
      }
    default:
      return {
        ...state
      }
  }
}

export default MenuManage
