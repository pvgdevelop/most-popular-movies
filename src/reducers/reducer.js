import { combineReducers } from "redux";
import { 
  FETCH_POPULAR_LIST_STARTED,
  FETCH_POPULAR_LIST_ERROR,
  FETCH_POPULAR_LIST_SUCCESS,

  FETCH_TOP_RATED_LIST_STARTED,
  FETCH_TOP_RATED_LIST_ERROR,
  FETCH_TOP_RATED_LIST_SUCCESS,

  FETCH_MOVIE_DETAIL_STARTED,
  FETCH_MOVIE_DETAIL_ERROR,
  FETCH_MOVIE_DETAIL_SUCCESS,

  FETCH_MOVIE_VIDEOS_STARTED,
  FETCH_MOVIE_VIDEOS_ERROR,
  FETCH_MOVIE_VIDEOS_SUCCESS,
  
  STORE_MOVIE_LIST_PATH,
  ADD_TO_FAVORITES,
  TOGGLE_MENU,
} from "../constants/constants";

const initialMovieListData = {
  fetching: false,
  fetched: false,
  movies: [],
  error: null,
  page: null,
  total_pages: null
};

const initialDetailData = {
  fetching: false,
  fetched: false,
  payload: {},
  error: null,
};

const initialVideosData = {
  fetching: false,
  fetched: false,
  payload: {},
  error: null,
};

const initialMoviesById = {};
const initialVideosById = {};
const initialFavoriteMovies = [];
const initialPath = "/";

const popularListData = (state = initialMovieListData, action) => {
  switch (action.type) {
    case FETCH_POPULAR_LIST_STARTED:
      return {
        ...state,
        fetching: true,
        fetched: false,
        error: null
      };
    case FETCH_POPULAR_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error,
      };
    case FETCH_POPULAR_LIST_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: [...state.movies, ...action.payload.results],
        // movies: [...state.movies, action.payload.results],
        page: action.payload.page,
        total_pages: action.payload.total_pages,
      };
    default:
      return state;
  }
};

const topRatedListData = (state = initialMovieListData, action) => {
  switch (action.type) {
    case FETCH_TOP_RATED_LIST_STARTED:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_TOP_RATED_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case FETCH_TOP_RATED_LIST_SUCCESS:
      return {
        fetching: false,
        fetched: true,
        movies: action.payload.results,
        error: null
      };
    default:
      return state;
  }
}

const moviesById = (state = initialMoviesById, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAIL_SUCCESS:
      var newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState
    default:
      return state;
  }
}

const videosById = (state = initialVideosById, action) => {
  switch (action.type) {
    case FETCH_MOVIE_VIDEOS_SUCCESS:
      var newState = {...state};
      newState[action.payload.id] = action.payload.results;
      return newState
    default:
      return state;
  }
}

const movieDetailData = (state = initialDetailData, action) => {
  switch (action.type) {
    case FETCH_MOVIE_DETAIL_STARTED:
      return {
        fetching: true,
        fetched: false, 
        error: null,
        payload: null
      };
    case FETCH_MOVIE_DETAIL_ERROR:
      return {
        ...state,
        fetching: false, 
        error: action.error,
      };
    case FETCH_MOVIE_DETAIL_SUCCESS:
      return {
        fetching: false, 
        fetched: true, 
        error: null,
        payload: action.payload,
      };
    default:
      return state;
  }
}

const movieVideosData = (state = initialVideosData, action) => {
  switch (action.type) {
    case FETCH_MOVIE_VIDEOS_STARTED:
      return {
        fetching: true,
        fetched: false, 
        error: null,
        payload: null
      };
    case FETCH_MOVIE_VIDEOS_ERROR:
      return {
        ...state,
        fetching: false, 
        error: action.error,
      };
    case FETCH_MOVIE_VIDEOS_SUCCESS:
      return {
        fetching: false, 
        fetched: true, 
        error: null,
        payload: action.payload,
      };
    default:
      return state;
  }
}

const favoriteMovies = (state = initialFavoriteMovies, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return [...new Set(state).add(action.id)];
    default:
      return state;
  }
}

const menuIsHidden = (state = true, action) => {
  switch (action.type) {
    case TOGGLE_MENU:
      return !state;
    default:
      return state;
  }
}

const storedMovieListPath = (state = initialPath, action) => {
  switch (action.type) {
    case STORE_MOVIE_LIST_PATH:
      return action.pathname;
    default:
      return state;
  }
}

const reducer = combineReducers({
  popularListData,
  topRatedListData,
  movieDetailData,
  movieVideosData,
  moviesById,
  videosById,
  favoriteMovies,
  menuIsHidden,
  storedMovieListPath
});

export default reducer;
