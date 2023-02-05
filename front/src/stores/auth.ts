import { writable } from 'svelte/store'
import { browser } from '$app/environment'

export const isAuth = writable(
  false || (browser && localStorage.getItem('auth') === 'true')
)

export const userToken = writable(
  browser ? localStorage.getItem('userToken') : ''
)
