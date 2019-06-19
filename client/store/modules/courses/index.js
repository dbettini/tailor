import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const PAGINATION_DEFAULTS = { offset: 0, limit: 21 };

const state = {
  search: '',
  items: {},
  $internals: {
    pagination: PAGINATION_DEFAULTS,
    sort: {
      order: 'DESC',
      field: 'updatedAt'
    },
    allCoursesFetched: false
  },
  $baseUrl: ''
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
