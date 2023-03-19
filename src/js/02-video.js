//Adding lodash throttle from library
import { throttle } from 'lodash';

//Initializing pre-existing player
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

// Adding key to storage
const STORAGE_KEY = 'videoplayer-current-time';
const savedTime = localStorage.getItem(STORAGE_KEY);

//Saving timeupdate in storage with key
function savePlayedTime(data) {
  localStorage.setItem(STORAGE_KEY, data.seconds);
}

//Using lodash.throttle to update storage once for one secound and tracking timeupdate with on() metod
player.on('timeupdate', throttle(savePlayedTime, 1000));

//Using setCurrentTime() metod to reload page and play video from saved time
player.setCurrentTime(savedTime);
