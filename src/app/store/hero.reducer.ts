import { HeroAction, HeroActionTypes } from './hero.actions';
import { Hero } from './../hero';

export interface HeroState {
  list: Hero[],
  loading: boolean,
  error: Error
}

const initialState: HeroState = {
  list: [],
  loading: false,
  error: undefined
};

export function HeroReducer(state: HeroState = initialState, action: HeroAction) {
  switch (action.type) {
    case HeroActionTypes.LOAD_HERO:
      return {
        ...state,
        loading: true
      }
    case HeroActionTypes.LOAD_HERO_SUCCESS:
      return {
        ...state,
        list: action.payload,
        loading: false
      }
    
    case HeroActionTypes.LOAD_HERO_FAILURE: 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    
    case HeroActionTypes.ADD_HERO:
      return {
        ...state,
        loading: true
      }
    case HeroActionTypes.ADD_HERO_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
      };
    case HeroActionTypes.ADD_HERO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case HeroActionTypes.DELETE_HERO:
      return {
        ...state,
        loading: true
      };
    case HeroActionTypes.DELETE_HERO_SUCCESS:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload),
        loading: false
      }
    case HeroActionTypes.DELETE_HERO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case HeroActionTypes.UPDATE_HERO:
      return {
        ...state,
        loading: true
      }
    case HeroActionTypes.UPDATE_HERO_SUCCESS:
      const indexList = state.list.findIndex(element => element.id === action.payload.id);
      state.list[indexList].name = action.payload.name;
      return {
        ...state,
        list: state.list,
        loading: false,
      }
    case HeroActionTypes.UPDATE_HERO_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case HeroActionTypes.GET_HERO:
      return {
        ...state,
        loading: true
      }
    case HeroActionTypes.GET_HERO_SUCCESS:
      state.list.push(action.payload)
      return {
        ...state,
        list: state.list,
        loading: false
      }
    
    case HeroActionTypes.GET_HERO_FAILURE: 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}