//Adding lodash throttle from library
import { throttle } from 'lodash';

//Initializing pre-existing player
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';
const savedTime = localStorage.getItem(STORAGE_KEY);

function savePlayedTime(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

player.on('timeupdate', throttle(savePlayedTime, 1000));

const timeSum = localStorage.getItem(STORAGE_KEY);
if (timeSum !== null) {
  player.setCurrentTime(savedTime);
}
