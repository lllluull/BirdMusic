import * as types from './mutation-types'
const mutations = {
  [types.SET_SINGER] (state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING] (state, flag) {
    state.playing = flag
  },
  [types.SET_FULLSCREEN] (state, flag) {
    state.fullscreen = flag
  },
  [types.SET_PLAYLIST] (state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCELIST] (state, list) {
    state.sequencelist = list
  },
  [types.SET_MODE] (state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENTINDEX] (state, index) {
    state.currentIndex = index
  },
  [types.NEXT_SONG] (state) {
    if (state.currentIndex + 1 === state.playlist.length) {
      state.currentIndex = 0
    } else {
      state.currentIndex += 1
    }
  },
  [types.PRE_SONG] (state) {
    if (state.currentIndex === 0) {
      state.currentIndex = state.playlist.length - 1
    } else {
      state.currentIndex -= 1
    }
  },
  [types.RANDOM_SONG] (state) {
    state.currentIndex = Math.floor(Math.random() * state.playlist.length)
  }
}

export default mutations
