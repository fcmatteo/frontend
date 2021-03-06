const initialState = {
  services: {},
  trips: [],
  tags: [],
  popularPlaces: [],
  exciting_activities: [],
  delicious_foods: [],
};

export default function homeReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'SERVICES_FETCHED':
      return {
        ...state,
        services: action.payload.services,
      };
    case 'TRIPS_FETCHED':
      return {
        ...state,
        trips: action.payload.trips,
      };
    case 'POPULAR_TAGS_RETRIEVED':
      return {
        ...state,
        tags: action.payload,
      };
    case 'POPULAR_PLACES_RETRIEVED':
      return {
        ...state,
        popularPlaces: action.payload.popularPlaces,
      };
    case 'SERVICE_PICTURES_FETCHED':
      return {
        ...state,
        services: action.payload.services,
      };
    case 'EXCITING_ACTIVITIES_RETRIEVED':
      return {
        ...state,
        exciting_activities: action.payload.exciting_activities,
      };
    case 'DELICIOUS_FOOD_RETRIEVED':
      return {
        ...state,
        delicious_foods: action.payload.delicious_foods,
      };

    default:
      return state;
  }
}
