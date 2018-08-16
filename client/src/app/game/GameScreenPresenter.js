import { TaskbarView } from '../core/TaskbarView.js';
import { TaskbarPresenter } from '../core/TaskbarPresenter.js';
import { VrGlassView } from '../core/VrGlassView.js';
import { VrGlassPresenter } from '../core/VrGlassPresenter.js';
import { SceneView } from './SceneView.js';
import { ScenePresenter } from './ScenePresenter.js';

const addGameScreen = Symbol('addGameScreen');
const openGameScreen = Symbol('openGameScreen');

export class GameScreenPresenter {

	constructor(view) {

        this.view = view;
        this[addGameScreen]();
        this[openGameScreen]();
    };

    [addGameScreen](){

		this.taskbarView    = new TaskbarView();
        this.taskbar   = new TaskbarPresenter(this.taskbarView, this.view.getView());
        
        this.vrGlassView    = new VrGlassView(this.view.getView());
    	this.vrGlass   = new VrGlassPresenter(this.vrGlassView, this.view.getView());

        this.sceneView = new SceneView();
        this.scene = new ScenePresenter(this.sceneView, this.view.getView());

    };

    [openGameScreen](){
        this.view.show();
    };

    setupModel(model){
        this.taskbar.setupModel(model);
        this.scene.setupModel(model);
        this.vrGlass.setupModel(model);

        this.taskbar.addTaskbar();
        this.scene.addScene();
        this.view.show();
    };

}




