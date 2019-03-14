import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";
import { Birds } from "./js/player/Birds.js";
import { DataStore } from "./js/base/DataStore.js";
import { BackGround } from "./js/runtime/BackGround.js";
import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";

// 初始化真个游戏精灵，作为游戏开始的入口
export class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.director = Director.getInstance();
        const loader = ResourceLoader.create();
        loader.onLoaded((map)=> {
            this.onResourceFirstLoaded(map);
        })
    }
    
    onResourceFirstLoaded(map) {
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map; 
        this.init();   
    }

    init() {

        // 首先重置游戏是没有结束的
        this.director.isGameOver = false;

        this.dataStore.put('background',BackGround);
        this.dataStore.put('land',Land);
        this.dataStore.put('pencils',[]);
        this.dataStore.put('birds',Birds);
        this.dataStore.put('score',Score);
        this.dataStore.put('startButton',StartButton);
        this.registerEvent();
        // 创建铅笔要在游戏逻辑运行之前 
        this.director.createPencil();
        this.director.run();
    }

    registerEvent() {
        this.canvas.addEventListener('click',(e)=> {
            if (this.director.isGameOver) {
                this.init();
            }            
            else {
                this.director.birdsEvent();
            }
            //阻止事件冒泡
            e.preventDefault();
        })
    }
}