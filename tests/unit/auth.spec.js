import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AppHeader from '../../src/components/AppHeader';
import authActions from '../../src/store/modules/auth/actions';
import authGetters from '../../src/store/modules/auth/getters';
import authMutations from '../../src/store/modules/auth/mutations';

const localVue = createLocalVue();
localVue.use(Vuex)
localVue.use(VueRouter);

describe('AppHeader.vue', () => {

  let actions;
  let getters;
  let store;
  let state;

  it('dispatches "login" when user clicks Login button', () => {
    actions = {
      login: jest.fn(),
      logout: jest.fn()
    }
    const token = null;
    state = {
      token
    };
    getters = {
      isLoggedIn: () => state.token
    };

    store = new Vuex.Store({
      actions,
      getters
    });

    const wrapper = shallowMount(AppHeader, { store, localVue })
    const loginBtn = wrapper.find('#login');
    loginBtn.trigger('click');
    expect(actions.login).toHaveBeenCalled();
    expect(actions.logout).not.toHaveBeenCalled();
  });

  it('dispatches "logout" when auth token is filled and user clicks Logout button', () => {
    actions = {
      login: jest.fn(),
      logout: jest.fn()
    }
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1yIEpvc2VwaCIsImlkIjoiNWQwYjk1Mzg2NTVhOTQ0ZjA0NjE5ZTA5IiwiZW1haWwiOiJ0cmV2X2pvc0Bob3RtYWlsLmNvbSIsInByb2ZpbGVVc2VybmFtZSI6Ii9tcmpvc2VwaCIsInByb2ZpbGVJbWFnZSI6Ii9Eb3Nlbi10LUdpci1sb29rLWN1dGUtbnVrZWNhdDMxNnMtMzExNzAwNDYtMTI4MC04MDAuanBnIiwiaWF0IjoxNTYyMzE4NDA0LCJleHAiOjE1OTM4NzYwMDR9.YwU15SqHMh1nO51eSa0YsOK-YLlaCx6ijceOKhZfQZc';
    state = {
      token
    };
    getters = {
      isLoggedIn: () => state.token
    };
    // getters = auth.getters;
    store = new Vuex.Store({
      actions,
      getters
    });
    const wrapper = shallowMount(AppHeader, { store, localVue })
    const logoutBtn = wrapper.find('#logout');
    logoutBtn.trigger('click');
    expect(actions.logout).toHaveBeenCalled();
    expect(actions.login).not.toHaveBeenCalled();
  })

  it('should run setToken mutation successfully', () => {
    const token = '12345';
    state = {
      token: null
    };
    authMutations.setToken(state, token);
    expect(state.token).toBe(token)
  });

  it('should run isLoggedIn getter successfully', () => {
    state = {
      token: null
    };
    expect(authGetters.isLoggedIn(state)).toBe(false);

    state = {
      token: '12345'
    };
    expect(authGetters.isLoggedIn(state)).toBe(true);
  });

  it('should run finalizeLogin action successfully', () => {
    const commit = jest.fn();
    const hash = '#access_token=12345';
    const token = null;
    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn().mockReturnValue(token);
    authActions.finalizeLogin({ commit }, hash);
    expect(commit).toHaveBeenCalledWith('setToken', '12345');
    expect(window.localStorage.setItem).toHaveBeenCalledWith('imgur_token', '12345');
  });

})


